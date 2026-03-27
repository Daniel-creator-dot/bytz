/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.addColumn('students', {
    password: { type: 'varchar(255)', notNull: false } // notNull: false initially to prevent breaking existing students
  });
};

exports.down = (pgm) => {
  pgm.dropColumn('students', 'password');
};
