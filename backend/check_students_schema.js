const { pool } = require('./config/db');
pool.query("SELECT column_name FROM information_schema.columns WHERE table_name = 'students'")
  .then(r => console.log('STUDENT COLUMNS: ' + r.rows.map(c => c.column_name).join(', ')))
  .catch(console.error)
  .finally(() => pool.end());
