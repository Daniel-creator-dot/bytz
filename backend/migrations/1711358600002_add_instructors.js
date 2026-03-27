/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  // Create instructors table
  pgm.createTable('instructors', {
    id: { type: 'serial', primaryKey: true },
    name: { type: 'varchar(255)', notNull: true },
    email: { type: 'varchar(255)', notNull: true, unique: true },
    password: { type: 'varchar(255)', notNull: true, default: 'password123' },
    specialization: { type: 'varchar(255)' },
    bio: { type: 'text' },
    created_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
    updated_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  });

  // Add instructor_id to courses and remove the old instructor varchar column
  // (Optional: migrate data if needed, but for now we just add the link)
  pgm.addColumn('courses', {
    instructor_id: {
      type: 'integer',
      references: '"instructors"',
      onDelete: 'SET NULL',
    },
  });

  // Seed some initial instructors
  pgm.sql(`
    INSERT INTO instructors (name, email, password, specialization, bio) VALUES
    ('John Doe', 'john.doe@example.com', 'password123', 'Web Development', 'Expert in HTML, CSS and JS'),
    ('Jane Smith', 'jane.smith@example.com', 'password123', 'Programming', 'Senior Software Engineer');
  `);

  // Link existing courses to instructors based on naming (heuristic)
  pgm.sql(`
    UPDATE courses SET instructor_id = (SELECT id FROM instructors WHERE name = 'John Doe' LIMIT 1) WHERE instructor = 'John Doe';
    UPDATE courses SET instructor_id = (SELECT id FROM instructors WHERE name = 'Jane Smith' LIMIT 1) WHERE instructor = 'Jane Smith';
  `);
};

exports.down = (pgm) => {
  pgm.dropColumn('courses', 'instructor_id');
  pgm.dropTable('instructors');
};
