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

require('../../src/routes/issues');

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



