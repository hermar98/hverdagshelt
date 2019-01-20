// @flow
import {
    UserIssue,
    syncSmall
} from '../../src/models';

const request = require('supertest');
const app = require('../../src/app');

require('../../src/routes/userIssue');

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


//userIssues tests
describe('userIssues tests',() => {
    //GET /secure/users/:id/issues
    test('GET /secure/users/:id/issues', async ()=>{
        const r1 = await request(app).post('/secure/users/1/issues/2 ').set({ 'x-access-token': token });
        const r2 = await request(app).post('/secure/users/1/issues/3').set({ 'x-access-token': token });
        expect(r1.statusCode).toBe(200);
        expect(r2.statusCode).toBe(200);

        const response = await request(app).get('/secure/users/1/issues').set({ 'x-access-token': token });
        expect(response.statusCode).toBe(200);
        expect(response.type).toEqual('application/json');
        console.log(response.body);


        //TODO: Fix so it checks result
    });

    //POST /secure/users/:userId/issues/:issueId
    test('POST /secure/users/:userId/issues/:issueId', async () => {
        let count = await UserIssue.count(); // entries in database
        const response = await request(app)
            .post('/secure/users/1/issues/4')
            .set({ 'x-access-token': token });
        expect(response.statusCode).toBe(200);
        expect(await UserIssue.count()).toEqual(count + 1);
    });
    //DELETE /secure/users/:userId/issue/:issueId
    test('DELETE /secure/users/:userId/issues/:issueId', async () => {
        let count = await UserIssue.count();
        const response = await request(app)
            .delete('/secure/users/1/issues/2')
            .set({ 'x-access-token': token });
        expect(response.statusCode).toBe(200);
        expect(await UserIssue.count()).toBe(count - 1);
    });
});