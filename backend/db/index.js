import { mongoose } from 'mongoose';
import chalk from 'chalk';

export default async function dbInit() {
  try {
    const mongo = await mongoose.connect(process.env.MONGO_URI, { dbName: 'Library' });
    console.log(chalk.cyan(`DB connected to ${mongo.connection.name}`));
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}
