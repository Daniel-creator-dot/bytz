const express = require('express');
const Subscription = require('../models/Subscription');
const router = express.Router();

// GET /api/subscriptions/student/:studentId - Get all subscriptions for a student
router.get('/student/:studentId', async (req, res) => {
  try {
    const subscriptions = await Subscription.getStudentSubscriptions(req.params.studentId);
    res.json({
      success: true,
      data: subscriptions
    });
  } catch (error) {
    console.error('Error fetching student subscriptions:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching student subscriptions',
      error: error.message
    });
  }
});

// GET /api/subscriptions/approved - Get all approved subscriptions
router.get('/approved', async (req, res) => {
  try {
    const subscriptions = await Subscription.getApprovedSubscriptions();
    res.json({ success: true, data: subscriptions });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching approved subscriptions', error: error.message });
  }
});

// GET /api/subscriptions/pending - Get all pending subscriptions
router.get('/pending', async (req, res) => {
  try {
    const subscriptions = await Subscription.getPendingSubscriptions();
    res.json({ success: true, data: subscriptions });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching pending subscriptions', error: error.message });
  }
});

// POST /api/subscriptions - Subscribe student to course
router.post('/', async (req, res) => {
  try {
    const { studentId, courseId } = req.body;
    
    if (!studentId || !courseId) {
      return res.status(400).json({
        success: false,
        message: 'Student ID and Course ID are required'
      });
    }

    const subscription = await Subscription.subscribeToCourse(studentId, courseId);
    res.status(201).json({
      success: true,
      data: subscription,
      message: 'Student subscribed to course successfully'
    });
  } catch (error) {
    console.error('Error subscribing to course:', error);
    res.status(500).json({
      success: false,
      message: 'Error subscribing to course',
      error: error.message
    });
  }
});

// DELETE /api/subscriptions/:studentId/:courseId - Unsubscribe student from course
router.delete('/:studentId/:courseId', async (req, res) => {
  try {
    const { studentId, courseId } = req.params;
    await Subscription.unsubscribeFromCourse(studentId, courseId);
    res.json({
      success: true,
      message: 'Student unsubscribed from course successfully'
    });
  } catch (error) {
    console.error('Error unsubscribing from course:', error);
    res.status(500).json({
      success: false,
      message: 'Error unsubscribing from course',
      error: error.message
    });
  }
});

// GET /api/subscriptions/course/:courseId - Get all subscribers for a course
router.get('/course/:courseId', async (req, res) => {
  try {
    const subscribers = await Subscription.getCourseSubscribers(req.params.courseId);
    res.json({
      success: true,
      data: subscribers
    });
  } catch (error) {
    console.error('Error fetching course subscribers:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching course subscribers',
      error: error.message
    });
  }
});

// PUT /api/subscriptions/:id/status - Update subscription status
router.put('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    if (!['approved', 'rejected', 'pending'].includes(status)) {
       return res.status(400).json({ success: false, message: 'Invalid status' });
    }
    const subscription = await Subscription.updateSubscriptionStatus(req.params.id, status);
    res.json({ success: true, data: subscription, message: 'Status updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating status', error: error.message });
  }
});

module.exports = router;