import { describe, test, expect } from 'vitest';
import app from '../app.js';
import request from 'supertest';

describe('Health Endpoint', () => {
  test('Returns Status Code 200', async () => {
    const res = await request(app).get('/');

    // console.log(res.body);
    expect(res.status).toBe(200);
  });
});
