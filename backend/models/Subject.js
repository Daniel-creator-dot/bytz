const { pool } = require('../config/db');

class Subject {
  static async getAllSubjects() {
    const { rows } = await pool.query('SELECT * FROM subjects ORDER BY name ASC');
    return rows;
  }

  static async getInstructorSubjects(instructorId) {
    const { rows } = await pool.query(`
      SELECT s.* 
      FROM subjects s
      JOIN instructor_subjects isub ON s.id = isub.subject_id
      WHERE isub.instructor_id = $1
    `, [instructorId]);
    return rows;
  }

  static async assignSubjectsToInstructor(instructorId, subjectIds) {
    // Delete existing assignments first
    await pool.query('DELETE FROM instructor_subjects WHERE instructor_id = $1', [instructorId]);
    
    // Insert new assignments
    if (subjectIds && subjectIds.length > 0) {
      const values = subjectIds.map(sid => `(${instructorId}, ${sid})`).join(',');
      await pool.query(`INSERT INTO instructor_subjects (instructor_id, subject_id) VALUES ${values}`);
    }
  }
}

module.exports = Subject;
