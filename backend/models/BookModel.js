import { Schema, model } from 'mongoose';
import { isbnPattern } from '../utils/regex.js';

const bookSchema = new Schema({
  title: {
    type: String,
    maxLength: 500,
  },
  author: {
    type: String,
    maxLength: 250,
  },
  description: {
    type: String,
    maxLength: 5000,
  },
  year: {
    type: Number,
    min: -3000,
    max: 3000,
  },
  genre: [{ type: String, maxLength: 50 }],
  isbn: {
    type: String,
    match: [isbnPattern, 'Please provide a valid ISBN'],
  },
});

bookSchema.index({ title: 'text', author: 'text', description: 'text', genre: 'text' });

const Book = model('Book', bookSchema);
export default Book;
