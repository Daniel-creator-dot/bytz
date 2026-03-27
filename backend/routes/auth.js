const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');
const Instructor = require('../models/Instructor');
const Student = require('../models/Student');

// POST /api/auth/login - Unified login for all roles
router.post('/login', async (req, res, next) => {
  const { email, password } = req.body;
  try {
    // 1. Check Admin
    const admin = await Admin.getAdminByEmail(email);
    if (admin && admin.password === password) {
      const { password: _, ...userData } = admin;
      return res.json({ success: true, data: userData, role: 'superadmin' });
    }

    // 2. Check Instructor
    const instructor = await Instructor.getInstructorByEmail(email);
    if (instructor && instructor.password === password) {
      const { password: _, ...userData } = instructor;
      return res.json({ success: true, data: userData, role: 'instructor' });
    }

    // 3. Check Student
    const student = await Student.getStudentByEmail(email);
    if (student) {
      if (!student.password || student.password === password) {
        return res.json({ success: true, data: student, role: 'student' });
      }
    }

    res.status(401).json({ success: false, message: 'Invalid email or password' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
