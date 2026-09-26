const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // e.g. postgresql://user:password@localhost:5432/mydb
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};