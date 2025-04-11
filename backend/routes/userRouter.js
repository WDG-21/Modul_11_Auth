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
import { UserSchema, LoginSchema } from '../schemas/UserSchema.js';
import { login, userSignup, logout, getMe } from '../controllers/authControllers.js';
import authenticate from '../middlewares/authenticate.js';
import hasPermissions from '../middlewares/hasPermissions.js';

const userRouter = Router();

userRouter.post('/', validate(UserSchema), userSignup);
userRouter.post('/login', validate(LoginSchema), login);
userRouter.post('/logout', logout);
userRouter.get('/me', authenticate, getMe);

userRouter.get('/', getAll(User));
userRouter.get('/:id', getUserByID);
userRouter.put('/:id', authenticate, hasPermissions('self'), updateOneByID(User));
userRouter.delete('/:id', authenticate, deleteOneByID(User));

userRouter.post('/:id/books/:bookId', authenticate, hasPermissions('self'), addBookToReadingList);
userRouter.put('/:id/books/:bookId', authenticate, hasPermissions('self'), updateBookStatus);
userRouter.delete('/:id/books/:bookId', authenticate, hasPermissions('self'), deleteBookFromReadingList);

export default userRouter;
