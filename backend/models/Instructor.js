const { pool } = require('../config/db');

class Instructor {
  static async getInstructorById(id) {
    const { rows } = await pool.query(`
      SELECT i.*, 
             COALESCE(json_agg(json_build_object('id', s.id, 'name', s.name)) FILTER (WHERE s.id IS NOT NULL), '[]') as subjects
      FROM instructors i
      LEFT JOIN instructor_subjects isub ON i.id = isub.instructor_id
      LEFT JOIN subjects s ON isub.subject_id = s.id
      WHERE i.id = $1
      GROUP BY i.id
    `, [id]);
    return rows[0];
  }

  static async getInstructorByEmail(email) {
    const { rows } = await pool.query(`
      SELECT i.*, 
             COALESCE(json_agg(json_build_object('id', s.id, 'name', s.name)) FILTER (WHERE s.id IS NOT NULL), '[]') as subjects
      FROM instructors i
      LEFT JOIN instructor_subjects isub ON i.id = isub.instructor_id
      LEFT JOIN subjects s ON isub.subject_id = s.id
      WHERE i.email = $1
      GROUP BY i.id
    `, [email]);
    return rows[0];
  }

  static async createInstructor(instructorData) {
    const { name, email, password, bio, subjectIds } = instructorData;
    
    // Begin transaction
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      
      const { rows } = await client.query(
        'INSERT INTO instructors (name, email, password, specialization, bio) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [name, email, password || 'password123', instructorData.specialization || '', bio]
      );
      const instructor = rows[0];
      
      if (subjectIds && subjectIds.length > 0) {
        // Prepare bulk insert values for instructor_subjects
        const values = [];
        const placeholders = [];
        subjectIds.forEach((sid, idx) => {
          values.push(instructor.id, sid);
          placeholders.push(`($${idx * 2 + 1}, $${idx * 2 + 2})`);
        });
        
        await client.query(
          `INSERT INTO instructor_subjects (instructor_id, subject_id) VALUES ${placeholders.join(',')}`,
          values
        );
      }
      
      await client.query('COMMIT');
      return { ...instructor, subjectIds: subjectIds || [] };
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  static async updateInstructor(id, instructorData) {
    const { name, email, password, bio, subjectIds } = instructorData;
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      const { rows } = await client.query(
        'UPDATE instructors SET name = $1, email = $2, password = $3, bio = $4, updated_at = NOW() WHERE id = $5 RETURNING *',
        [name, email, password, bio, id]
      );
      const instructor = rows[0];

      if (subjectIds) {
        await client.query('DELETE FROM instructor_subjects WHERE instructor_id = $1', [id]);
        if (subjectIds.length > 0) {
          const values = [];
          const placeholders = [];
          subjectIds.forEach((sid, idx) => {
            values.push(id, sid);
            placeholders.push(`($${idx * 2 + 1}, $${idx * 2 + 2})`);
          });
          await client.query(
            `INSERT INTO instructor_subjects (instructor_id, subject_id) VALUES ${placeholders.join(',')}`,
            values
          );
        }
      }

      await client.query('COMMIT');
      return instructor;
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  static async getAllInstructors() {
    const { rows } = await pool.query(`
      SELECT i.id, i.name, i.email, i.specialization, i.bio, i.created_at,
             COALESCE(json_agg(json_build_object('id', s.id, 'name', s.name)) FILTER (WHERE s.id IS NOT NULL), '[]') as subjects
      FROM instructors i
      LEFT JOIN instructor_subjects isub ON i.id = isub.instructor_id
      LEFT JOIN subjects s ON isub.subject_id = s.id
      GROUP BY i.id
      ORDER BY i.name ASC
    `);
    return rows;
  }

  static async updatePassword(id, password) {
    const { rows } = await pool.query(
      'UPDATE instructors SET password = $1, updated_at = NOW() WHERE id = $2 RETURNING *',
      [password, id]
    );
    return rows[0];
  }
}

module.exports = Instructor;
