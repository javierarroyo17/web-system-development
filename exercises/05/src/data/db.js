// src/data/db.js

// 1. Inicializamos los datos en memoria con algunos libros de ejemplo
let books = [
  { id: "1", title: "1984", author: "George Orwell" },
  { id: "2", title: "To Kill a Mockingbird", author: "Harper Lee" },
  { id: "3", title: "The Great Gatsby", author: "F. Scott Fitzgerald" }
];

// 2. Función para obtener todos los libros (GET /books)
export const getAllBooks = () => {
  return books;
};

// 3. Función para buscar un libro por su ID (GET /books/:id)
export const getBookById = (id) => {
  return books.find((book) => book.id === id);
};

// 4. Función para crear un nuevo libro (POST /books)
export const createBook = (newBookData) => {
  // Generamos un ID simple basado en el máximo actual + 1
  const maxId = books.length > 0 
    ? Math.max(...books.map(n => Number(n.id))) 
    : 0;
    
  const newBook = {
    id: String(maxId + 1),
    ...newBookData // Esparce las propiedades title y author aquí
  };

  // Agregamos el libro al array (usando concat para no mutar directamente si fuera React, aunque aquí es backend)
  books = books.concat(newBook);
  return newBook;
};

// 5. Función para eliminar un libro (DELETE /books/:id)
export const deleteBook = (id) => {
  // Filtramos el array para excluir el libro con ese ID
  books = books.filter((book) => book.id !== id);
};