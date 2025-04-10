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
import authenticate from '../middlewares/authenticate.js';
import hasPermissions from '../middlewares/hasPermissions.js';

const bookRouter = Router();

bookRouter.get('/', getAllBooks);
bookRouter.get('/:id', getOneByID(Book));
bookRouter.post('/', authenticate, hasPermissions('publisher'), validate(BookSchema), createOne(Book));
bookRouter.put('/:id', authenticate, updateOneByID(Book));
bookRouter.delete('/:id', authenticate, deleteOneByID(Book));

export default bookRouter;
