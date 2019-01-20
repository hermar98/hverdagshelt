// @flow
import {
    User,
    County,
    Municipal,
    Event,
    EventCategory,
    Issue,
    IssueCategory,
    UserIssue,
    UserMunicipal,
    sync
} from '../src/models';

const request = require('supertest');
const app = require('../src/app');

require('../src/routes/county');
require('../src/routes/forgotPassword');
require('../src/routes/issues');
require('../src/routes/eventCategory');
require('../src/routes/county');
require('../src/routes/feedback');
require('../src/routes/image');
require('../src/routes/issueCategory');
require('../src/routes/municipal');
require('../src/routes/userIssue');
require('../src/routes/userMunicipal');
require('../src/routes/users');
require('../src/routes/events');

let email = 'test@test.no';
let pw = '1';
let token = 'noe';

beforeAll(async () => {
    await sync;
    const response = await request(app)
        .post('/login')
        .send({ email: email, password: pw });
    token = response.body.jwt;
    console.log(token);
    // Sync database
    //gå til /login
});

//Public test
describe('Public tests', () => {
    //Post register new user
    test('POST /register', async () => {
        let totalUsers = await User.count(); // entries in database
        let user = { firstName: 'A', lastName: 'B', email: 'test@test.ce', rank: 1, password: '1' };
        const response = await request(app)
            .post('/register')
            .send(user);
        expect(response.statusCode).toBe(200);
        expect(await User.count()).toEqual(totalUsers + 1);
    });
    //POST login as a user
    test('POST /login', async () => {
        let user = { email: 'test@test.ce', password: '1' };
        const response = await request(app)
            .post('/login')
            .send(user);
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

        expect(response.body.issueId).toBe(1);
        expect(response.body.title).toBe('Dumme folk ødeleger lømp');
        /*expect(response.body.content).toBe(
          'Ein artikkel er ein sakprosasjanger som legg vekt på saksinnhaldet medan personlege trekk ved teksten er nedtona. Oppbygginga av ein artikkel er logisk og velor\n' +
            'dna og følgjer ofte ei klassisk tredeling med innleiing, midtdel og konklusjon. Språket er normalprosa med moderat bruk av litterære verkemiddel. Det er stort spenn i meiningsinnhald\n' +
            ' innan undersjangrane av artikkelen, frå den nøytrale og informative leksikonartikkelen til artiklar som inneheld spissformulerte meiningsytringar, t.d. leiarartikkelen eller lesarbr\n' +
            'evet i ei avis. Artikkelsjangrane varierer også mykje i lengde og informasjonsmengde. Her utgjer den minste nyhendeartikkelen i ei avis, notisen, eit ytterpunkt, medan fagartikkelen\n' +
            'er døme på artiklar som kan vera lange og innhaldsrike'
        );*/
        expect(response.body.longitude).toBe(60.656877);
        expect(response.body.latitude).toBe(10.824107);
        //expect(response.body.munId).toBe(2012);
        //expect(response.body.userId).toBe(1);
        //expect(response.body.categoryId).toBe(1);
        //expect(response.body.statusId).toBe(1);
    });
    //Get all feedback for Issue with id
    test('GET /secure/issues/:id/feedback', async () => {
        const response = await request(app)
            .get('/secure/issues/1/feedback')
            .set({ 'x-access-token': token });

        expect(response.statusCode).toBe(200);
        expect(response.type).toEqual('application/json');

        expect(response.body.length).toEqual(1);
    });
    //Get all issues for a user with id
    test('GET /secure/users/:id/issues', async () => {
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
            latitude: 10.4
        };

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
