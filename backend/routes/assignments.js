const express = require('express');
const router = express.Router();
const { pool } = require('../config/db');

// Get all assignments for instructor's courses
router.get('/', async (req, res) => {
  try {
    const { rows } = await pool.query(`
      SELECT a.*, c.title as course_title 
      FROM assignments a
      JOIN courses c ON a.course_id = c.id
      ORDER BY a.created_at DESC
    `);
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error('Error fetching assignments:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Create new assignment
router.post('/', async (req, res) => {
  const { title, courseId, dueDate, description } = req.body;
  try {
    const { rows } = await pool.query(
      'INSERT INTO assignments (course_id, title, description, due_date) VALUES ($1, $2, $3, $4) RETURNING *',
      [courseId, title, description, dueDate]
    );
    res.json({ success: true, data: rows[0] });
  } catch (error) {
    console.error('Error creating assignment:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
