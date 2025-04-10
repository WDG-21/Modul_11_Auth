import User from '../models/UserModel.js';
import Book from '../models/BookModel.js';
import ErrorResponse from '../utils/ErrorResponse.js';

const getAllUsers = async (req, res) => {
  const users = await User.find().lean();
  res.json({ data: users });
};

const getUserByID = async (req, res) => {
  const { id } = req.params;
  const book = await User.findById(id).populate('readingList.bookRefId', 'title genre').lean();
  if (!book) throw new ErrorResponse('Book not found', 404);
  res.json({ data: book });
};

const createUser = async (req, res) => {
  const book = await User.create(req.body);
  res.status(201).json({ message: 'Book created successfully', data: book });
};

const updateUserByID = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
  if (!user) throw new ErrorResponse('user not found', 404);
  res.json({ message: 'user updated successfully', data: user });
};

const deleteUserByID = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByIdAndDelete(id);
  if (!user) throw new ErrorResponse('user not found', 404);
  res.json({ message: 'user deleted successfully', data: user });
};

const addBookToReadingList = async (req, res) => {
  const { userId, bookId } = req.params;

  const bookExists = await Book.exists({ _id: bookId });
  if (!bookExists) throw new ErrorResponse('Book not found', 404);

  const user = await User.findById(userId);
  if (!user) throw new ErrorResponse('User not found', 404);

  if (user.readingList.find((book) => book.bookRefId.toString() === bookId)) {
    throw new ErrorResponse('Book already on reading list', 409);
  }

  user.readingList.push({ bookRefId: bookId });

  await user.save();

  res.json({ message: `Successfully added book to reading list`, data: user });
};

const updateBookStatus = async (req, res) => {
  const { userId, bookId } = req.params;
  const { status } = req.body;

  const bookExists = await Book.exists({ _id: bookId });
  if (!bookExists) throw new ErrorResponse('Book not found', 404);

  const user = await User.findOneAndUpdate(
    { _id: userId, 'readingList.bookRefId': bookId },
    { $set: { 'readingList.$.status': status } },
    { new: true, runValidators: true }
  );
  if (!user) throw new ErrorResponse('User not found', 404);

  res.json({ message: `Successfully updated status to ${status}`, data: user });
};

const deleteBookFromReadingList = async (req, res) => {
  const { userId, bookId } = req.params;

  const bookExists = await Book.exists({ _id: bookId });
  if (!bookExists) throw new ErrorResponse('Book not found', 404);

  const user = await User.findByIdAndUpdate(
    userId,
    { $pull: { readingList: { bookRefId: bookId } } },
    { new: true, runValidators: true }
  );

  if (!user) throw new ErrorResponse('User not found', 404);
  res.json({ message: `Successfully removed book fro reading list`, data: user });
};

export {
  getUserByID,
  getAllUsers,
  createUser,
  updateUserByID,
  deleteUserByID,
  addBookToReadingList,
  updateBookStatus,
  deleteBookFromReadingList,
};
