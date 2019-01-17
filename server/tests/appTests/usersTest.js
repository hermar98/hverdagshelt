// @flow
import {
    User,
    sync
} from '../../src/models';

const request = require('supertest');
const app = require('../../src/app');

require('../../src/routes/users');

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

//User
describe('User tests', () => {
    //Get all users
    test('GET /secure/users', async () => {
        //console.log(token);
        const response = await request(app)
            .get('/secure/users')
            .set({ 'x-access-token': token });
        console.log(response.body);
        expect(response.statusCode).toBe(200);
        expect(response.type).toEqual('application/json');

        expect(response.body.length).toEqual(await User.count());
    });

    //Get one user  with id
    test('GET /secure/users/:id', async () => {
        const response = await request(app)
            .get('/secure/users/1')
            .set({ 'x-access-token': token });
        expect(response.statusCode).toBe(200);
        expect(response.type).toEqual('application/json');

        expect(response.body.firstName).toBe('Vegard');
        expect(response.body.lastName).toBe('Andersson');
        expect(response.body.email).toBe('test@test.no');
        expect(response.body.rank).toBe(1);
        expect(response.body.salt).toBe('a83f4da094cc247b');
        expect(response.body.hashStr).toBe(
            '30fed7291ca557c9296862fa62267295708deebf0fa553d17efcf0ea1049965b3175b20cf9b18d18e0249f73cd3e25b9c3ec4413cb35353516731257d2735722'
        );
    });
    //Post user
    test('POST /secure/users', async () => {
        let totalUsers = await User.count(); // entries in database
        console.log(totalUsers);
        let user = { firstName: 'A', lastName: 'B', email: 'c@c.no', rank: 1, salt: '123', hashStr: '234' };
        const response = await request(app)
            .post('/secure/users')
            .send(user)
            .set({ 'x-access-token': token });
        expect(response.statusCode).toBe(200);
        expect(await User.count()).toEqual(totalUsers + 1);
    });
    //Put user

    test('PUT /secure/users/:id', async () => {
        const updateUserResponse = await request(app)
            .put('/secure/users/1')
            .send({ firstName: 'Jørgen' })
            .set({ 'x-access-token': token });

        expect(updateUserResponse.statusCode).toBe(200);

        const response = await request(app)
            .get('/secure/users/1')
            .set({ 'x-access-token': token });

        expect(response.body.firstName).toBe('Jørgen');
        expect(response.body.lastName).toBe('Andersson');
        expect(response.body.email).toBe('test@test.no');
        expect(response.body.rank).toBe(1);
        expect(response.body.salt).toBe('a83f4da094cc247b');
        expect(response.body.hashStr).toBe(
            '30fed7291ca557c9296862fa62267295708deebf0fa553d17efcf0ea1049965b3175b20cf9b18d18e0249f73cd3e25b9c3ec4413cb35353516731257d2735722'
        );

    });

    test('PUT /secure/users/:id', async () => {
        const updateUserResponse = await request(app)
            .put('/secure/users/1')
            .send({ firstName: 'Jørgen', password: '1', email: 'j@j.j' })
            .set({ 'x-access-token': token });

        expect(updateUserResponse.statusCode).toBe(200);

        const response = await request(app)
            .get('/secure/users/1')
            .set({ 'x-access-token': token });

        expect(response.body.firstName).toBe('Jørgen');
        expect(response.body.email).toBe('j@j.j');
        expect(response.body.rank).toBe(1);
    });

    //Delete user
    test('DELETE /secure/users/:id', async () => {
        let totalUsers = await User.count();

        const response = await request(app)
            .delete('/secure/users/2')
            .set({ 'x-access-token': token });

        expect(response.statusCode).toBe(200);

        expect(await User.count()).toBe(totalUsers - 1);
    });
});