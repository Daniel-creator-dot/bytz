/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.addColumn('exams', {
    max_attempts: { type: 'integer', notNull: true, default: 1 }
  });
};

exports.down = (pgm) => {
  pgm.dropColumn('exams', 'max_attempts');
};
