/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('timetables', {
    id: { type: 'serial', primaryKey: true },
    course_id: {
      type: 'integer',
      notNull: true,
      references: '"courses"',
      onDelete: 'CASCADE',
    },
    day_of_week: { type: 'varchar(20)', notNull: true }, // e.g., 'Monday', 'Tuesday'
    start_time: { type: 'time', notNull: true },
    end_time: { type: 'time', notNull: true },
    location: { type: 'varchar(255)' }, // Room number or meeting link
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

  // Seed some initial timetable entries for existing courses
  pgm.sql(`
    INSERT INTO timetables (course_id, day_of_week, start_time, end_time, location)
    SELECT id, 'Monday', '10:00:00', '12:00:00', 'Room 101' FROM courses LIMIT 1;
    
    INSERT INTO timetables (course_id, day_of_week, start_time, end_time, location)
    SELECT id, 'Wednesday', '14:00:00', '16:00:00', 'Online - Zoom' FROM courses OFFSET 1 LIMIT 1;
  `);
};

exports.down = (pgm) => {
  pgm.dropTable('timetables');
};
