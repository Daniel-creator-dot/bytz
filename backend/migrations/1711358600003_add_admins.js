/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('admins', {
    id: { type: 'serial', primaryKey: true },
    name: { type: 'varchar(255)', notNull: true },
    email: { type: 'varchar(255)', notNull: true, unique: true },
    password: { type: 'varchar(255)', notNull: true },
    created_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  });

  // Seed default superadmin
  pgm.sql(`
    INSERT INTO admins (name, email, password) VALUES
    ('Super Admin', 'admin@bytz.com', 'admin123');
  `);
};

exports.down = (pgm) => {
  pgm.dropTable('admins');
};
