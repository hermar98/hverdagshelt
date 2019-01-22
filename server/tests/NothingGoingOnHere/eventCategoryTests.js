// @flow
import {
    EventCategory,
    syncSmall
} from '../../src/models';

const request = require('supertest');
const app = require('../../src/app');

require('../../src/routes/eventCategory');

let useremail = 'test@test.no';
let pw = '1';
let token = 'noe';

beforeAll(async () => {
    await syncSmall;
    const response = await request(app)
        .post('/login')
        .send({ email: useremail, password: pw });
    token = response.body.jwt;
    // Sync database
    //gå til /login
});

//EventCategory
describe('Event Category Test', () => {
    test('GET all event categories', async () => {
        const response = await request(app)
            .get('/secure/eventCat')
            .set({ 'x-access-token': token });
        expect(response.statusCode).toBe(200);
        expect(response.type).toEqual('application/json');
        expect(response.body.length).toEqual(await EventCategory.count());
    });

    test('GET Event Category with id = 1', async () => {
        const response = await request(app)
            .get('/secure/eventCat/1')
            .set({ 'x-access-token': token });
        expect(response.statusCode).toBe(200);
        expect(response.type).toEqual('application/json');
    });
    //Update one eventCategory with id
    test('PUT /secure/eventCat/:id', async () => {
        const updateEventResponse = await request(app)
            .put('/secure/eventCat/1')
            .send({ name: 'Poker' })
            .set({ 'x-access-token': token });

        expect(updateEventResponse.statusCode).toBe(200);

        const response = await request(app)
            .get('/secure/eventCat/1')
            .set({ 'x-access-token': token });

        expect(response.body.name).toBe('Poker');
    });

    //Create one eventCategory
    test('POST /secure/eventCat', async () => {
        let count = await EventCategory.count(); // entries in database
        let event = { name: 'Konsert' };
        const response = await request(app)
            .post('/secure/eventCat')
            .send(event)
            .set({ 'x-access-token': token });
        expect(response.statusCode).toBe(200);
        expect(await EventCategory.count()).toEqual(count + 1);
    });

    //Delete Event category
    test('DELETE Event category with id = 1', async () => {
        let n = await EventCategory.count();
        const response = await request(app)
            .delete('/secure/eventCat/1')
            .set({ 'x-access-token': token });
        expect(response.statusCode).toBe(200);
        expect(await EventCategory.count()).toBe(n - 1);
    });
});