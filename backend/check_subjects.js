const { pool } = require('./config/db');
const fs = require('fs');

async function check() {
  try {
    let out = '--- Subjects ---\n';
    const subjects = await pool.query('SELECT * FROM subjects');
    subjects.rows.forEach(s => out += 'SUB: ' + s.id + '|' + s.name + '\n');

    out += '\n--- Instructor Subjects ---\n';
    const ins_sub = await pool.query('SELECT * FROM instructor_subjects');
    ins_sub.rows.forEach(is => out += 'INS_SUB: Instructor ' + is.instructor_id + ' -> Subject ' + is.subject_id + '\n');
    
    out += '\n--- Courses ---\n';
    const courses = await pool.query('SELECT id, title, instructor_id, is_active FROM courses');
    courses.rows.forEach(c => out += 'COURSE_DATA: ' + c.id + '|' + c.title + '|' + c.instructor_id + '|' + c.is_active + '\n');

    fs.writeFileSync('results.txt', out);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

check();
