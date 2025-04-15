import express from 'express';
import chalk from 'chalk';
import cors from 'cors';
import mongoose from 'mongoose';

const dbInit = async () => {
  try {
    const mongo = await mongoose.connect(process.env.MONGO_URI, { dbName: 'aichat' });
    console.log(chalk.cyan(`Connected to DB ${mongo.connection.name}`));
  } catch (error) {
    console.log(error);
  }
};

await dbInit();

const port = process.env.PORT || 8080;

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Running' });
});

app.use((err, req, res, next) => res.status(err.cause?.status || 500).json({ message: err.message }));

app.listen(port, () => console.log(chalk.green(`Server listening on port ${port}`)));
