// @flow
import { Feedback,Issue_category, Event_category, Event, Issue, County, Municipal, User, sync } from '../src/models';

const request = require('supertest');
const app = require('../src/app');

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
beforeEach(async () => {});

describe('Test the root path', () => {
  test('It should response the GET method', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
  });
});

//User
describe('User tests', () => {
  //Get all users

  test('GET /secure/users', async () => {
    //console.log(token);
    const response = await request(app)
      .get('/secure/users')
      .set({ 'x-access-token': token });
    //console.log(token);
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
    expect(response.body.hash_str).toBe(
      '30fed7291ca557c9296862fa62267295708deebf0fa553d17efcf0ea1049965b3175b20cf9b18d18e0249f73cd3e25b9c3ec4413cb35353516731257d2735722'
    );
  });
  //Post user
  test('POST /secure/users', async () => {
    let totalUsers = await User.count(); // entries in database
    console.log(totalUsers);
    let user = { firstName: 'A', lastName: 'B', email: 'c@c.no', rank: 1, salt: '123', hash_str: '234' };
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
    expect(response.body.hash_str).toBe(
      '30fed7291ca557c9296862fa62267295708deebf0fa553d17efcf0ea1049965b3175b20cf9b18d18e0249f73cd3e25b9c3ec4413cb35353516731257d2735722'
    );
  });
  //Delete user
  test('DELETE /secure/users/:id', async () => {
    let totalUsers = await User.count();

    const response = await request(app)
      .delete('/secure/users/1')
      .set({ 'x-access-token': token });

    expect(response.statusCode).toBe(200);

    expect(await User.count()).toBe(totalUsers - 1);
  });
});





//Municipal
describe('Municipality tests', () => {
  //Get all Municipalities

  test('GET /secure/municipals', async () => {
    const response = await request(app)
      .get('/secure/municipals')
      .set({ 'x-access-token': token });

    expect(response.statusCode).toBe(200);
    expect(response.type).toEqual('application/json');

    expect(response.body.length).toEqual(await Municipal.count());
  });
  //Get one Municipal with id
  test('GET /secure/municipals/:id', async () => {
    const response = await request(app)
      .get('/secure/municipals/5016')
      .set({ 'x-access-token': token });
    expect(response.statusCode).toBe(200);
    expect(response.type).toEqual('application/json');

    expect(response.body.mun_id).toBe(5016);
    expect(response.body.name).toBe('Agdenes');
    expect(response.body.county_id).toBe(50);
  });
});
//County
describe('County tests', () => {
  //Get All Counties
  test('GET /secure/county', async () => {
    const response = await request(app)
      .get('/secure/county')
      .set({ 'x-access-token': token });

    expect(response.statusCode).toBe(200);
    expect(response.type).toEqual('application/json');

    expect(response.body.length).toEqual(await County.count());
  });

  //Get One County with id

  test('GET /secure/county/:id', async () => {
    const response = await request(app)
      .get('/secure/county/1')
      .set({ 'x-access-token': token });
    expect(response.statusCode).toBe(200);
    expect(response.type).toEqual('application/json');

    expect(response.body.county_id).toBe(1);
    expect(response.body.name).toBe('Østfold');
  });
});

//Issue
describe('Issue tests', () => {
    //Get All Issues
    test('GET /secure/issues', async () => {
        const response = await request(app)
            .get('/secure/issues')
            .set({ 'x-access-token': token });

        expect(response.statusCode).toBe(200);
        expect(response.type).toEqual('application/json');

        expect(response.body.length).toEqual(await Issue.count());
    });
    //Get one Issue with id
    test('GET /secure/issues/:id', async () => {
        const response = await request(app)
            .get('/secure/issues/1')
            .set({ 'x-access-token': token });
        expect(response.statusCode).toBe(200);
        expect(response.type).toEqual('application/json');

        expect(response.body.issue_id).toBe(1);
        expect(response.body.title).toBe('Dumme folk ødeleger lømp');
        expect(response.body.content).toBe('Disse dumme folka som komemr rett fra byen ødeleger lamper kvelden til midtnatt');
        expect(response.body.image).toBe('null');
        expect(response.body.longitude).toBe(123123);
        expect(response.body.latitude).toBe(123123);
        //expect(response.body.mun_id).toBe(2012);
        //expect(response.body.user_id).toBe(1);
        //expect(response.body.category_id).toBe(1);
        //expect(response.body.status_id).toBe(1);
    });
    //Get all feedback for Issue with id
    test('GET /secure/issues/:id/feedback',async  () => {
      const response = await request(app)
          .get('/secure/issues/1/feedback')
          .set({ 'x-access-token': token });

      expect(response.statusCode).toBe(200);
      expect(response.type).toEqual('application/json');

      expect(response.body.length).toEqual(await Feedback.count());
    });
    //Get all issues for a user with id
    test('GET /secure/users/:id/issues',async  () => {
        const response = await request(app)
            .get('/secure/users/1/issues')
            .set({ 'x-access-token': token });

        expect(response.statusCode).toBe(200);
        expect(response.type).toEqual('application/json');

        expect(response.body.length).toEqual(1);
    });
    //Update issue with id
    test('PUT /secure/issues/:id', async () => {
        const updateEventResponse = await request(app)
            .put('/secure/issues/1')
            .send({ title: 'No bear left' })
            .set({ 'x-access-token': token });

        expect(updateEventResponse.statusCode).toBe(200);

        const response = await request(app)
            .get('/secure/issues/1')
            .set({ 'x-access-token': token });

        expect(response.body.title).toBe('No bear left');
    });
    //Create issue
    test('POST /secure/issues', async () => {
        let count = await Issue.count(); // entries in database
        let issue = {
          title: 'Gratis Øl for studenter',
            content: ':O',
            image: null,
            longitude: 63.1,
            latitude: 10.4 };

        const response = await request(app)
            .post('/secure/issues')
            .send(issue)
            .set({ 'x-access-token': token });

        expect(response.statusCode).toBe(200);
        expect(await Issue.count()).toEqual(count + 1);
    });
    //Delete issue
    test('DELETE /secure/issues/:id', async () => {
        let totalIssues = await Issue.count();

        const response = await request(app)
            .delete('/secure/issues/1')
            .set({ 'x-access-token': token });

        expect(response.statusCode).toBe(200);

        expect(await Issue.count()).toBe(totalIssues - 1);
    });
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
    expect(response.body.image).toBe('notin');
    expect(response.body.longitude).toBe(123123);
    expect(response.body.latitude).toBe(123123);
    expect(response.body.user_id).toBe(2);
    expect(response.body.category_id).toBe(1);
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
//Event_category
describe('Event Category Test', () => {
  test('GET all event categories', async () => {
    const response = await request(app)
      .get('/secure/eventCat')
      .set({ 'x-access-token': token });
    expect(response.statusCode).toBe(200);
    expect(response.type).toEqual('application/json');
    expect(response.body.length).toEqual(await Event_category.count());
  });

  test('GET Event Category with id = 1', async () => {
    const response = await request(app)
      .get('/secure/eventCat/1')
      .set({ 'x-access-token': token });
    expect(response.statusCode).toBe(200);
    expect(response.type).toEqual('application/json');
  });
  //Update one event_category with id
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

  //Create one event_category
  test('POST /secure/eventCat', async () => {
    let count = await Event_category.count(); // entries in database
    let event = { name: 'Konsert' };
    const response = await request(app)
      .post('/secure/eventCat')
      .send(event)
      .set({ 'x-access-token': token });
    expect(response.statusCode).toBe(200);
    expect(await Event_category.count()).toEqual(count + 1);
  });

  //Delete Event category
  test('DELETE Event category with id = 1', async () => {
    let n = await Event_category.count();
    const response = await request(app)
      .delete('/secure/eventCat/1')
      .set({ 'x-access-token': token });
    expect(response.statusCode).toBe(200);
    expect(await Event_category.count()).toBe(n - 1);
  });
});

//Issue_category
describe('Issue Category Test', () => {
  //GET all issue categories
  test('GET all issue category', async () => {
    const response = await request(app)
      .get('/secure/issueCat')
      .set({ 'x-access-token': token });
    expect(response.statusCode).toBe(200);
    expect(response.type).toEqual('application/json');
    expect(response.body.length).toEqual(await Issue_category.count());
  });
  //Get one issue category
  test('GET Issue Category with id = 1', async () => {
    const response = await request(app)
      .get('/secure/issueCat/1')
      .set({ 'x-access-token': token });
    expect(response.statusCode).toBe(200);
    expect(response.type).toEqual('application/json');
  });

  //Update one issue_category with id
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

  //Create one issue_category
  test('POST /secure/issueCat', async () => {
    let count = await Issue_category.count(); // entries in database
    let event = { name: 'Konsert' };
    const response = await request(app)
      .post('/secure/issueCat')
      .send(event)
      .set({ 'x-access-token': token });
    expect(response.statusCode).toBe(200);
    expect(await Issue_category.count()).toEqual(count + 1);
  });
  //Delete isse category
  test('DELETE Issue category with id = 1', async () => {
    let n = await Issue_category.count();
    const response = await request(app)
      .delete('/secure/issueCat/1')
      .set({ 'x-access-token': token });
    expect(response.statusCode).toBe(200);
    expect(await Issue_category.count()).toBe(n - 1);
  });
});
