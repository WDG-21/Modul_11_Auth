import Joi from 'joi';
import { isbnPattern } from '../utils/regex.js';

const BookSchema = Joi.object({
  title: Joi.string().max(500).required().messages({
    'string.max': 'Title cannot exceed {#limit} characters',
    'string.base': 'Title must be a string',
    'any.required': 'Title is required',
  }),

  author: Joi.string().max(250).messages({
    'string.max': 'Author name cannot exceed {#limit} characters',
    'string.base': 'Author must be a string',
  }),

  description: Joi.string().max(5000).messages({
    'string.max': 'Description cannot exceed {#limit} characters',
    'string.base': 'Description must be a string',
  }),

  year: Joi.number().min(-5000).max(3000).messages({
    'number.min': 'Year must be at least {#limit}',
    'number.max': 'Year cannot exceed {#limit}',
    'number.base': 'Year must be a number',
  }),

  isbn: Joi.string().pattern(isbnPattern).messages({
    'string.pattern.base': 'Please provide a valid ISBN',
    'string.base': 'ISBN must be a string',
  }),

  genre: Joi.array()
    .items(
      Joi.string().max(50).messages({
        'string.max': 'Each genre cannot exceed {#limit} characters',
        'string.base': 'Genres must be strings',
      })
    )
    .messages({
      'array.base': 'Genres must be an array',
    }),
});

export default BookSchema;

// Title must be a string
