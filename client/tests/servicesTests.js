import { User } from '../../models.js';
import { userService, issueService } from '../../services.js';
import {sync} from "../../server/src/models";
const app = require('../src/app');


let useremail = 'test@test.no';
let pw = '1';
let token = 'noe';

beforeAll(async () => {
  await sync;
  const response = await request(app)
    .post('/login')
    .send({ email: useremail, password: pw });
  token = response.body.jwt;
  // Sync database
  //gå til /login
});
beforeEach(async () => {});

describe('Test userService', () => {
  test('Testing getUsers', async () => {
  });
});
