const { Pool } = require('pg');
require('dotenv').config();

let pool;

try {
  const sslConfig = process.env.DB_SSL === 'true' ? {
    rejectUnauthorized: process.env.DB_SSL_REJECT_UNAUTHORIZED === 'true'
  } : false;

  pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    ssl: sslConfig
  });
  
  pool.on('error', (err) => {
    console.error('Error en el pool de PostgreSQL', err);
  });
  
  pool.query('SELECT NOW()', (err, res) => {
    if (err) {
      console.error('Error al conectar:', err);
    } else {
      console.log('Conexión establecida a la base de datos');
    }
  });
} catch (error) {
  console.error('Error al crear el pool de conexión:', error);
}

module.exports = pool;