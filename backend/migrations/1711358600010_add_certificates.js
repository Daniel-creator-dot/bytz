exports.up = (pgm) => {
  pgm.createTable('certificates', {
    id: 'id',
    student_id: {
      type: 'integer',
      notNull: true,
      references: '"students"',
      onDelete: 'cascade',
    },
    course_id: {
      type: 'integer',
      notNull: true,
      references: '"courses"',
      onDelete: 'cascade',
    },
    instructor_id: {
      type: 'integer',
      notNull: true,
      references: '"instructors"',
      onDelete: 'cascade',
    },
    issue_date: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
    certificate_hash: { type: 'varchar(255)', notNull: true }, // For verification
    grade: { type: 'varchar(10)' },
  });

  // Unique constraint to prevent duplicate certificates for same student/course
  pgm.addConstraint('certificates', 'unique_student_course_cert', {
    unique: ['student_id', 'course_id'],
  });
};

exports.down = (pgm) => {
  pgm.dropTable('certificates');
};
