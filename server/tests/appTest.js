// @flow
import { Issue_category, Event_category, sync } from '../src/models';

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

describe('GET /', () => {
  test('It should respond with a JSON file', async () => {
    const response = await request(app).get('/county');
    expect(response.statusCode).toBe(200);
    expect(response.type).toEqual('application/json');
  });
});

//User
//Get all users
describe('GET /users', () => {
  test('It should return a JSON file of all users', async () => {
    const response = await request(app).get('/county');
    expect(response.statusCode).toBe(200);
    expect(response.type).toEqual('application/json');
  });
});
//Get one user  with id
describe('GET /users/:id', () => {
  test('It should return a JSON file of one user with specified id (1)', async () => {
    const response = await request(app).get('/users/1');
    expect(response.statusCode).toBe(200);
    expect(response.type).toEqual('application/json');
  });
});
//Post user
//Put user
//Delete user
//Municipal
//Get all Municipalities
//Get one Municipal with id

//County
//Get All Counties
//Get One Municipal with id

//Issue
//Get one Issue with user id

//Event
//Get all Events
//Get one event  with id
//Update one event with id
//Create one event
//Delete one event with id

//Event_category
describe('Event Category Test', () => {
  test('GET all event categorys', async () => {
    const response = await request(app).get('/eventCat');
    expect(response.statusCode).toBe(200);
    expect(response.type).toEqual('application/json');
    expect(response.body.length).toEqual(await Event_category.count());
  });

  test('GET Event Category with id = 1', async () => {
    const response = await request(app).get('/eventCat/1');
    expect(response.statusCode).toBe(200);
    expect(response.type).toEqual('application/json');
  });

  test('DELETE Event category with id = 1', async () => {
    let n = await Event_category.count();
    const response = await request(app).delete('/eventCat/1');
    expect(response.statusCode).toBe(200);
    expect(await Event_category.count()).toBe(n - 1);
  });
});
//Update one event_category with id
//Create one event_category

//Issue_category
describe('Event Category Test', () => {
  test('GET all issue category', async () => {
    const response = await request(app).get('/issueCat');
    expect(response.statusCode).toBe(200);
    expect(response.type).toEqual('application/json');
    expect(response.body.length).toEqual(await Issue_category.count());
  });
  test('GET Issue Category with id = 1', async () => {
    const response = await request(app).get('/issueCat/1');
    expect(response.statusCode).toBe(200);
    expect(response.type).toEqual('application/json');
  });

  test('DELETE Issue category with id = 1', async () => {
    let n = await Issue_category.count();
    const response = await request(app).delete('/issueCat/1');
    expect(response.statusCode).toBe(200);
    expect(await Issue_category.count()).toBe(n - 1);
  });
});
//Update one issue_category with id
//Create one issue_category
