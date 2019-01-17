// @flow
import {
    UserIssue,
    UserMunicipal,
    // Feedback,
    IssueCategory,
    EventCategory,
    Event,
    Issue,
    County,
    Municipal,
    User,
    sync
} from '../../src/models';

const request = require('supertest');
const app = require('../../src/app');

require('../../src/routes/forgotPassword');

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

//TODO: Tests for forgotPassword
describe('NEED TEST', () => {
    test('1 TEST', async () => {
        expect(1).toBe(1);
    })
});