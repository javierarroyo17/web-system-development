// src/routes/bookRoutes.js
import { Router } from 'express';
// Importamos las funciones que creamos en el paso anterior
import { 
  getBooks, 
  getBook, 
  createBook, 
  deleteBook 
} from '../controllers/bookController.js';

const router = Router();

// Definimos las rutas.
// Nota: Usamos '/' porque en el archivo principal (index.js) diremos que
// este router se encarga de todo lo que empiece por '/books'.

// GET /books  y  POST /books
router.get('/', getBooks);
router.post('/', createBook);

// GET /books/:id  y  DELETE /books/:id
router.get('/:id', getBook);
router.delete('/:id', deleteBook);

export default router;