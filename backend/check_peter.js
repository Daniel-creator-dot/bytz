const { pool } = require('./config/db');

async function check() {
  try {
    const instructors = await pool.query('SELECT id, name, email FROM instructors WHERE email = \'der@bytz.com\'');
    console.log('--- Peter ---');
    console.log(instructors.rows);

    let peterId = -1;
    if(instructors.rows.length > 0) peterId = instructors.rows[0].id;

    const courses = await pool.query('SELECT * FROM courses');
    console.log('--- All Courses ---');
    console.log(courses.rows);

    const specificCourses = await pool.query('SELECT * FROM courses WHERE instructor_id = $1', [peterId]);
    console.log('--- Peter\'s Courses ---');
    console.log(specificCourses.rows);

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

check();
