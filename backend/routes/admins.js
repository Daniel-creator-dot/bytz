const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');

// Admin login
router.post('/login', async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.getAdminByEmail(email);
    if (admin && admin.password === password) {
       // Omit password from response
       const { password: _, ...adminData } = admin;
       res.json({ success: true, data: adminData, role: 'superadmin' });
    } else {
      res.status(401).json({ success: false, message: 'Invalid email or password' });
    }
  } catch (error) {
    next(error);
  }
});

// Get dashboard statistics
router.get('/stats', async (req, res, next) => {
  try {
    const stats = await Admin.getDashboardStats();
    res.json({ success: true, data: stats });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
