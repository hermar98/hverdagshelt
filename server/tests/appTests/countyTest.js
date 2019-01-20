// @flow
import {
    County,
    syncSmall
} from '../../src/models';

const request = require('supertest');
const app = require('../../src/app');

require('../../src/routes/county');

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

//County
describe('County tests', () => {
    //Get All Counties
    test('GET /county', async () => {
        const response = await request(app)
            .get('/county')
            .set({ 'x-access-token': token });

        expect(response.statusCode).toBe(200);
        expect(response.type).toEqual('application/json');

        expect(response.body.length).toEqual(await County.count());
    });

    //Get One County with id

    test('GET /county/:id', async () => {
        const response = await request(app)
            .get('/county/1')
            .set({ 'x-access-token': token });
        expect(response.statusCode).toBe(200);
        expect(response.type).toEqual('application/json');

        expect(response.body.countyId).toBe(1);
        expect(response.body.name).toBe('Østfold');
    });
});