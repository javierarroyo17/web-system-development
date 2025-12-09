import pool from '../db/pool.js';

async function getBooks() {
  const result = await pool.query('SELECT * FROM books');
  return result.rows;
}

async function createBook(book) {
  const result = await pool.query(
    'INSERT INTO books (title, author, year) VALUES ($1, $2, $3) RETURNING *',
    [book.title, book.author, book.year]
  );
  return result.rows[0];
}

export default { getBooks, createBook };
