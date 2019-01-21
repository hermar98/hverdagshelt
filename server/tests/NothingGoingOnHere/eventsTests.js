// @flow
import {
    Event,
    syncSmall
} from '../../src/models';

const request = require('supertest');
const app = require('../../src/app');

require('../../src/routes/events');

let useremail = 'test@test.no';
let pw = '1';
let token = 'noe';

beforeAll(async () => {
    await syncSmall;
    const response = await request(app)
        .post('/login')
        .send({ email: useremail, password: pw });
    token = response.body.jwt;
    // syncSmall database
    //gå til /login
});

//Event
describe('Event tests', () => {
    //Get all Events
    test('GET /secure/events', async () => {
        const response = await request(app)
            .get('/secure/events')
            .set({ 'x-access-token': token });

        expect(response.statusCode).toBe(200);
        expect(response.type).toEqual('application/json');

        expect(response.body.length).toEqual(await Event.count());
    });
    //Get one event  with id
    test('GET /secure/events/:id', async () => {
        const response = await request(app)
            .get('/secure/events/1')
            .set({ 'x-access-token': token });
        expect(response.statusCode).toBe(200);
        expect(response.type).toEqual('application/json');

        expect(response.body.title).toBe('party at the house man!');
        expect(response.body.content).toBe('Det skal være party at the house!');
        expect(response.body.longitude).toBe(60.652168);
        expect(response.body.latitude).toBe(10.822102);
        expect(response.body.userId).toBe(1);
        expect(response.body.categoryId).toBe(1);
    });
    //Update one event with id
    test('PUT /secure/events/:id', async () => {
        const updateEventResponse = await request(app)
            .put('/secure/events/1')
            .send({ title: 'No bear left' })
            .set({ 'x-access-token': token });

        expect(updateEventResponse.statusCode).toBe(200);

        const response = await request(app)
            .get('/secure/events/1')
            .set({ 'x-access-token': token });

        expect(response.body.title).toBe('No bear left');
    });
    //Create one event
    test('POST /secure/events', async () => {
        let count = await Event.count(); // entries in database
        let event = { title: 'Gratis Øl for studenter', content: ':O', image: null, longitude: 63.1, latitude: 10.4 };
        const response = await request(app)
            .post('/secure/events')
            .send(event)
            .set({ 'x-access-token': token });
        expect(response.statusCode).toBe(200);
        expect(await Event.count()).toEqual(count + 1);
    });
    //Delete one event with id
    test('DELETE /secure/events/:id', async () => {
        let totalEvents = await Event.count();

        const response = await request(app)
            .delete('/secure/events/1')
            .set({ 'x-access-token': token });

        expect(response.statusCode).toBe(200);

        expect(await Event.count()).toBe(totalEvents - 1);
    });
});
