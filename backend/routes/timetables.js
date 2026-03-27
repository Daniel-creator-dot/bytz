const express = require('express');
const router = express.Router();
const Timetable = require('../models/Timetable');

// GET /api/timetables - All timetables
router.get('/', async (req, res) => {
  try {
    const { studentId, instructorId, courseId } = req.query;
    let data;
    if (studentId) data = await Timetable.getTimetableByStudentId(studentId);
    else if (instructorId) data = await Timetable.getTimetableByInstructorId(instructorId);
    else if (courseId) data = await Timetable.getTimetableByCourseId(courseId);
    else data = await Timetable.getAllTimetables();
    
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/timetables - Create entry
router.post('/', async (req, res) => {
  try {
    const entry = await Timetable.createTimetableEntry(req.body);
    res.status(201).json({ success: true, data: entry });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /api/timetables/:id - Delete entry
router.delete('/:id', async (req, res) => {
  try {
    const result = await Timetable.deleteTimetableEntry(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
