exports.up = (pgm) => {
  pgm.createTable('assignments', {
    id: 'id',
    course_id: {
      type: 'integer',
      notNull: true,
      references: '"courses"',
      onDelete: 'cascade',
    },
    title: { type: 'varchar(255)', notNull: true },
    description: { type: 'text' },
    due_date: { type: 'timestamp' },
    created_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('assignments');
};
