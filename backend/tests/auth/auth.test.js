import { describe, test, expect, beforeAll } from 'vitest';
import app from '../../app.js';
import request from 'supertest';

describe('Auth Flow', () => {
  // Arrage
  let agent;

  const userSignupData = {
    firstName: 'Ron',
    lastName: 'Weasly',
    email: 'king@keepers.quidditch.com',
    password: '!1Qwertzuiopü',
  };
  const loginData = {
    email: userSignupData.email,
    password: userSignupData.password,
  };

  beforeAll(() => {
    agent = request.agent(app);
  });

  // Act

  test('Should sign up a new user', async () => {
    const res = await agent.post('/api/v1/users').send(userSignupData);
    // console.log(res.body);
    expect(res.status).toBe(201);
    expect(res.body.user.email).toBe(userSignupData.email);
    expect(res.headers['set-cookie']).toBeDefined();
  });

  test('Should logout by clearing cookie', async () => {
    const res = await agent.post('/api/v1/users/logout');
    const cookies = res.headers['set-cookie'].toString().split('; ');
    const token = cookies.find((str) => str.startsWith('token'))?.replace('token=', '');
    expect(res.status).toBe(200);
    expect(token).toBe('');
  });

  test('Should login user and set cookie', async () => {
    const res = await agent.post('/api/v1/users/login').send(loginData);
    expect(res.status).toBe(200);

    expect(res.headers['set-cookie']).toBeDefined();
  });
  test('Should get /me info with cookie', async () => {
    const res = await agent.get('/api/v1/users/me');
    expect(res.status).toBe(200);
  });

  test('Should logout by clearing cookie', async () => {
    const res = await agent.post('/api/v1/users/logout');
    const cookies = res.headers['set-cookie'].toString().split('; ');
    const token = cookies.find((str) => str.startsWith('token'))?.replace('token=', '');
    expect(res.status).toBe(200);
    expect(token).toBe('');
  });

  test('Should be unauthorized after logout', async () => {
    const res = await agent.get('/api/v1/users/me');
    expect(res.status).toBe(401);
  });
});
