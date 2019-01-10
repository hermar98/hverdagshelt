// @flow
import {sync} from '../src/models';

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
  //Get all event_categories
  //GEt one event_category with id
  //Update one event_category with id
  //Create one event_category
  //Delete one event_category with id

//Issue_category
  //Get all issue_category
  //GEt one issue_category with id
  //Update one issue_category with id
  //Create one issue_category
  //Delete one issue_category with id

