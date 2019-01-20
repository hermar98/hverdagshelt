// @flow
import {
    User,
    syncSmall
} from '../src/models';

const request = require('supertest');
const app = require('../src/app');



let useremail = 'test@test.no';
let pw = '1';
let token = '';

beforeAll(async () => {
  await syncSmall;
  const response = await request(app)
    .post('/login')
    .send({ email: useremail, password: pw });
  token = response.body.jwt;
  // Sync database
  //gå til /login
});

describe('Test the root path', () => {
  test('It should response the GET method', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
  });
});

//Public test
describe('Public tests', () => {
  //Post register new user
  test('POST /register', async () => {
    let totalUsers = await User.count(); // entries in database
    let user = { firstName: 'A', lastName: 'B', email: 'test@test.ce', rank: 1, password: '1' };
    const response = await request(app)
      .post('/register')
      .send(user);
    expect(response.statusCode).toBe(200);
    expect(await User.count()).toEqual(totalUsers + 1);
  });
  //POST login as a user
  test('POST /login', async () => {
    let user = { email: 'test@test.ce', password: '1' };
    const response = await request(app)
      .post('/login')
      .send(user);
    expect(response.statusCode).toBe(200);
  });
});




