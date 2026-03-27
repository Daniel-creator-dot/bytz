const { pool } = require('../config/db');

class Timetable {
  static async getAllTimetables() {
    const { rows } = await pool.query(`
      SELECT t.*, c.title as course_title 
      FROM timetables t
      JOIN courses c ON t.course_id = c.id
      ORDER BY t.day_of_week, t.start_time
    `);
    return rows;
  }

  static async getTimetableByCourseId(courseId) {
    const { rows } = await pool.query('SELECT * FROM timetables WHERE course_id = $1', [courseId]);
    return rows;
  }

  static async getTimetableByStudentId(studentId) {
    const { rows } = await pool.query(`
      SELECT t.*, c.title as course_title 
      FROM timetables t
      JOIN courses c ON t.course_id = c.id
      JOIN subscriptions s ON s.course_id = c.id
      WHERE s.student_id = $1 AND s.status = 'approved' AND s.is_active = TRUE
      ORDER BY t.day_of_week, t.start_time
    `, [studentId]);
    return rows;
  }

  static async getTimetableByInstructorId(instructorId) {
    const { rows } = await pool.query(`
      SELECT t.*, c.title as course_title 
      FROM timetables t
      JOIN courses c ON t.course_id = c.id
      WHERE c.instructor_id = $1 AND c.is_active = TRUE
      ORDER BY t.day_of_week, t.start_time
    `, [instructorId]);
    return rows;
  }

  static async createTimetableEntry(data) {
    const { course_id, day_of_week, start_time, end_time, location } = data;
    const { rows } = await pool.query(
      'INSERT INTO timetables (course_id, day_of_week, start_time, end_time, location) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [course_id, day_of_week, start_time, end_time, location]
    );
    return rows[0];
  }

  static async deleteTimetableEntry(id) {
    await pool.query('DELETE FROM timetables WHERE id = $1', [id]);
    return { success: true };
  }
}

module.exports = Timetable;
