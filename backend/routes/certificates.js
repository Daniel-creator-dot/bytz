const express = require('express');
const router = express.Router();
const { pool } = require('../config/db');
const crypto = require('crypto');

// Award a certificate
router.post('/', async (req, res) => {
  const { student_id, course_id, instructor_id, grade } = req.body;
  
  if (!student_id || !course_id || !instructor_id) {
    return res.status(400).json({ success: false, message: 'Missing required fields' });
  }

  const certificate_hash = crypto.createHash('sha256')
    .update(`${student_id}-${course_id}-${Date.now()}`)
    .digest('hex');

  try {
    const { rows } = await pool.query(
      'INSERT INTO certificates (student_id, course_id, instructor_id, certificate_hash, grade) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [student_id, course_id, instructor_id, certificate_hash, grade || 'A']
    );
    res.json({ success: true, data: rows[0] });
  } catch (error) {
    if (error.code === '23505') {
       return res.status(400).json({ success: false, message: 'Certificate already awarded to this student for this course' });
    }
    console.error('Error awarding certificate:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Get certificates for a student
router.get('/student/:studentId', async (req, res) => {
  try {
    const { rows } = await pool.query(`
      SELECT cert.*, c.title as course_title, c.category, i.name as instructor_name
      FROM certificates cert
      JOIN courses c ON cert.course_id = c.id
      JOIN instructors i ON cert.instructor_id = i.id
      WHERE cert.student_id = $1
      ORDER BY cert.issue_date DESC
    `, [req.params.studentId]);
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error('Error fetching student certificates:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Get certificates awarded by an instructor
router.get('/instructor/:instructorId', async (req, res) => {
  try {
    const { rows } = await pool.query(`
      SELECT cert.*, c.title as course_title, c.category, i.name as instructor_name, s.name as student_name
      FROM certificates cert
      JOIN courses c ON cert.course_id = c.id
      JOIN instructors i ON cert.instructor_id = i.id
      JOIN students s ON cert.student_id = s.id
      WHERE cert.instructor_id = $1
      ORDER BY cert.issue_date DESC
    `, [req.params.instructorId]);
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error('Error fetching instructor certificates:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
