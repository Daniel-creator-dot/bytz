-- BYTZ Academy Database Schema (PostgreSQL)

-- Drop existing tables if they exist
DROP TABLE IF EXISTS subscriptions;
DROP TABLE IF EXISTS students;
DROP TABLE IF EXISTS courses;
DROP TABLE IF EXISTS instructors;

-- Create instructors table
CREATE TABLE instructors (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL DEFAULT 'password123',
    specialization VARCHAR(255),
    bio TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create courses table
CREATE TABLE courses (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    duration VARCHAR(100),
    price DECIMAL(10,2),
    instructor_id INT,
    category VARCHAR(100),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (instructor_id) REFERENCES instructors(id) ON DELETE SET NULL
);

-- Create index for courses
CREATE INDEX idx_courses_title ON courses(title);
CREATE INDEX idx_courses_category ON courses(category);
CREATE INDEX idx_courses_active ON courses(is_active);

-- Create students table
CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    date_of_birth DATE,
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index for students
CREATE INDEX idx_students_email ON students(email);

-- Create subscriptions table
CREATE TABLE subscriptions (
    id SERIAL PRIMARY KEY,
    student_id INT NOT NULL,
    course_id INT NOT NULL,
    subscription_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
    UNIQUE (student_id, course_id)
);

-- Create index for subscriptions
CREATE INDEX idx_subscriptions_student_id ON subscriptions(student_id);
CREATE INDEX idx_subscriptions_course_id ON subscriptions(course_id);
CREATE INDEX idx_subscriptions_active ON subscriptions(is_active);

-- Create function to update timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_courses_updated_at BEFORE UPDATE ON courses FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_students_updated_at BEFORE UPDATE ON students FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_subscriptions_updated_at BEFORE UPDATE ON subscriptions FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_instructors_updated_at BEFORE UPDATE ON instructors FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- Insert sample data
INSERT INTO instructors (name, email, password, specialization, bio) VALUES
('John Doe', 'john.doe@example.com', 'password123', 'Web Development', 'Expert in HTML, CSS and JS'),
('Jane Smith', 'jane.smith@example.com', 'password123', 'Programming', 'Senior Software Engineer'),
('Bob Johnson', 'bob.johnson@example.com', 'password123', 'Data Science', 'Data Scientist at Tech Corp'),
('Alice Brown', 'alice.brown@example.com', 'password123', 'Mobile Development', 'Mobile App Expert'),
('Charlie Wilson', 'charlie.wilson@example.com', 'password123', 'Design', 'UI/UX Designer');

INSERT INTO courses (title, description, duration, price, instructor_id, category) VALUES
('Web Development Fundamentals', 'Learn the basics of web development including HTML, CSS, and JavaScript', '12 weeks', 299.99, 1, 'Web Development'),
('Advanced JavaScript', 'Master advanced JavaScript concepts and modern frameworks', '8 weeks', 399.99, 2, 'Programming'),
('Python for Data Science', 'Introduction to Python programming and data analysis', '10 weeks', 349.99, 3, 'Data Science'),
('Mobile App Development', 'Build native and hybrid mobile applications', '14 weeks', 449.99, 4, 'Mobile Development'),
('UI/UX Design Principles', 'Learn design principles and tools for creating great user experiences', '6 weeks', 249.99, 5, 'Design');

INSERT INTO students (name, email, phone, date_of_birth, address) VALUES
('Alice Johnson', 'alice.johnson@example.com', '+1234567890', '1995-03-15', '123 Main St, City, Country'),
('Bob Smith', 'bob.smith@example.com', '+1234567891', '1992-07-22', '456 Oak Ave, City, Country'),
('Carol Davis', 'carol.davis@example.com', '+1234567892', '1998-11-08', '789 Pine Rd, City, Country'),
('David Wilson', 'david.wilson@example.com', '+1234567893', '1990-05-30', '321 Elm St, City, Country'),
('Eva Brown', 'eva.brown@example.com', '+1234567894', '1996-09-12', '654 Maple Dr, City, Country');

-- Sample subscriptions
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