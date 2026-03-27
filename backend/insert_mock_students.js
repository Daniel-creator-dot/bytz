const { pool } = require('./config/db');
const fs = require('fs');
const path = require('path');

async function insertMockData() {
  try {
    // 1. Find the course
    const { rows: courseRows } = await pool.query(
      `SELECT id FROM courses WHERE title ILIKE '%Introduction to Artificial Intelligence%' LIMIT 1`
    );

    if (courseRows.length === 0) {
      console.log('Course "Introduction to Artificial Intelligence" not found.');
      process.exit(1);
    }
    const courseId = courseRows[0].id;
    console.log(`Found course ID: ${courseId}`);

    // 2. Insert 2 students
    const students = [
      { name: 'Alice Smith', email: 'alice.ai@example.com', phone: '0551112222' },
      { name: 'Bob Jones', email: 'bob.ai@example.com', phone: '0553334444' }
    ];

    for (const student of students) {
      let studentId;
      const { rows: existing } = await pool.query(`SELECT id FROM students WHERE email = $1`, [student.email]);
      if (existing.length > 0) {
        studentId = existing[0].id;
        console.log(`Found existing student: ${student.name} (ID: ${studentId})`);
      } else {
        const { rows: studentRows } = await pool.query(
          `INSERT INTO students (name, email, phone) 
           VALUES ($1, $2, $3) 
           RETURNING id`,
          [student.name, student.email, student.phone]
        );
        studentId = studentRows[0].id;
        console.log(`Inserted student: ${student.name} (ID: ${studentId})`);
      }

      // 3. Enroll student in the course
      const { rows: subRows } = await pool.query(
        `SELECT id FROM subscriptions WHERE student_id = $1 AND course_id = $2`,
        [studentId, courseId]
      );
      if (subRows.length === 0) {
        // Find what columns subscriptions actually has. "status" might not exist but "is_active" might
        const { rows: cols } = await pool.query("SELECT column_name FROM information_schema.columns WHERE table_name = 'subscriptions'");
        const columnNames = cols.map(c => c.column_name);

        if (columnNames.includes('status')) {
           await pool.query(
             `INSERT INTO subscriptions (student_id, course_id, status) VALUES ($1, $2, 'active')`,
             [studentId, courseId]
           );
        } else if (columnNames.includes('is_active')) {
           await pool.query(
             `INSERT INTO subscriptions (student_id, course_id, is_active) VALUES ($1, $2, true)`,
             [studentId, courseId]
           );
        } else {
           await pool.query(
             `INSERT INTO subscriptions (student_id, course_id) VALUES ($1, $2)`,
             [studentId, courseId]
           );
        }
      }
      console.log(`Enrolled ${student.name} in course ${courseId}`);
    }

    console.log('Successfully inserted 2 students and enrolled them.');
  } catch (err) {
    fs.writeFileSync(path.join(__dirname, 'error.log'), err.stack || err.message || err.toString());
    console.error('Fatal Error written to error.log');
  } finally {
    pool.end();
  }
}

insertMockData();
