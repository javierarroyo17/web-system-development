import 'dotenv/config';
import pg from 'pg';

const { Pool } = pg;

// Configuración de la conexión usando variables de entorno
const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

// Evento para confirmar conexión exitosa (opcional pero útil)
pool.on('connect', () => {
  console.log('Base de datos conectada correctamente');
});

export default pool;