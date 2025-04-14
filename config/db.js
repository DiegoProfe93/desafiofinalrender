const { Pool } = require('pg');
require('dotenv').config();

let pool;

try {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });
  
  pool.on('error', (err) => {
    console.error('Error en el pool de PostgreSQL', err);
  });
  
  pool.query('SELECT NOW()', (err, res) => {
    if (err) {
      console.error('Error al conectar:', err);
    } else {
      console.log('Conexión establecida');
    }
  });
} catch (error) {
  console.error('Error:', error);
}

module.exports = pool;