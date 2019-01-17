
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

require('../../src/routes/municipal');

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

//Municipal
describe('Municipality tests', () => {
    //Get all Municipalities

    test('GET /municipals', async () => {
        const response = await request(app)
            .get('/municipals')
            .set({ 'x-access-token': token });

        expect(response.statusCode).toBe(200);
        expect(response.type).toEqual('application/json');

        expect(response.body.length).toEqual(await Municipal.count());
    });
    //Get one Municipal with id
    test('GET /municipals/:id', async () => {
        const response = await request(app)
            .get('/municipals/528')
            .set({ 'x-access-token': token });
        expect(response.statusCode).toBe(200);
        expect(response.type).toEqual('application/json');

        expect(response.body.munId).toBe(528);
        expect(response.body.name).toBe('Østre Toten');
        expect(response.body.countyId).toBe(5);
        expect(response.body.municipalShield).toBe('https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/%C3%98stre_Toten_komm.svg/800px-%C3%98stre_Toten_komm.svg.png');
    });
});