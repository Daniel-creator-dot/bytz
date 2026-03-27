const express = require('express');
const router = express.Router();
const Subject = require('../models/Subject');

// GET /api/subjects - Get all subjects
router.get('/', async (req, res, next) => {
  try {
    const subjects = await Subject.getAllSubjects();
    res.json({ success: true, data: subjects });
  } catch (error) {
    next(error);
  }
});

// GET /api/subjects/instructor/:id - Get subjects for a specific instructor
router.get('/instructor/:id', async (req, res, next) => {
  try {
    const subjects = await Subject.getInstructorSubjects(req.params.id);
    res.json({ success: true, data: subjects });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
