const express = require('express');
const Course = require('../models/Course');
const router = express.Router();

// GET /api/courses - Get all active courses
router.get('/', async (req, res) => {
  try {
    const { instructorId } = req.query;
    let courses;
    if (instructorId) {
      courses = await Course.getCoursesByInstructorId(instructorId);
    } else {
      courses = await Course.getAllCourses();
    }
    res.json({
      success: true,
      data: courses
    });
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching courses',
      error: error.message
    });
  }
});

// GET /api/courses/:id - Get course by ID
router.get('/:id', async (req, res) => {
  try {
    const course = await Course.getCourseById(req.params.id);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }
    res.json({
      success: true,
      data: course
    });
  } catch (error) {
    console.error('Error fetching course:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching course',
      error: error.message
    });
  }
});

// POST /api/courses - Create new course
router.post('/', async (req, res) => {
  try {
    const courseData = req.body;
    const course = await Course.createCourse(courseData);
    res.status(201).json({
      success: true,
      data: course,
      message: 'Course created successfully'
    });
  } catch (error) {
    console.error('Error creating course:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating course',
      error: error.message
    });
  }
});

// PUT /api/courses/:id - Update course
router.put('/:id', async (req, res) => {
  try {
    const courseData = req.body;
    const course = await Course.updateCourse(req.params.id, courseData);
    res.json({
      success: true,
      data: course,
      message: 'Course updated successfully'
    });
  } catch (error) {
    console.error('Error updating course:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating course',
      error: error.message
    });
  }
});

// DELETE /api/courses/:id - Delete course (soft delete)
router.delete('/:id', async (req, res) => {
  try {
    await Course.deleteCourse(req.params.id);
    res.json({
      success: true,
      message: 'Course deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting course:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting course',
      error: error.message
    });
  }
});

module.exports = router;