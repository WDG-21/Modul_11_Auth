import express, { Router } from 'express';
import { userRouter, bookRouter } from './routes/index.js';
import { errorHandler, ErrorResponse } from './utils/index.js';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();

const whitelist = ['http://localhost:5173', 'https://wdg21-personal-library.netlify.app'];
const corsOptions = {
  credentials: true,
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use(cors(corsOptions));

app.use(express.json(), cookieParser());

app.get('/', async (req, res) => {
  const dbResponse = await mongoose.connection.db.admin().ping();
  if (dbResponse.ok !== 1) throw new ErrorResponse('DB not connected', 503);
  res.json({ message: 'Running', dbResponse });
});

const v1Router = Router();

v1Router.use('/users', userRouter);
v1Router.use('/books', bookRouter);

app.use('/api/v1', v1Router);

app.use('/*splat', (req, res) => {
  throw new ErrorResponse(`Check the route. You used ${req.originalUrl}`, 404);
});

app.use(errorHandler);

export default app;
