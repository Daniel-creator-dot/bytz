const { pool } = require('../config/db');

class Subscription {
  static async getStudentSubscriptions(studentId) {
    const { rows } = await pool.query(`
      SELECT s.*, c.title, c.description, c.duration, c.price, i.name as instructor, c.category
      FROM subscriptions s
      JOIN courses c ON s.course_id = c.id
      LEFT JOIN instructors i ON c.instructor_id = i.id
      WHERE s.student_id = $1 AND s.is_active = TRUE
      ORDER BY s.created_at DESC
    `, [studentId]);
    return rows;
  }

  static async subscribeToCourse(studentId, courseId) {
    // Check if already subscribed
    const { rows: existing } = await pool.query(
      'SELECT * FROM subscriptions WHERE student_id = $1 AND course_id = $2 AND is_active = TRUE',
      [studentId, courseId]
    );

    if (existing.length > 0) {
      throw new Error('Student is already subscribed to this course');
    }

    const { rows } = await pool.query(
      'INSERT INTO subscriptions (student_id, course_id, subscription_date, is_active) VALUES ($1, $2, NOW(), TRUE) RETURNING *',
      [studentId, courseId]
    );

    return rows[0];
  }

  static async unsubscribeFromCourse(studentId, courseId) {
    await pool.query(
      'UPDATE subscriptions SET is_active = FALSE, updated_at = NOW() WHERE student_id = $1 AND course_id = $2',
      [studentId, courseId]
    );
    return { message: 'Unsubscribed successfully' };
  }

  static async getCourseSubscribers(courseId) {
    const { rows } = await pool.query(`
      SELECT s.*, st.name, st.email, st.phone
      FROM subscriptions s
      JOIN students st ON s.student_id = st.id
      WHERE s.course_id = $1 AND s.is_active = TRUE
      ORDER BY s.subscription_date DESC
    `, [courseId]);
    return rows;
  }
  static async getPendingSubscriptions() {
    const { rows } = await pool.query(`
      SELECT s.*, st.name as student_name, st.email as student_email, c.title as course_title, c.price
      FROM subscriptions s
      JOIN students st ON s.student_id = st.id
      JOIN courses c ON s.course_id = c.id
      WHERE s.status = 'pending' AND s.is_active = TRUE
      ORDER BY s.subscription_date DESC
    `);
    return rows;
  }

  static async getApprovedSubscriptions() {
    const { rows } = await pool.query(`
      SELECT s.*, st.name as student_name, st.email as student_email, c.title as course_title, c.price
      FROM subscriptions s
      JOIN students st ON s.student_id = st.id
      JOIN courses c ON s.course_id = c.id
      WHERE s.status = 'approved' AND s.is_active = TRUE
      ORDER BY s.subscription_date DESC
    `);
    return rows;
  }

  static async updateSubscriptionStatus(id, status) {
    const { rows } = await pool.query(
      'UPDATE subscriptions SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING *',
      [status, id]
    );
    return rows[0];
  }
}

module.exports = Subscription;