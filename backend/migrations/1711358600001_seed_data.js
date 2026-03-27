/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  // Insert sample courses
  pgm.sql(`
    INSERT INTO courses (title, description, duration, price, instructor, category) VALUES
    ('Web Development Fundamentals', 'Learn the basics of web development including HTML, CSS, and JavaScript', '12 weeks', 299.99, 'John Doe', 'Web Development'),
    ('Advanced JavaScript', 'Master advanced JavaScript concepts and modern frameworks', '8 weeks', 399.99, 'Jane Smith', 'Programming'),
    ('Python for Data Science', 'Introduction to Python programming and data analysis', '10 weeks', 349.99, 'Bob Johnson', 'Data Science'),
    ('Mobile App Development', 'Build native and hybrid mobile applications', '14 weeks', 449.99, 'Alice Brown', 'Mobile Development'),
    ('UI/UX Design Principles', 'Learn design principles and tools for creating great user experiences', '6 weeks', 249.99, 'Charlie Wilson', 'Design');
  `);

  // Insert sample students
  pgm.sql(`
    INSERT INTO students (name, email, phone, date_of_birth, address) VALUES
    ('Alice Johnson', 'alice.johnson@example.com', '+1234567890', '1995-03-15', '123 Main St, City, Country'),
    ('Bob Smith', 'bob.smith@example.com', '+1234567891', '1992-07-22', '456 Oak Ave, City, Country'),
    ('Carol Davis', 'carol.davis@example.com', '+1234567892', '1998-11-08', '789 Pine Rd, City, Country'),
    ('David Wilson', 'david.wilson@example.com', '+1234567893', '1990-05-30', '321 Elm St, City, Country'),
    ('Eva Brown', 'eva.brown@example.com', '+1234567894', '1996-09-12', '654 Maple Dr, City, Country');
  `);

  // Insert sample subscriptions
  pgm.sql(`
    INSERT INTO subscriptions (student_id, course_id, subscription_date) VALUES
    (1, 1, CURRENT_TIMESTAMP),
    (1, 2, CURRENT_TIMESTAMP - INTERVAL '1 month'),
    (2, 1, CURRENT_TIMESTAMP - INTERVAL '2 weeks'),
    (2, 3, CURRENT_TIMESTAMP - INTERVAL '3 weeks'),
    (3, 2, CURRENT_TIMESTAMP - INTERVAL '1 week'),
    (3, 4, CURRENT_TIMESTAMP - INTERVAL '10 days'),
    (4, 1, CURRENT_TIMESTAMP - INTERVAL '5 days'),
    (4, 5, CURRENT_TIMESTAMP - INTERVAL '8 days'),
    (5, 3, CURRENT_TIMESTAMP - INTERVAL '12 days'),
    (5, 4, CURRENT_TIMESTAMP - INTERVAL '15 days');
  `);
};

exports.down = (pgm) => {
  pgm.sql('DELETE FROM subscriptions');
  pgm.sql('DELETE FROM students');
  pgm.sql('DELETE FROM courses');
};