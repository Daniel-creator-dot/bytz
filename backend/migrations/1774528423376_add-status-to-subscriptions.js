/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.addColumn('subscriptions', {
    status: { type: 'varchar(20)', notNull: true, default: 'pending' }
  });
};

exports.down = (pgm) => {
  pgm.dropColumn('subscriptions', 'status');
};
