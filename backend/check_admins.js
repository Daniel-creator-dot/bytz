const { pool } = require('./config/db');

async function checkAdmins() {
  try {
    const { rows } = await pool.query('SELECT id, name, email FROM admins');
    console.log('ADMIN_ACCOUNTS:' + JSON.stringify(rows));
    process.exit(0);
  } catch (error) {
    console.error('Check failed:', error);
    process.exit(1);
  }
}
checkAdmins();
