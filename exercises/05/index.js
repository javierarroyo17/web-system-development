// index.js
import express from 'express';
import bookRouter from './src/routes/bookRoutes.js';
import { requestLogger } from './src/middlewares/requestLogger.js';
import { unknownEndpoint } from './src/middlewares/unknownEndpoint.js';

const app = express();
const PORT = 3000;

// 1. Middleware para parsear JSON (Requisito fundamental para POST) [cite: 5867]
app.use(express.json());

// 2. Middleware propio para logs [cite: 6067]
app.use(requestLogger);

// 3. Middleware para servir archivos estáticos (HTML de bienvenida) [cite: 6412]
// Esto hará que al entrar a http://localhost:3000/ se vea tu index.html
app.use(express.static('public'));

// 4. Rutas de la API [cite: 5722]
// Todas las rutas definidas en bookRoutes se prefijarán con /books
app.use('/books', bookRouter);

// 5. Middleware para rutas no encontradas (debe ir al final de las rutas) [cite: 6072]
app.use(unknownEndpoint);

// Iniciar el servidor [cite: 5724]
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});