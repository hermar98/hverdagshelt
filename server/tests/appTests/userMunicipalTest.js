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

require('../../src/routes/userMunicipal');

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

//userMunicipals tests
describe('userMunicipals tests',() => {
    //GET /secure/userMun/:id
    test('GET /secure/users/:id/mun', async ()=>{
        const r1 = await request(app).post('/secure/users/1/mun/5001').set({ 'x-access-token': token });
        const r2 = await request(app).post('/secure/users/1/mun/807').set({ 'x-access-token': token });
        expect(r1.statusCode).toBe(200);
        expect(r2.statusCode).toBe(200);

        const response = await request(app).get('/secure/users/1/mun').set({ 'x-access-token': token });
        expect(response.statusCode).toBe(200);
        expect(response.type).toEqual('application/json');
        console.log((response.body));


        //TODO: Fix so it checks result
    });

    //POST /secure/user/:userId/mun/:munId
    test('POST /secure/users/:userId/mun/:munId', async () => {
        let count = await UserMunicipal.count(); // entries in database

        const response = await request(app)
            .post('/secure/users/1/mun/935')
            .set({ 'x-access-token': token });
        expect(response.statusCode).toBe(200);
        expect(await UserMunicipal.count()).toEqual(count + 1);
    });
    //DELETE /secure/users/:userId/mun/:munId
    test('DELETE /secure/users/:userId/mun/:munId', async () => {
        let count = await UserMunicipal.count();
        const response = await request(app)
            .delete('/secure/users/1/mun/935')
            .set({ 'x-access-token': token });
        expect(response.statusCode).toBe(200);
        expect(await UserMunicipal.count()).toBe(count - 1);
    });
});