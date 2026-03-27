const { pool } = require('../config/db');

class Course {
  static async getAllCourses() {
    const { rows } = await pool.query(`
      SELECT c.*, i.name as instructor, 
      (SELECT COUNT(*) FROM subscriptions s WHERE s.course_id = c.id) as subscriber_count
      FROM courses c 
      LEFT JOIN instructors i ON c.instructor_id = i.id 
      WHERE c.is_active = TRUE
    `);
    return rows;
  }

  static async getCoursesByInstructorId(instructorId) {
    const { rows } = await pool.query(`
      SELECT c.*, i.name as instructor,
      (SELECT COUNT(*) FROM subscriptions s WHERE s.course_id = c.id) as subscriber_count
      FROM courses c 
      LEFT JOIN instructors i ON c.instructor_id = i.id 
      WHERE c.instructor_id = $1 AND c.is_active = TRUE
    `, [instructorId]);
    return rows;
  }

  static async getCourseById(id) {
    const { rows } = await pool.query(`
      SELECT c.*, i.name as instructor,
      (SELECT COUNT(*) FROM subscriptions s WHERE s.course_id = c.id) as subscriber_count
      FROM courses c 
      LEFT JOIN instructors i ON c.instructor_id = i.id 
      WHERE c.id = $1 AND c.is_active = TRUE
    `, [id]);
    return rows[0];
  }

  static async createCourse(courseData) {
    const { title, description, duration, price, instructor_id, category } = courseData;
    const { rows } = await pool.query(
      'INSERT INTO courses (title, description, duration, price, instructor_id, category) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [title, description, duration, price, instructor_id, category]
    );
    return rows[0];
  }

  static async updateCourse(id, courseData) {
    const { title, description, duration, price, instructor_id, category } = courseData;
    const { rows } = await pool.query(
      'UPDATE courses SET title = $1, description = $2, duration = $3, price = $4, instructor_id = $5, category = $6, updated_at = NOW() WHERE id = $7 RETURNING *',
      [title, description, duration, price, instructor_id, category, id]
    );
    return rows[0];
  }

  static async deleteCourse(id) {
    await pool.query('UPDATE courses SET is_active = FALSE, updated_at = NOW() WHERE id = $1', [id]);
    return { message: 'Course deleted successfully' };
  }
}

module.exports = Course;