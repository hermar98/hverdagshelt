// @flow
import {Event,Issue,County,Municipal,User,sync} from '../src/models';

const request = require('supertest');
const app = require('../src/app');

beforeAll(async () => {
  await sync;
});
beforeEach(async () => {

});

describe('Test the root path', () => {
  test('It should response the GET method', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
  });
});

//User
describe('User tests', () => {
    //Get all users

    test('GET /users', async () => {
        const response = await request(app).get('/users');

        expect(response.statusCode).toBe(200);
        expect(response.type).toEqual('application/json');

        expect(response.body.length).toEqual(await User.count());

    });

  //Get one user  with id
    test('GET /users/:id', async () => {
        const response = await request(app).get('/users/1');
        expect(response.statusCode).toBe(200);
        expect(response.type).toEqual('application/json');

        expect(response.body.firstName).toBe('Vegard');
        expect(response.body.lastName).toBe('Andersson');
        expect(response.body.email).toBe('vegaande@ntnu.stud.no');
        expect(response.body.rank).toBe(1);
        expect(response.body.salt).toBe('b79ryp97');
        expect(response.body.hash_str).toBe('897dfjsodif5vx24c5vsldfskdclz97cyw7e3o2inJKHaospk902');
    });
  //Post user
/*
    test('POST /users', async () => {

        let totalUsers = await User.count(); // entries in database
        console.log(totalUsers);

        let user = {firstName: 'A', lastName: 'B', email: 'c@c.no', rank: 1, salt: '123', hash_str: '234'};

        //const response = await request(app).post('/users', (JSON.stringify(user));

        //expect(response.statusCode).toBe(200);
        //expect(await User.count()).toEqual(totalUsers+1);

    });
*/
  //Put user
/*
    test('PUT /users/:id', async () => {
        const updateUserResponse = await request(app).put('/users/1',{firstName:'Jørgen'});

        expect(updateUserResponse.statusCode).toBe(200);

        const response = await request(app).get('/users/1');

        expect(response.body.firstName).toBe('Jørgen');
        expect(response.body.lastName).toBe('Andersson');
        expect(response.body.email).toBe('vegaande@ntnu.stud.no');
        expect(response.body.rank).toBe(1);
        expect(response.body.salt).toBe('b79ryp97');
        expect(response.body.hash_str).toBe('897dfjsodif5vx24c5vsldfskdclz97cyw7e3o2inJKHaospk902');
    });
*/
  //Delete user
    test('DELETE /users/:id', async () => {
        let totalUsers = await User.count();

        const response = await request(app).delete('/users/1');

        expect(response.statusCode).toBe(200);

        expect(await User.count()).toBe(totalUsers-1);
    });
});
//Municipal
describe('Municipality tests', () => {
    //Get all Municipalities

    test('GET /municipal', async () => {
        const response = await request(app).get('/municipal');

        expect(response.statusCode).toBe(200);
        expect(response.type).toEqual('application/json');

        expect(response.body.length).toEqual(await Municipal.count());

    });
  //Get one Municipal with id
    test('GET /municipal/:id', async () => {
        const response = await request(app).get('/municipal/1');
        expect(response.statusCode).toBe(200);
        expect(response.type).toEqual('application/json');

        expect(response.body.mun_id).toBe(1);
        expect(response.body.name).toBe('Freia');
        expect(response.body.county_id).toBe(1);


    });
});
//County
describe('County tests', () => {
    //Get All Counties
    test('GET /county', async () => {
        const response = await request(app).get('/county');

        expect(response.statusCode).toBe(200);
        expect(response.type).toEqual('application/json');

        expect(response.body.length).toEqual(await County.count());

    });

  //Get One County with id

    test('GET /county/:id', async () => {
        const response = await request(app).get('/county/1');
        expect(response.statusCode).toBe(200);
        expect(response.type).toEqual('application/json');

        expect(response.body.county_id).toBe(1);
        expect(response.body.name).toBe('Trønderlag');


    });
});

//Issue
/*describe('Issue tests', () => {
    //Get one Issue with user id

    test('GET /issues', async () => {
        const response = await request(app).get('/issues');

        expect(response.statusCode).toBe(200);
        expect(response.type).toEqual('application/json');

        expect(response.body.length).toEqual(await Issue.count());

    });
});*/
//Event
describe('Event tests', () => {
    //Get all Events
    test('GET /events', async () => {
        const response = await request(app).get('/events');

        expect(response.statusCode).toBe(200);
        expect(response.type).toEqual('application/json');

        expect(response.body.length).toEqual(await Event.count());

    });
  //Get one event  with id
    test('GET /events/:id', async () => {
        const response = await request(app).get('/events/1');
        expect(response.statusCode).toBe(200);
        expect(response.type).toEqual('application/json');

        expect(response.body.title).toBe('party at the house man!');
        expect(response.body.content).toBe('Det skal være party at the house!');
        expect(response.body.image).toBe('notin');
        expect(response.body.longitude).toBe(123123);
        expect(response.body.latitude).toBe(123123);
        expect(response.body.user_id).toBe(2);
        expect(response.body.category_id).toBe(1);
    });
  //Update one event with id
  //Create one event
  //Delete one event with id
    test('DELETE /events/:id', async () => {
        let totalEvents = await Event.count();

        const response = await request(app).delete('/events/1');

        expect(response.statusCode).toBe(200);

        expect(await Event.count()).toBe(totalEvents-1);
    });

});
//Event_category
describe('Event Category Test', () => {
  test('GET all event categorys', async () => {
    const response = await request(app).get('/eventCat');
    expect(response.statusCode).toBe(200);
    expect(response.type).toEqual('application/json');
    expect(response.body.length).toEqual(await Event_category.count());
  });

  test('GET Event Category with id = 1', async () => {
    const response = await request(app).get('/eventCat/1');
    expect(response.statusCode).toBe(200);
    expect(response.type).toEqual('application/json');
  });

  test('DELETE Event category with id = 1', async () => {
    let n = await Event_category.count();
    const response = await request(app).delete('/eventCat/1');
    expect(response.statusCode).toBe(200);
    expect(await Event_category.count()).toBe(n - 1);
  });
});
//Update one event_category with id
//Create one event_category

//Issue_category
describe('Event Category Test', () => {
  test('GET all issue category', async () => {
    const response = await request(app).get('/issueCat');
    expect(response.statusCode).toBe(200);
    expect(response.type).toEqual('application/json');
    expect(response.body.length).toEqual(await Issue_category.count());
  });
  test('GET Issue Category with id = 1', async () => {
    const response = await request(app).get('/issueCat/1');
    expect(response.statusCode).toBe(200);
    expect(response.type).toEqual('application/json');
  });

  test('DELETE Issue category with id = 1', async () => {
    let n = await Issue_category.count();
    const response = await request(app).delete('/issueCat/1');
    expect(response.statusCode).toBe(200);
    expect(await Issue_category.count()).toBe(n - 1);
  });
});
//Update one issue_category with id
//Create one issue_category
