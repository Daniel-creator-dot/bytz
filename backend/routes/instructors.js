const express = require('express');
const router = express.Router();
const Instructor = require('../models/Instructor');

// Get all instructors
router.get('/', async (req, res, next) => {
  try {
    const instructors = await Instructor.getAllInstructors();
    res.json({ success: true, data: instructors });
  } catch (error) {
    next(error);
  }
});

// Get instructor by email (login)
router.post('/login', async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const instructor = await Instructor.getInstructorByEmail(email);
    if (instructor && instructor.password === password) {
       // Omit password from response
       const { password: _, ...instructorData } = instructor;
       res.json({ success: true, data: instructorData, role: 'instructor' });
    } else {
      res.status(401).json({ success: false, message: 'Invalid email or password' });
    }
  } catch (error) {
    next(error);
  }
});

// Create instructor (Superadmin functionality)
router.post('/', async (req, res, next) => {
  try {
    const instructor = await Instructor.createInstructor(req.body);
    res.status(201).json({ success: true, data: instructor });
  } catch (error) {
    next(error);
  }
});

// Get instructor by ID
router.get('/:id', async (req, res, next) => {
  try {
    const instructor = await Instructor.getInstructorById(req.params.id);
    if (instructor) {
      res.json({ success: true, data: instructor });
    } else {
      res.status(404).json({ success: false, message: 'Instructor not found' });
    }
  } catch (error) {
    next(error);
  }
});

// Update instructor password
router.put('/:id/password', async (req, res, next) => {
  const { password } = req.body;
  try {
    const instructor = await Instructor.updatePassword(req.params.id, password);
    if (instructor) {
      res.json({ success: true, message: 'Password reset successfully' });
    } else {
      res.status(404).json({ success: false, message: 'Instructor not found' });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
