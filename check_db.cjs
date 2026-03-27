require('dotenv').config({ path: './backend/.env' });
const { pool } = require('./backend/config/db');

async function check() {
  try {
    const instructors = await pool.query('SELECT id, name FROM instructors');
    console.log('Instructors:', instructors.rows);
    
    const courses = await pool.query('SELECT id, title, instructor_id, is_active FROM courses');
    console.log('Courses:', courses.rows);
    
    const timetables = await pool.query('SELECT * FROM timetables');
    console.log('Timetables:', timetables.rows);
    
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

check();
