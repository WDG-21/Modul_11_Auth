import { Router } from 'express';
import {
  getUserByID,
  // getAllUsers,
  // createUser,
  // updateUserByID,
  // deleteUserByID,
  addBookToReadingList,
  updateBookStatus,
  deleteBookFromReadingList,
} from '../controllers/userControllers.js';

import { getAll, getOneByID, createOne, updateOneByID, deleteOneByID } from '../controllers/crudFactory.js';
import User from '../models/UserModel.js';
import validate from '../middlewares/validate.js';
import UserSchema from '../schemas/UserSchema.js';

const userRouter = Router();

// userRouter.get('/', getAllUsers);
userRouter.get('/:id', getUserByID);
// userRouter.post('/', createUser);
// userRouter.put('/:id', updateUserByID);
// userRouter.delete('/:id', deleteUserByID);

userRouter.get('/', getAll(User));
// userRouter.get('/:id', getOneByID(User));
userRouter.post('/', validate(UserSchema), createOne(User));
userRouter.put('/:id', updateOneByID(User));
userRouter.delete('/:id', deleteOneByID(User));

userRouter.post('/:userId/books/:bookId', addBookToReadingList);
userRouter.put('/:userId/books/:bookId', updateBookStatus);
userRouter.delete('/:userId/books/:bookId', deleteBookFromReadingList);

export default userRouter;
