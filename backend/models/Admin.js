const { pool } = require('../config/db');

class Admin {
  static async getAdminByEmail(email) {
    const { rows } = await pool.query('SELECT * FROM admins WHERE email = $1', [email]);
    return rows[0];
  }

  static async getAdminById(id) {
    const { rows } = await pool.query('SELECT * FROM admins WHERE id = $1', [id]);
    return rows[0];
  }

  static async getDashboardStats() {
    const { rows: students } = await pool.query('SELECT COUNT(*) FROM students');
    const { rows: instructors } = await pool.query('SELECT COUNT(*) FROM instructors');
    const { rows: courses } = await pool.query('SELECT COUNT(*) FROM courses WHERE is_active = TRUE');
    const { rows: enrolments } = await pool.query('SELECT COUNT(*) FROM subscriptions');
    
    // Get recent activities (last 5 subscriptions)
    const { rows: recentActivities } = await pool.query(`
      SELECT s.created_at, st.name as student_name, c.title as course_title
      FROM subscriptions s
      JOIN students st ON s.student_id = st.id
      JOIN courses c ON s.course_id = c.id
      ORDER BY s.created_at DESC
      LIMIT 5
    `);

    return {
      totalStudents: parseInt(students[0].count),
      totalInstructors: parseInt(instructors[0].count),
      totalCourses: parseInt(courses[0].count),
      totalEnrolments: parseInt(enrolments[0].count),
      recentActivities
    };
  }
}

module.exports = Admin;
