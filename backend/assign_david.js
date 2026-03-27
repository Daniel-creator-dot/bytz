const { pool } = require('./config/db');

async function assignCourse() {
  try {
    const instructors = await pool.query('SELECT id, name FROM instructors WHERE name ILIKE \'%david%\'');
    if (instructors.rows.length > 0) {
      const davidId = instructors.rows[0].id;
      
      console.log('Found David with ID:', davidId);
      
      const courseResult = await pool.query(`
        INSERT INTO courses (title, description, duration, price, instructor_id, category) 
        VALUES ($1, $2, $3, $4, $5, $6) 
        RETURNING id
      `, ['Introduction to Artificial Intelligence', 'A comprehensive beginner course to AI.', '8 weeks', 500, davidId, 'Programming']);
      
      const courseId = courseResult.rows[0].id;
      console.log('Created test course ID:', courseId);
      
      await pool.query(`
        INSERT INTO timetables (course_id, day_of_week, start_time, end_time, location)
        VALUES ($1, $2, $3, $4, $5)
      `, [courseId, 'Monday', '10:00:00', '12:00:00', 'Room A1']);
      
      console.log('Created timetable for course ID:', courseId);
      
      process.exit(0);
    } else {
      console.log('David not found');
      process.exit(1);
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

assignCourse();
