exports.up = (pgm) => {
  pgm.addColumn('exams', {
    start_date: { type: 'timestamp' },
  });
};

exports.down = (pgm) => {
  pgm.dropColumn('exams', 'start_date');
};
