const express = require('express');
const router = express.Router();
const { pool } = require('../config/db');

// @route   GET /api/exams
// @desc    Get all exams for a course
router.get('/', async (req, res) => {
  const { courseId, instructorId, studentId } = req.query;
  try {
    let query = 'SELECT e.*, c.title as course_title FROM exams e JOIN courses c ON e.course_id = c.id';
    let params = [];

    if (courseId) {
      query += ' WHERE e.course_id = $1';
      params.push(courseId);
    } else if (instructorId) {
      query += ' WHERE c.instructor_id = $1';
      params.push(instructorId);
    } else if (studentId) {
      query += `
        JOIN subscriptions s ON c.id = s.course_id
        WHERE s.student_id = $1 AND s.status = 'approved' AND s.is_active = TRUE
      `;
      params.push(studentId);
    }

    const { rows } = await pool.query(query, params);
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error('Error fetching exams:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   GET /api/exams/:id
// @desc    Get exam detail
router.get('/:id', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM exams WHERE id = $1', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ success: false, message: 'Exam not found' });
    res.json({ success: true, data: rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   POST /api/exams
// @desc    Create a new exam
router.post('/', async (req, res) => {
  const { courseId, title, description, duration_minutes, due_date, start_date, max_attempts } = req.body;
  try {
    const { rows } = await pool.query(
      'INSERT INTO exams (course_id, title, description, duration_minutes, due_date, start_date, max_attempts) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [courseId, title, description, duration_minutes, due_date, start_date, max_attempts || 1]
    );
    res.json({ success: true, data: rows[0] });
  } catch (error) {
    console.error('Error creating exam:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   GET /api/exams/:id/questions
// @desc    Get all questions for an exam
router.get('/:id/questions', async (req, res) => {
  try {
    const { studentId } = req.query;
    if (studentId) {
      // Check attempts
      const { rows: examRows } = await pool.query('SELECT max_attempts FROM exams WHERE id = $1', [req.params.id]);
      if (examRows.length > 0) {
        const { rows: attemptsRows } = await pool.query('SELECT COUNT(*) FROM exam_submissions WHERE exam_id = $1 AND student_id = $2', [req.params.id, studentId]);
        if (parseInt(attemptsRows[0].count) >= examRows[0].max_attempts) {
          return res.status(403).json({ success: false, message: 'Maximum attempts reached for this exam.' });
        }
      }
    }
    const { rows } = await pool.query('SELECT * FROM questions WHERE exam_id = $1', [req.params.id]);
    res.json({ success: true, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   POST /api/exams/:id/questions
// @desc    Add a question to an exam
router.post('/:id/questions', async (req, res) => {
  const { question_text, options, correct_answer, points } = req.body;
  try {
    const { rows } = await pool.query(
      'INSERT INTO questions (exam_id, question_text, options, correct_answer, points) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [req.params.id, question_text, JSON.stringify(options), correct_answer, points || 1]
    );
    res.json({ success: true, data: rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   POST /api/exams/:id/submit
// @desc    Submit exam answers and calculate score
router.post('/:id/submit', async (req, res) => {
  const { studentId, answers } = req.body; // answers is { question_id: student_answer }
  try {
    // 1. Fetch exam to validate schedule and attempts
    const { rows: examRows } = await pool.query('SELECT * FROM exams WHERE id = $1', [req.params.id]);
    if (examRows.length === 0) return res.status(404).json({ success: false, message: 'Exam not found' });
    const exam = examRows[0];

    // Validate Schedule
    const now = new Date();
    if (new Date(exam.start_date) > now) {
      return res.status(400).json({ success: false, message: 'Exam has not started yet.' });
    }
    if (new Date(exam.due_date) < now) {
      return res.status(400).json({ success: false, message: 'Exam deadline has passed.' });
    }

    // Validate Attempts
    const { rows: attemptsRows } = await pool.query('SELECT COUNT(*) FROM exam_submissions WHERE exam_id = $1 AND student_id = $2', [req.params.id, studentId]);
    const attemptsMade = parseInt(attemptsRows[0].count);
    if (attemptsMade >= exam.max_attempts) {
      return res.status(400).json({ success: false, message: 'Maximum attempts reached for this exam.' });
    }

    // 2. Fetch questions to mark
    const { rows: questions } = await pool.query('SELECT * FROM questions WHERE exam_id = $1', [req.params.id]);
    
    let score = 0;
    let totalPoints = 0;
    
    questions.forEach(q => {
      totalPoints += q.points;
      if (answers[q.id] === q.correct_answer) {
        score += q.points;
      }
    });

    // Save submission
    const { rows } = await pool.query(
      'INSERT INTO exam_submissions (exam_id, student_id, answers, score, total_points) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [req.params.id, studentId, JSON.stringify(answers), score, totalPoints]
    );

    res.json({ 
      success: true, 
      data: {
        submission: rows[0],
        score: score,
        totalPoints: totalPoints,
        percentage: (score / totalPoints) * 100
      }
    });
  } catch (error) {
    console.error('Submission error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   GET /api/exams/:id/results
// @desc    Get all results for an exam (for instructors)
router.get('/:id/results', async (req, res) => {
  try {
    const { rows } = await pool.query(`
      SELECT s.*, st.name as student_name, st.email as student_email 
      FROM exam_submissions s 
      JOIN students st ON s.student_id = st.id 
      WHERE s.exam_id = $1
    `, [req.params.id]);
    res.json({ success: true, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
