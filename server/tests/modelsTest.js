// @flow

import {
  User,
  Municipal,
  County,
  Status,
  IssueCategory,
  Issue,
  Feedback,
  Event,
  EventCategory,
  sync
} from '../src/models.js';

beforeAll(async () => {
  await sync;
});

describe('User tests', () => {
  it('User.findAll() and check if first has correct data', async () => {
    let users = await User.findAll();
    let user = users.slice(0, 1);
    expect(
      user
        .map(e => e.toJSON())
        .map(e => ({
          userId: e.userId,
          firstName: e.firstName,
          lastName: e.lastName,
          email: e.email,
          rank: e.rank,
          salt: e.salt,
          hashStr: e.hashStr
        }))
    ).toEqual([
      {
        userId: 1,
        firstName: 'Privat',
        lastName: 'Person',
        email: 'privat@hh.no',
        rank: 1,
        salt: 'a83f4da094cc247b',
        hashStr:
          '30fed7291ca557c9296862fa62267295708deebf0fa553d17efcf0ea1049965b3175b20cf9b18d18e0249f73cd3e25b9c3ec4413cb35353516731257d2735722'
      }
    ]);
  });
});

describe('County tests', () => {
  it('County.findAll() and check if first has correct data', async () => {
    let countys = await County.findAll();
    let county = countys.slice(0, 1);
    expect(
      county
        .map(e => e.toJSON())
        .map(e => ({
          countyId: e.countyId,
          name: e.name
        }))
    ).toEqual([
      {
        countyId: 1,
        name: 'Østfold'
      }
    ]);
  });
});

describe('Municipal tests', () => {
  it('Municipal.findAll() and check if first has correct data', async () => {
    let municipals = await Municipal.findAll();
    let municipal = municipals.slice(0, 1);
    expect(
      municipal
        .map(e => e.toJSON())
        .map(e => ({
          munId: e.munId,
          name: e.name
        }))
    ).toEqual([{ munId: 101, name: 'Halden' }]);
  });
});

describe('Status tests', () => {
  it('Status.findAll() and check if first has correct data', async () => {
    let status = await Status.findAll();
    let stat = status.slice(0, 1);
    expect(
      stat
        .map(e => e.toJSON())
        .map(e => ({
          statusId: e.statusId,
          name: e.name
        }))
    ).toEqual([
      {
        statusId: 1,
        name: 'Ikke påbegynt'
      }
    ]);
  });
});

describe('Issue tests', () => {
  it('Issue.findAll() and check if first has correct data', async () => {
    let issues = await Issue.findAll();
    let issue = issues.slice(0, 1);
    expect(
      issue
        .map(e => e.toJSON())
        .map(e => ({
          issueId: e.issueId,
          title: e.title,
          longitude: e.longitude,
          latitude: e.latitude
        }))
    ).toEqual([
      {
        issueId: 1,
        title: ' - ',
        latitude: 63.424035,
        longitude: 10.426896
      }
    ]);
  });
});

describe('Feedback tests', () => {
  it('Feedback.findAll() and check if first has correct data', async () => {
    let feedbacks = await Feedback.findAll();
    let feedback = feedbacks.slice(0, 1);
    expect(
      feedback
        .map(e => e.toJSON())
        .map(e => ({
          feedbackId: e.feedbackId,
          name: e.name,
          content: e.content
        }))
    ).toEqual([
      {
        feedbackId: 1,
        name: 'Test',
        content: 'Vi skal fikse dette!'
      }
    ]);
  });
});

describe('Event tests', () => {
  it('Event.findAll() and check if first has correct data', async () => {
    let events = await Event.findAll();
    let event = events.slice(0, 1);
    expect(
      event
        .map(e => e.toJSON())
        .map(e => ({
          eventId: e.eventId,
          title: e.title,
          content: e.content,
          longitude: e.longitude,
          latitude: e.latitude
        }))
    ).toEqual([
      {
        eventId: 1,
        title: 'Konsert med Bjarne Brøndbo',
        content: 'Bjarne Brøndbo kommer snart til Østre Toten! Billetter til salgs nå',
        longitude: 10.815972,
        latitude:  60.677127
      }
    ]);
  });
});

describe('IssueCategory tests', () => {
  it('IssueCategory.findAll() and check if first has correct data', async () => {
    let issueCats = await IssueCategory.findAll();
    let issueCat = issueCats.slice(0, 1);
    expect(
      issueCat
        .map(e => e.toJSON())
        .map(e => ({
          categoryId: e.categoryId,
          name: e.name
        }))
    ).toEqual([
      {
        categoryId: 1,
        name: 'Vei og gate'
      }
    ]);
  });
});

describe('EventCategory', () => {
  it('EventCategory.findAll() and check if first has correct data', async () => {
    let eventCats = await EventCategory.findAll();
    let eventCat = eventCats.slice(0, 1);
    expect(
      eventCat
        .map(e => e.toJSON())
        .map(e => ({
          categoryId: e.categoryId,
          name: e.name
        }))
    ).toEqual([
      {
        categoryId: 1,
        name: 'Konsert'
      }
    ]);
  });
});
