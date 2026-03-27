exports.up = (pgm) => {
  pgm.addColumn('exams', {
    due_date: { type: 'timestamp' },
  });
};

exports.down = (pgm) => {
  pgm.dropColumn('exams', 'due_date');
};
