exports.up = (pgm) => {
  // Exams table
  pgm.createTable('exams', {
    id: 'id',
    course_id: {
      type: 'integer',
      notNull: true,
      references: '"courses"',
      onDelete: 'CASCADE',
    },
    title: { type: 'string', notNull: true },
    description: { type: 'text' },
    duration_minutes: { type: 'integer', notNull: true, default: 60 },
    created_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  });

  // Questions table
  pgm.createTable('questions', {
    id: 'id',
    exam_id: {
      type: 'integer',
      notNull: true,
      references: '"exams"',
      onDelete: 'CASCADE',
    },
    question_text: { type: 'text', notNull: true },
    options: { type: 'jsonb', notNull: true }, // Array of strings or objects [{id, text}]
    correct_answer: { type: 'string', notNull: true }, // The ID or text of the correct option
    points: { type: 'integer', notNull: true, default: 1 },
    created_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  });

  // Exam Submissions table
  pgm.createTable('exam_submissions', {
    id: 'id',
    exam_id: {
      type: 'integer',
      notNull: true,
      references: '"exams"',
      onDelete: 'CASCADE',
    },
    student_id: {
      type: 'integer',
      notNull: true,
      references: '"students"',
      onDelete: 'CASCADE',
    },
    answers: { type: 'jsonb', notNull: true }, // Object mapping question_id to student_answer
    score: { type: 'decimal', notNull: true },
    total_points: { type: 'integer', notNull: true },
    submitted_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  });

  // Indexes
  pgm.createIndex('exams', 'course_id');
  pgm.createIndex('questions', 'exam_id');
  pgm.createIndex('exam_submissions', ['exam_id', 'student_id']);
};

exports.down = (pgm) => {
  pgm.dropTable('exam_submissions');
  pgm.dropTable('questions');
  pgm.dropTable('exams');
};
