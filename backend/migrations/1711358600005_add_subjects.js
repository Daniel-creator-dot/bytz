/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  // Create subjects table
  pgm.createTable('subjects', {
    id: { type: 'serial', primaryKey: true },
    name: { type: 'varchar(255)', notNull: true, unique: true },
    created_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  });

  // Create instructor_subjects many-to-many table
  pgm.createTable('instructor_subjects', {
    id: { type: 'serial', primaryKey: true },
    instructor_id: {
      type: 'integer',
      notNull: true,
      references: '"instructors"',
      onDelete: 'CASCADE',
    },
    subject_id: {
      type: 'integer',
      notNull: true,
      references: '"subjects"',
      onDelete: 'CASCADE',
    },
    created_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  });

  // Add unique constraint to prevent duplicate assignments
  pgm.addConstraint('instructor_subjects', 'unique_instructor_subject', {
    unique: ['instructor_id', 'subject_id'],
  });

  // Seed initial subjects
  pgm.sql(`
    INSERT INTO subjects (name) VALUES
    ('Web Development'),
    ('Mobile App Development'),
    ('Data Science'),
    ('UI/UX Design'),
    ('Digital Marketing'),
    ('Cybersecurity'),
    ('Cloud Computing'),
    ('Artificial Intelligence');
  `);

  // Migrate existing specialization data (optional but good for consistency)
  pgm.sql(`
    INSERT INTO instructor_subjects (instructor_id, subject_id)
    SELECT i.id, s.id
    FROM instructors i
    JOIN subjects s ON i.specialization = s.name;
  `);
};

exports.down = (pgm) => {
  pgm.dropTable('instructor_subjects');
  pgm.dropTable('subjects');
};
