// @flow
import { sync } from '../src/models.js';

const request = require('supertest');
const app = require('../src/app');

beforeAll(async () => {
  await sync;
});

describe('Test the root path', () => {
  test('It should response the GET method', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
  });
});

describe('GET /county', () => {
  test('It should response the GET method', async () => {
    const response = await request(app).get('/county');
    expect(response.statusCode).toBe(200);
    expect(response.type).toEqual('application/json');
  });
});

describe('GET /municipal', () => {
  test('It should response the GET method', async () => {
    const response = await request(app).get('/municipal');
    expect(response.statusCode).toBe(200);
    expect(response.type).toEqual('application/json');
  });
});

describe('GET /user', () => {
  test('It should response the GET method', async () => {
    const response = await request(app).get('/users');
    expect(response.statusCode).toBe(200);
    expect(response.type).toEqual('application/json');
  });
});
