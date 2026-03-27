const jwt = require('jsonwebtoken');
require('dotenv').config();

// Simple authentication middleware (for future use with JWT)
const authenticateToken = (req, res, next) => {
  // For now, we'll skip authentication but keep this middleware ready
  // In the future, you can add JWT token verification here
  next();
};

module.exports = {
  authenticateToken
};