// @flow
import {
    IssueCategory,
    sync
} from '../../src/models';

const request = require('supertest');
const app = require('../../src/app');

require('../../src/routes/issueCategory');

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

//IssueCategory
describe('Issue Category Test', () => {
    //GET all issue categories
    test('GET all issue category', async () => {
        const response = await request(app)
            .get('/secure/issueCat')
            .set({ 'x-access-token': token });
        expect(response.statusCode).toBe(200);
        expect(response.type).toEqual('application/json');
        expect(response.body.length).toEqual(await IssueCategory.count());
    });
    //Get one issue category
    test('GET Issue Category with id = 1', async () => {
        const response = await request(app)
            .get('/secure/issueCat/1')
            .set({ 'x-access-token': token });
        expect(response.statusCode).toBe(200);
        expect(response.type).toEqual('application/json');
    });

    //Update one issueCategory with id
    test('PUT /secure/issueCat/:id', async () => {
        const updateEventResponse = await request(app)
            .put('/secure/issueCat/1')
            .send({ name: 'Poker' })
            .set({ 'x-access-token': token });

        expect(updateEventResponse.statusCode).toBe(200);

        const response = await request(app)
            .get('/secure/issueCat/1')
            .set({ 'x-access-token': token });

        expect(response.body.name).toBe('Poker');
    });

    //Create one issueCategory
    test('POST /secure/issueCat', async () => {
        let count = await IssueCategory.count(); // entries in database
        let event = { name: 'Konsert' };
        const response = await request(app)
            .post('/secure/issueCat')
            .send(event)
            .set({ 'x-access-token': token });
        expect(response.statusCode).toBe(200);
        expect(await IssueCategory.count()).toEqual(count + 1);
    });
    //Delete issue category
    test('DELETE Issue category with id = 1', async () => {
        let n = await IssueCategory.count();
        const response = await request(app)
            .delete('/secure/issueCat/1')
            .set({ 'x-access-token': token });
        expect(response.statusCode).toBe(200);
        expect(await IssueCategory.count()).toBe(n - 1);
    });
});