import { Router } from 'express';
import {
  getAllBooks,
  getBookByID,
  createBook,
  updateBookByID,
  deleteBookByID,
} from '../controllers/booksControllers.js';

import { getAll, getOneByID, createOne, updateOneByID, deleteOneByID } from '../controllers/crudFactory.js';

import validate from '../middlewares/validate.js';
import BookSchema from '../schemas/BookSchema.js';
import Book from '../models/BookModel.js';

const bookRouter = Router();

bookRouter.get('/', getAllBooks);
// bookRouter.get('/:id', getBookByID);
// bookRouter.post('/', validate(BookSchema), createBook);
// bookRouter.put('/:id', updateBookByID);
// bookRouter.delete('/:id', deleteBookByID);

// bookRouter.get('/', getAll(Book));
bookRouter.get('/:id', getOneByID(Book));
bookRouter.post('/', validate(BookSchema), createOne(Book));
bookRouter.put('/:id', updateOneByID(Book));
bookRouter.delete('/:id', deleteOneByID(Book));

export default bookRouter;
