const { pool } = require('../config/db');

class Student {
  static async getAllStudents() {
    const { rows } = await pool.query('SELECT * FROM students ORDER BY created_at DESC');
    return rows;
  }

  static async getStudentById(id) {
    const { rows } = await pool.query('SELECT * FROM students WHERE id = $1', [id]);
    return rows[0];
  }

  static async getStudentByEmail(email) {
    const { rows } = await pool.query('SELECT * FROM students WHERE email = $1', [email]);
    return rows[0];
  }

  static async getStudentsByInstructorId(instructorId) {
    const { rows } = await pool.query(`
      SELECT DISTINCT st.* 
      FROM students st
      JOIN subscriptions s ON st.id = s.student_id
      JOIN courses c ON s.course_id = c.id
      WHERE c.instructor_id = $1
      ORDER BY st.name ASC
    `, [instructorId]);
    return rows;
  }

  static async createStudent(studentData) {
    const { name, email, phone, date_of_birth, address, password } = studentData;
    const { rows } = await pool.query(
      'INSERT INTO students (name, email, phone, date_of_birth, address, password) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [name, email, phone, date_of_birth, address, password]
    );
    return rows[0];
  }

  static async updateStudent(id, studentData) {
    const { name, email, phone, date_of_birth, address } = studentData;
    const { rows } = await pool.query(
      'UPDATE students SET name = $1, email = $2, phone = $3, date_of_birth = $4, address = $5, updated_at = NOW() WHERE id = $6 RETURNING *',
      [name, email, phone, date_of_birth, address, id]
    );
    return rows[0];
  }
  static async deleteStudent(id) {
    const { rows } = await pool.query('DELETE FROM students WHERE id = $1 RETURNING *', [id]);
    return rows[0];
  }
}

module.exports = Student;