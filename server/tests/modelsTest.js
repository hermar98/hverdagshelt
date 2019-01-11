// @flow

import {
  User,
  Municipal,
  County,
  Status,
  Issue_category,
  Issue,
  Feedback,
  Event,
  Event_category,
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
          user_id: e.user_id,
          firstName: e.firstName,
          lastName: e.lastName,
          email: e.email,
          rank: e.rank,
          salt: e.salt,
          hash_str: e.hash_str
        }))
    ).toEqual([
      {
        user_id: 1,
        firstName: 'Vegard',
        lastName: 'Andersson',
        email: 'test@test.no',
        rank: 1,
        salt: 'a83f4da094cc247b',
        hash_str:
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
          county_id: e.county_id,
          name: e.name
        }))
    ).toEqual([
      {
        county_id: 1,
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
          mun_id: e.mun_id,
          name: e.name
        }))
    ).toEqual([{ mun_id: 101, name: 'Halden' }]);
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
          status_id: e.status_id,
          name: e.name
        }))
    ).toEqual([
      {
        status_id: 1,
        name: 'Situation Normal, All fucked upp'
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
          issue_id: e.issue_id,
          title: e.title,
          content: e.content,
          image: e.image,
          longitude: e.longitude,
          latitude: e.latitude
        }))
    ).toEqual([
      {
        issue_id: 1,
        title: 'Dumme folk ødeleger lømp',
        content: 'Disse dumme folka som komemr rett fra byen ødeleger lamper kvelden til midtnatt',
        image: 'null',
          latitude: 10.824107,
          longitude: 60.656877
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
          feedback_id: e.feedback_id,
          name: e.name,
          content: e.content
        }))
    ).toEqual([
      {
        feedback_id: 1,
        name: 'Dumme folk er dumme',
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
          event_id: e.event_id,
          title: e.title,
          content: e.content,
          image: e.image,
          longitude: e.longitude,
          latitude: e.latitude
        }))
    ).toEqual([
      {
        event_id: 1,
        title: 'party at the house man!',
        content: 'Det skal være party at the house!',
        image: 'notin',
        longitude: 60.652168,
        latitude: 10.822102
      }
    ]);
  });
});

describe('Issue_category tests', () => {
  it('Issue_category.findAll() and check if first has correct data', async () => {
    let issue_cats = await Issue_category.findAll();
    let issue_cat = issue_cats.slice(0, 1);
    expect(
      issue_cat
        .map(e => e.toJSON())
        .map(e => ({
          category_id: e.category_id,
          name: e.name
        }))
    ).toEqual([
      {
        category_id: 1,
        name: 'Fyllikere på gata som ødeleger lamper'
      }
    ]);
  });
});

describe('Event_category', () => {
  it('Event_category.findAll() and check if first has correct data', async () => {
    let event_cats = await Event_category.findAll();
    let event_cat = event_cats.slice(0, 1);
    expect(
      event_cat
        .map(e => e.toJSON())
        .map(e => ({
          event_id: e.event_id,
          name: e.name
        }))
    ).toEqual([
      {
        event_id: 1,
        name: 'PARTY'
      }
    ]);
  });
});
