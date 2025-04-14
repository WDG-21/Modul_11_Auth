import express, { Router } from 'express';
import chalk from 'chalk';

import app from './app.js';

import dbInit from './db/index.js';

const port = process.env.PORT || 8901;

dbInit()
  .then(() => {
    app.listen(port, () => console.log(chalk.bgGreen(` Library API listening on port ${port}... `)));
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
