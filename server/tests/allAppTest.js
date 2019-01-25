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

let email = 'admin@hh.no';
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
    test('GET /users', async () => {
        //console.log(token);
        const response = await request(app)
            .get('/users')
            .set({ 'x-access-token': token });
        console.log(response.body);
        expect(response.statusCode).toBe(200);
        expect(response.type).toEqual('application/json');
        let userCount = 4;
        console.log(userCount);
        expect(response.body.length).toEqual(userCount);
    });

    //Get one user  with id
    test('GET /users/:id', async () => {
        const response = await request(app)
            .get('/users/1')
            .set({ 'x-access-token': token });
        expect(response.statusCode).toBe(200);
        expect(response.type).toEqual('application/json');

        expect(response.body.firstName).toBe('Privat');
        expect(response.body.lastName).toBe('Person');
        expect(response.body.email).toBe('privat@hh.no');
        expect(response.body.rank).toBe(1);
        expect(response.body.salt).toBe('a83f4da094cc247b');
        expect(response.body.hashStr).toBe(
            '30fed7291ca557c9296862fa62267295708deebf0fa553d17efcf0ea1049965b3175b20cf9b18d18e0249f73cd3e25b9c3ec4413cb35353516731257d2735722'
        );
    });
    //Post user
    test('POST /users', async () => {
        let totalUsers = await User.count(); // entries in database
        console.log(totalUsers);
        let user = { firstName: 'A', lastName: 'B', email: 'c@c.no', rank: 3, password:'1', munId:null, salt: '123', hashStr: '234' };
        const response = await request(app)
            .post('/users')
            .send(user)
            .set({ 'x-access-token': token });
        expect(response.statusCode).toBe(200);
        expect(await User.count()).toEqual(totalUsers + 1);
    });
    //Put user

    test('PUT /users/:id', async () => {
        const updateUserResponse = await request(app)
            .put('/users/1')
            .send({ firstName: 'Jørgen' })
            .set({ 'x-access-token': token });

        expect(updateUserResponse.statusCode).toBe(200);

        const response = await request(app)
            .get('/users/1')
            .set({ 'x-access-token': token });
        console.log(response.body);

        expect(response.body.firstName).toBe('Jørgen');
        expect(response.body.lastName).toBe('Person');
        expect(response.body.email).toBe('privat@hh.no');
        expect(response.body.rank).toBe(1);
        expect(response.body.salt).toBe('a83f4da094cc247b');
        expect(response.body.hashStr).toBe(
            '30fed7291ca557c9296862fa62267295708deebf0fa553d17efcf0ea1049965b3175b20cf9b18d18e0249f73cd3e25b9c3ec4413cb35353516731257d2735722'
        );

    });

    test('PUT /users/:id', async () => {
        const updateUserResponse = await request(app)
            .put('/users/1')
            .send({ firstName: 'Jørgen', password: '1', email: 'j@j.j' })
            .set({ 'x-access-token': token });

        expect(updateUserResponse.statusCode).toBe(200);

        const response = await request(app)
            .get('/users/1')
            .set({ 'x-access-token': token });

        expect(response.body.firstName).toBe('Jørgen');
        expect(response.body.email).toBe('j@j.j');
        expect(response.body.rank).toBe(1);
    });

    //Delete user
    test('DELETE /users/:id', async () => {
        let totalUsers = await User.count();

        const response = await request(app)
            .delete('/users/2')
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
    test('GET /events', async () => {
        const response = await request(app)
            .get('/events')
            .set({ 'x-access-token': token });

        expect(response.statusCode).toBe(200);
        expect(response.type).toEqual('application/json');

        expect(response.body.length).toEqual(await Event.count());
    });
    //Get one event  with id
    test('GET /events/:id', async () => {
        const response = await request(app)
            .get('/events/1')
            .set({ 'x-access-token': token });
        expect(response.statusCode).toBe(200);
        expect(response.type).toEqual('application/json');

        expect(response.body.title).toBe('Konsert med Bjarne Brøndbo');
        expect(response.body.content).toBe('Bjarne Brøndbo kommer snart til Østre Toten! Billetter til salgs nå');
        expect(response.body.longitude).toBe(10.815972);
        expect(response.body.latitude).toBe(60.677127);
        expect(response.body.userId).toBe(3);
        expect(response.body.categoryId).toBe(1);
    });
    //Update one event with id
    test('PUT /events/:id', async () => {
        const updateEventResponse = await request(app)
            .put('/events/1')
            .send({ title: 'No bear left' })
            .set({ 'x-access-token': token });

        expect(updateEventResponse.statusCode).toBe(200);

        const response = await request(app)
            .get('/events/1')
            .set({ 'x-access-token': token });

        expect(response.body.title).toBe('No bear left');
    });
    //Create one event
    test('POST /events', async () => {
        let count = await Event.count(); // entries in database
        let event = { title: 'Gratis Øl for studenter', content: ':O', image: null, longitude: 63.1, latitude: 10.4 };
        const response = await request(app)
            .post('/events')
            .send(event)
            .set({ 'x-access-token': token });
        expect(response.statusCode).toBe(200);
        expect(await Event.count()).toEqual(count + 1);
    });
    //Delete one event with id
    test('DELETE /events/:id', async () => {
        let totalEvents = await Event.count();

        const response = await request(app)
            .delete('/events/1')
            .set({ 'x-access-token': token });

        expect(response.statusCode).toBe(200);

        expect(await Event.count()).toBe(totalEvents - 1);
    });
});


//EventCategory
describe('Event Category Test', () => {
    test('GET all event categories', async () => {
        const response = await request(app)
            .get('/eventCat')
            .set({ 'x-access-token': token });
        expect(response.statusCode).toBe(200);
        expect(response.type).toEqual('application/json');
        expect(response.body.length).toEqual(await EventCategory.count());
    });

    test('GET Event Category with id = 1', async () => {
        const response = await request(app)
            .get('/eventCat/1')
            .set({ 'x-access-token': token });
        expect(response.statusCode).toBe(200);
        expect(response.type).toEqual('application/json');
    });
    //Update one eventCategory with id
    test('PUT /eventCat/:id', async () => {
        const updateEventResponse = await request(app)
            .put('/eventCat/1')
            .send({ name: 'Poker' })
            .set({ 'x-access-token': token });

        expect(updateEventResponse.statusCode).toBe(200);

        const response = await request(app)
            .get('/eventCat/1')
            .set({ 'x-access-token': token });

        expect(response.body.name).toBe('Poker');
    });

    //Create one eventCategory
    test('POST /eventCat', async () => {
        let count = await EventCategory.count(); // entries in database
        let event = { name: 'Konsert' };
        const response = await request(app)
            .post('/eventCat')
            .send(event)
            .set({ 'x-access-token': token });
        expect(response.statusCode).toBe(200);
        expect(await EventCategory.count()).toEqual(count + 1);
    });

    //Delete Event category
    test('DELETE Event category with id = 1', async () => {
        let n = await EventCategory.count();
        const response = await request(app)
            .delete('/eventCat/1')
            .set({ 'x-access-token': token });
        expect(response.statusCode).toBe(200);
        expect(await EventCategory.count()).toBe(n - 1);
    });
});

//Issue
describe('Issue tests', () => {
    //Get All Issues
    test('GET /issues', async () => {
        const response = await request(app)
            .get('/issues')
            .set({ 'x-access-token': token });

        expect(response.statusCode).toBe(200);
        expect(response.type).toEqual('application/json');

        expect(response.body.length).toEqual(await Issue.count());
    });
    //Get one Issue with id
    test('GET /issues/:id', async () => {
        const response = await request(app)
            .get('/issues/1')
            .set({ 'x-access-token': token });
        expect(response.statusCode).toBe(200);
        expect(response.type).toEqual('application/json');

        expect(response.body.issueId).toBe(1);
        expect(response.body.title).toBe(' - ');
        /*expect(response.body.content).toBe(
          'Ein artikkel er ein sakprosasjanger som legg vekt på saksinnhaldet medan personlege trekk ved teksten er nedtona. Oppbygginga av ein artikkel er logisk og velor\n' +
            'dna og følgjer ofte ei klassisk tredeling med innleiing, midtdel og konklusjon. Språket er normalprosa med moderat bruk av litterære verkemiddel. Det er stort spenn i meiningsinnhald\n' +
            ' innan undersjangrane av artikkelen, frå den nøytrale og informative leksikonartikkelen til artiklar som inneheld spissformulerte meiningsytringar, t.d. leiarartikkelen eller lesarbr\n' +
            'evet i ei avis. Artikkelsjangrane varierer også mykje i lengde og informasjonsmengde. Her utgjer den minste nyhendeartikkelen i ei avis, notisen, eit ytterpunkt, medan fagartikkelen\n' +
            'er døme på artiklar som kan vera lange og innhaldsrike'
        );*/
        expect(response.body.longitude).toBe(10.426896);
        expect(response.body.latitude).toBe(63.424035);
        //expect(response.body.munId).toBe(2012);
        //expect(response.body.userId).toBe(1);
        //expect(response.body.categoryId).toBe(1);
        //expect(response.body.statusId).toBe(1);
    });
    //Get all feedback for Issue with id
    test('GET /issues/:id/feedback', async () => {
        const response = await request(app)
            .get('/issues/1/feedback')
            .set({ 'x-access-token': token });

        expect(response.statusCode).toBe(200);
        expect(response.type).toEqual('application/json');

        expect(response.body.length).toEqual(1);
    });
    //Get all issues for a user with id
    test('GET /users/:id/issues', async () => {
        const response = await request(app)
            .get('/users/1/issues')
            .set({ 'x-access-token': token });

        expect(response.statusCode).toBe(200);
        expect(response.type).toEqual('application/json');

        expect(response.body.length).toEqual(11);
    });
    //Update issue with id
    test('PUT /issues/:id', async () => {
        const updateEventResponse = await request(app)
            .put('/issues/1')
            .send({ title: 'No bear left' })
            .set({ 'x-access-token': token });

        expect(updateEventResponse.statusCode).toBe(200);

        const response = await request(app)
            .get('/issues/1')
            .set({ 'x-access-token': token });

        expect(response.body.title).toBe('No bear left');
    });
    //Create issue
    test('POST /issues', async () => {
        let count = await Issue.count(); // entries in database
        let issue = {
            title: 'Gratis Øl for studenter',
            content: ':O',
            image: null,
            longitude: 63.1,
            latitude: 10.4
        };

        const response = await request(app)
            .post('/issues')
            .send(issue)
            .set({ 'x-access-token': token });

        expect(response.statusCode).toBe(200);
        expect(await Issue.count()).toEqual(count + 1);
    });
    //Delete issue
    test('DELETE /issues/:id', async () => {
        let totalIssues = await Issue.count();

        const response = await request(app)
            .delete('/issues/1')
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
            .get('/issueCat')
            .set({ 'x-access-token': token });
        expect(response.statusCode).toBe(200);
        expect(response.type).toEqual('application/json');
        expect(response.body.length).toEqual(await IssueCategory.count());
    });
    //Get one issue category
    test('GET Issue Category with id = 1', async () => {
        const response = await request(app)
            .get('/issueCat/1')
            .set({ 'x-access-token': token });
        expect(response.statusCode).toBe(200);
        expect(response.type).toEqual('application/json');
    });

    //Update one issueCategory with id
    test('PUT /issueCat/:id', async () => {
        const updateEventResponse = await request(app)
            .put('/issueCat/1')
            .send({ name: 'Poker' })
            .set({ 'x-access-token': token });

        expect(updateEventResponse.statusCode).toBe(200);

        const response = await request(app)
            .get('/issueCat/1')
            .set({ 'x-access-token': token });

        expect(response.body.name).toBe('Poker');
    });

    //Create one issueCategory
    test('POST /issueCat', async () => {
        let count = await IssueCategory.count(); // entries in database
        let event = { name: 'Konsert' };
        const response = await request(app)
            .post('/issueCat')
            .send(event)
            .set({ 'x-access-token': token });
        expect(response.statusCode).toBe(200);
        expect(await IssueCategory.count()).toEqual(count + 1);
    });
    //Delete issue category
    test('DELETE Issue category with id = 1', async () => {
        let n = await IssueCategory.count();
        const response = await request(app)
            .delete('/issueCat/1')
            .set({ 'x-access-token': token });
        expect(response.statusCode).toBe(200);
        expect(await IssueCategory.count()).toBe(n - 1);
    });
});

//userIssues tests
describe('userIssues tests',() => {
    //GET /users/:id/issues
    test('GET /users/:id/issues', async ()=>{
        const r1 = await request(app).post('/users/4/issues/2 ').set({ 'x-access-token': token });
        const r2 = await request(app).post('/users/4/issues/3').set({ 'x-access-token': token });
        expect(r1.statusCode).toBe(200);
        expect(r2.statusCode).toBe(200);

        const response = await request(app).get('/users/4/issues').set({ 'x-access-token': token });
        expect(response.statusCode).toBe(200);
        expect(response.type).toEqual('application/json');
        console.log(response.body);


        //TODO: Fix so it checks result
    });

    //POST /users/:userId/issues/:issueId
    test('POST /users/:userId/issues/:issueId', async () => {
        let count = await UserIssue.count(); // entries in database
        const response = await request(app)
            .post('/users/4/issues/9')
            .set({ 'x-access-token': token });
        expect(response.statusCode).toBe(200);
        expect(await UserIssue.count()).toEqual(count + 1);
    });
    //DELETE /users/:userId/issue/:issueId
    test('DELETE /users/:userId/issues/:issueId', async () => {
        let count = await UserIssue.count();
        const response = await request(app)
            .delete('/users/4/issues/2')
            .set({ 'x-access-token': token });
        expect(response.statusCode).toBe(200);
        expect(await UserIssue.count()).toBe(count - 1);
    });
});

//userMunicipals tests
describe('userMunicipals tests',() => {
    //GET /userMun/:id
    test('GET /users/:id/mun', async ()=>{
        const r1 = await request(app).post('/users/1/mun/101').set({ 'x-access-token': token });
        const r2 = await request(app).post('/users/1/mun/216').set({ 'x-access-token': token });
        expect(r1.statusCode).toBe(200);
        expect(r2.statusCode).toBe(200);
        // console.log('POST FINISHED')
        const response = await request(app).get('/users/1/mun').set({ 'x-access-token': token });
        expect(response.statusCode).toBe(200);
        expect(response.type).toEqual('application/json');
        console.log((response.body));


        //TODO: Fix so it checks result
    });

    //POST /user/:userId/mun/:munId
    test('POST /users/:userId/mun/:munId', async () => {
        let count = await UserMunicipal.count(); // entries in database

        const response = await request(app)
            .post('/users/1/mun/935')
            .set({ 'x-access-token': token });
        expect(response.statusCode).toBe(200);
        expect(await UserMunicipal.count()).toEqual(count + 1);
    });
    //DELETE /users/:userId/mun/:munId
    test('DELETE /users/:userId/mun/:munId', async () => {
        let count = await UserMunicipal.count();
        const response = await request(app)
            .delete('/users/1/mun/935')
            .set({ 'x-access-token': token });
        expect(response.statusCode).toBe(200);
        expect(await UserMunicipal.count()).toBe(count - 1);
    });
});
