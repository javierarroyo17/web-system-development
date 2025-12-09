import pool from './pool.js';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Obtener la ruta del archivo actual para leer el SQL
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const initDb = async () => {
  try {
    // Lee el archivo SQL
    const sqlPath = path.join(__dirname, 'init.sql');
    const sql = fs.readFileSync(sqlPath, 'utf8');

    // Ejecuta las consultas
    await pool.query(sql);
    console.log('✅ Base de datos inicializada con tablas y datos de prueba.');
  } catch (error) {
    console.error('❌ Error al inicializar la base de datos:', error);
  } finally {
    // Cierra la conexión al terminar
    await pool.end();
  }
};

initDb();