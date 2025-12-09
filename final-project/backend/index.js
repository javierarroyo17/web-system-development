import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import pool from './src/db/pool.js';
import router from './src/routes/routes.js';

const app = express();
const PORT = process.env.PORT || 3000;

// --- MIDDLEWARE DE LOGGING (Requisito del proyecto) ---
// Esto imprimirá en la terminal cada vez que alguien haga una petición
app.use((req, res, next) => {
  console.log(`📝 [${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
  next(); // Importante para dejar pasar la petición
});

// Middlewares estándar
app.use(cors());
app.use(express.json());

// Rutas principales de la API
app.use('/api', router);

// Endpoint extra para comprobar salud de la BD (opcional pero útil)
app.get('/api/ping', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ 
      status: 'ok', 
      message: 'Base de datos conectada', 
      time: result.rows[0].now 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error conectando a la BD' });
  }
});

// Arrancar el servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});