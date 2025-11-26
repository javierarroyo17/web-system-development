// src/controllers/bookController.js
import * as db from '../data/db.js';

// 1. Obtener todos los libros
export const getBooks = (req, res) => {
  const books = db.getAllBooks();
  res.json(books);
};

// 2. Obtener un libro específico por ID
export const getBook = (req, res) => {
  const id = req.params.id; // Accedemos al parámetro de la URL
  const book = db.getBookById(id);

  if (book) {
    res.json(book);
  } else {
    // Respondemos con 404 si no existe, siguiendo buenas prácticas REST
    res.status(404).json({ error: 'Book not found' });
  }
};

// 3. Crear un nuevo libro
export const createBook = (req, res) => {
  const body = req.body; // Accedemos a los datos enviados por el usuario

  // Validación simple: requerimos título y autor
  if (!body.title || !body.author) {
    return res.status(400).json({ 
      error: 'Content missing: title and author are required' 
    });
  }

  const newBook = db.createBook({
    title: body.title,
    author: body.author
  });

  // Respondemos con 201 (Created)
  res.status(201).json(newBook);
};

// 4. Eliminar un libro
export const deleteBook = (req, res) => {
  const id = req.params.id;
  const book = db.getBookById(id);

  if (book) {
    db.deleteBook(id);
    // Respondemos con 204 (No Content) para indicar éxito sin devolver datos
    res.status(204).end();
  } else {
    // Si el libro no existe, también podemos devolver 204 o 404. 
    // El módulo sugiere 204 por simplicidad, pero 404 es más explícito.
    res.status(404).end();
  }
};