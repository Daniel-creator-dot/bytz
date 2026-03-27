const { Pool } = require('pg');
const path = require('path');
const runner = require('node-pg-migrate');
require('dotenv').config();

// Create connection pool
const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Run migrations
async function runMigrations() {
  try {
    console.log('Checking for database migrations...');
    await runner({
      databaseUrl: {
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: parseInt(process.env.DB_PORT, 10),
      },
      dir: path.join(__dirname, '../migrations'),
      direction: 'up',
      migrationsTable: 'pgmigrations',
      verbose: false,
    });
    console.log('Database migrations completed successfully');
  } catch (error) {
    console.error('Failed to run database migrations:', error.message);
  }
}

// Test the connection
async function testConnection() {
  try {
    const client = await pool.connect();
    console.log('PostgreSQL connected successfully');
    client.release();
    
    // Run migrations after testing connection
    await runMigrations();
  } catch (error) {
    console.error('PostgreSQL connection failed:', error.message);
    console.log('Please make sure PostgreSQL is running and check your database credentials in .env file');
    console.log(`Current host: ${process.env.DB_HOST}, port: ${process.env.DB_PORT}`);
  }
}

module.exports = {
  pool,
  testConnection,
  runMigrations
};