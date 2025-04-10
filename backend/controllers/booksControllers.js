import Book from '../models/BookModel.js';
import ErrorResponse from '../utils/ErrorResponse.js';

const getAllBooks = async (req, res) => {
  const { page, limit, search } = req.query;

  const parsedPage = parseInt(page) || 1;
  const parsedLimit = parseInt(limit) ?? 10;

  const offset = (parsedPage - 1) * parsedLimit;

  let query = {};

  if (search) {
    query = { $text: { $search: search } };
  }

  const books = await Book.find(query).limit(parsedLimit).skip(offset).lean();
  res.json({ data: books });
};

const getBookByID = async (req, res) => {
  const { id } = req.params;
  const book = await Book.findById(id).lean();
  if (!book) throw new ErrorResponse('Book not found', 404);
  res.json({ data: book });
};

const createBook = async (req, res) => {
  const book = await Book.create(req.body);
  res.status(201).json({ message: 'Book created successfully', data: book });
};

const updateBookByID = async (req, res) => {
  const { id } = req.params;
  const book = await Book.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
  if (!book) throw new ErrorResponse('Book not found', 404);
  res.json({ message: 'Book updated successfully', data: book });
};

const deleteBookByID = async (req, res) => {
  const { id } = req.params;
  const book = await Book.findByIdAndDelete(id);
  if (!book) throw new ErrorResponse('Book not found', 404);
  res.json({ message: 'Book deleted successfully', data: book });
};

export { getAllBooks, getBookByID, createBook, updateBookByID, deleteBookByID };
