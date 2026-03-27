/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  // Create courses table
  pgm.createTable('courses', {
    id: { type: 'serial', primaryKey: true },
    title: { type: 'varchar(255)', notNull: true },
    description: { type: 'text' },
    duration: { type: 'varchar(100)' },
    price: { type: 'decimal(10,2)' },
    instructor: { type: 'varchar(255)' },
    category: { type: 'varchar(100)' },
    is_active: { type: 'boolean', default: true },
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
  pgm.createIndex('courses', 'title');
  pgm.createIndex('courses', 'category');
  pgm.createIndex('courses', 'is_active');

  // Create students table
  pgm.createTable('students', {
    id: { type: 'serial', primaryKey: true },
    name: { type: 'varchar(255)', notNull: true },
    email: { type: 'varchar(255)', notNull: true, unique: true },
    phone: { type: 'varchar(20)' },
    date_of_birth: { type: 'date' },
    address: { type: 'text' },
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
  pgm.createIndex('students', 'email');

  // Create subscriptions table
  pgm.createTable('subscriptions', {
    id: { type: 'serial', primaryKey: true },
    student_id: {
      type: 'integer',
      notNull: true,
      references: '"students"',
      onDelete: 'CASCADE',
    },
    course_id: {
      type: 'integer',
      notNull: true,
      references: '"courses"',
      onDelete: 'CASCADE',
    },
    subscription_date: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
    is_active: { type: 'boolean', default: true },
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
  pgm.addConstraint('subscriptions', 'unique_student_course', {
    unique: ['student_id', 'course_id'],
  });
  pgm.createIndex('subscriptions', 'student_id');
  pgm.createIndex('subscriptions', 'course_id');
  pgm.createIndex('subscriptions', 'is_active');

  // Create function to update timestamp
  pgm.createFunction(
    'update_updated_at_column',
    [],
    {
      returns: 'trigger',
      language: 'plpgsql',
      replace: true,
    },
    `
    BEGIN
        NEW.updated_at = NOW();
        RETURN NEW;
    END;
    `
  );

  // Create triggers for updated_at
  pgm.createTrigger('courses', 'update_courses_updated_at', {
    when: 'BEFORE',
    operation: 'UPDATE',
    level: 'ROW',
    function: 'update_updated_at_column',
  });
  pgm.createTrigger('students', 'update_students_updated_at', {
    when: 'BEFORE',
    operation: 'UPDATE',
    level: 'ROW',
    function: 'update_updated_at_column',
  });
  pgm.createTrigger('subscriptions', 'update_subscriptions_updated_at', {
    when: 'BEFORE',
    operation: 'UPDATE',
    level: 'ROW',
    function: 'update_updated_at_column',
  });
};

exports.down = (pgm) => {
  pgm.dropTable('subscriptions');
  pgm.dropTable('students');
  pgm.dropTable('courses');
  pgm.dropFunction('update_updated_at_column', []);
};