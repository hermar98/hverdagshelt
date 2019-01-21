import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { eventService } from '../src/services/EventService';
import { Issue, User, Event } from '../src/models';
import {userService} from "../src/services/UserService";
import {issueService} from "../src/services/IssueService";
import service from "../src/services/Service";

let mock = new MockAdapter(service);
let user = {
  userId: 1,
  firstName: 'Jimmy',
  lastName: 'Hendrix',
  email: 'HermBike@hotmail.com',
  rank: 1,
  munId: 2,
  password: 'passord123'
};
let userArray = [];
userArray.push(user);

let issue = new Issue({
  issueId: 1,
  title: 'Ødelagt gatelys',
  content: 'Martinsensgate 8B har ødelagt lyktestolpe',
  image: 'imagefile.png',
  longitude: 12345,
  latitude: 56789,
  status: 2,
  categoryId: 1,
  munId: 528
});
let issueArray = [];
issueArray.push(issue);

let event = {
  eventId: 1,
  title: 'Konsert på rådhuset - REVIVAL',
  content: 'XXXTentacion holder eksklusiv konsert for sine fans',
  image: 'stringTabellArgs.img',
  longitude: 246810,
  latitude: 12141,
  timeStart: '01.02.2014',
  timeEnd: '01.03.2014',
  categoryId: 1
};
let eventArray = [];
eventArray.push(event);

beforeAll(() => {
  mock
    .onGet('/secure/users/' + user.userId)
    .reply(200, user)
    .onGet('/secure/users')
    .reply(200, userArray)
    .onPut('/secure/users/' + user.userId)
    .reply(200)
    .onPost('/register')
    .reply(200, 1)
    .onGet('/secure/issues')
    .reply(200, issueArray)
    .onGet('/secure/issues/' + issue.issueId)
    .reply(200, issue)
    .onPut('secure/issues/' + issue.issueId)
    .reply(200)
    .onPost('/secure/issues')
    .reply(200, 1)
    .onDelete('/secure/issues/' + issue.issueId)
    .reply(200)
    .onGet('/secure/events')
    .reply(200, eventArray);
});

describe('UserTests', () => {
  it('Hello', () => {
    console.log('Hi');
  });

  it('getUser returns User', done => {
    userService.getUser(1).then(response => {
      expect(response).toEqual(user);
      done();
    });
  });

  it('getUsers returns Array of User', done => {
    userService.getUsers().then(response => {
      expect(response[0]).toEqual(userArray[0]);
      done();
    });
  });

  it('updateUser returns void and status code 200', done => {
    userService.updateUser(user).then(response => {
      expect(response).toEqual();
      done();
    });
  });

  it('addUser returns number (1)', done => {
    userService.addUser(user).then(response => {
      expect(response).toEqual(1);
      done();
    });
  });
});

describe('Issue tests', () => {
  it('getIssues returns Array of issues', done => {
    issueService.getIssues().then(response => {
      expect(response[0]).toEqual(issueArray[0]);
      done();
    });
  });

  it('getIssue returns Issue', done => {
    issueService.getIssue(issue.issueId).then(response => {
      expect(response).toEqual(issue);
      done();
    });
  });

  it('updateIssue returns void and status code 200', done => {
    issueService.updateIssue(issue).then(response => {
      expect(response).toEqual();
      done();
    });
  });

  it('addIssue return number (1)', done => {
    issueService.addIssue(issue).then(response => {
      expect(response).toEqual(1);
      done();
    });
  });

  it('addIssue returns void and status code 200', done => {
    issueService.deleteIssue(issue.issueId).then(response => {
      expect(response).toEqual();
      done();
    });
  });
});

describe('Event tests', () => {
  it('getEvents returns Array of events', done => {
    eventService.getEvents().then(response => {
      expect(response[0]).toEqual(eventArray[0]);
      done();
    });
  });
});
