const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

// Import routes
const instructorRoutes = require('./routes/instructors');
const studentRoutes = require('./routes/students');
const courseRoutes = require('./routes/courses');
const subscriptionRoutes = require('./routes/subscriptions');
const adminRoutes = require('./routes/admins');
const timetableRoutes = require('./routes/timetables');
const subjectRoutes = require('./routes/subjects');
const examRoutes = require('./routes/exams');
const assignmentRoutes = require('./routes/assignments');
const certificateRoutes = require('./routes/certificates');
const authRoutes = require('./routes/auth');
const { testConnection } = require('./config/db');

const app = express();
const PORT = process.env.PORT || 3001;

// Security middleware
app.use(helmet());
app.use(cors());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes
app.use('/api/courses', courseRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/subscriptions', subscriptionRoutes);
app.use('/api/instructors', instructorRoutes);
app.use('/api/admins', adminRoutes);
app.use('/api/timetables', timetableRoutes);
app.use('/api/subjects', subjectRoutes);
app.use('/api/exams', examRoutes);
app.use('/api/assignments', assignmentRoutes);
app.use('/api/certificates', certificateRoutes);
app.use('/api/auth', authRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'BYTZ Academy Backend API',
    version: '1.0.0',
    endpoints: {
      courses: 'GET /api/courses',
      students: 'GET /api/students/:id',
      subscriptions: 'GET /api/subscriptions/student/:studentId'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'production' ? {} : err.message
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found'
  });
});

// Start server
const startServer = async () => {
  try {
    // Test database connection and run migrations
    await testConnection();
    
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`API available at http://localhost:${PORT}/api`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();

module.exports = app;