// @flow

const request = require('supertest');
const app = require('../src/app');

describe('Test the root path', () => {
  test('It should response the GET method', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
  });
});

describe('GET /users', () => {
  test('It should response the GET method', async () => {
    const response = await request(app).get('/users');
    expect(response.statusCode).toBe(200);
    expect(response.type).toEqual('application/json');
  });
});
