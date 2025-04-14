import express from 'express';
import cors from 'cors';
import chalk from 'chalk';
import cookieParser from 'cookie-parser';

import dbInit from './db/index.js';

import { userRouter, bookRouter } from './routes/index.js';
import { errorHandler, ErrorResponse } from './utils/index.js';
import mongoose from 'mongoose';

await dbInit();

const app = express();

const port = process.env.PORT || 8901;
// app.use(cors());

app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:5173', 'https://wdg21-personal-library.netlify.app'],
  })
);

app.use(express.json(), cookieParser());

app.get('/', async (req, res) => {
  const dbResponse = await mongoose.connection.db.admin().ping();
  if (dbResponse.ok !== 1) throw new ErrorResponse('DB not connected', 503);
  res.json({ message: 'Running', dbResponse });
});

app.use('/users', userRouter);
app.use('/books', bookRouter);

app.use('/*splat', (req, res) => {
  throw new ErrorResponse(`Check the route. You used ${req.originalUrl}`, 404);
});

app.use(errorHandler);

app.listen(port, () => console.log(chalk.bgGreen(` Library API listening on port ${port}... `)));
