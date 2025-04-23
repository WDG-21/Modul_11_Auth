import { describe, test, expect, beforeAll, afterAll } from 'vitest';
import app from '../../app.js';
import request from 'supertest';
import Book from '../../models/BookModel.js';
import testBooks from './exampleBooks.json';

describe('Public Book Endpoints', () => {
  // Setup
  beforeAll(async () => {
    await Book.insertMany(testBooks);
  });

  afterAll(async () => {
    await Book.deleteMany();
  });

  describe('GET /api/v1/books', () => {
    let res;
    beforeAll(async () => {
      res = await request(app).get('/api/v1/books');
    });

    test('Should return status code 200', () => {
      expect(res.status).toBe(200);
    });

    test('Should return correct number of books', () => {
      expect(res.body.data.length).toBe(10);
    });
  });

  describe('Invalid Input: GET /api/v1/books?limit', () => {
    let res;
    let limit = 'GREMLINS!!';
    // let limit = 0;
    beforeAll(async () => {
      res = await request(app).get(`/api/v1/books?limit=${limit}`);
    });

    test('Should return status default limit', () => {
      // console.log(res.body);
      expect(res.body.data.length).toBe(10);
    });
  });

  describe('GET /api/v1/books?search', () => {
    let res;
    let searchTerm = 'Tolkien';
    let books;
    beforeAll(async () => {
      res = await request(app).get(`/api/v1/books?search=${searchTerm}`);
      books = res.body.data;
    });

    test('Should return a JSON array in the response body', () => {
      expect(res.headers['content-type']).toMatch(/json/);
      expect(Array.isArray(books)).toBe(true);
    });

    test(`Should return books containing "${searchTerm}" `, () => {
      const allBooksMatch = books.every((book) => JSON.stringify(book).includes(searchTerm));

      expect(allBooksMatch).toBe(true);
    });
  });
});
