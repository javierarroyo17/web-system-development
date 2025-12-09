import bookModel from '../models/bookModel.js';

export async function getBooks(req, res) {
  const books = await bookModel.getBooks();
  res.json(books);
}

export async function createBook(req, res) {
  const { title, author, year } = req.body;

  if (!title || !author || !year) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  const newBook = await bookModel.createBook({ title, author, year });
  res.status(201).json(newBook);
}
