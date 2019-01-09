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

describe('user test', () => {
  it('correct data', async () => {
    let user = await User.findAll();
    user.slice(0, 1);
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
        email: 'vegaande@ntnu.stud.no',
        rank: 1,
        salt: 'b79ryp97',
        hash_str: '897dfjsodif5vx24c5vsldfskdclz97cyw7e3o2inJKHaospk902'
      }
    ]);
  });
});

describe('county test', () => {
  it('correct data', async () => {
    let county = await County.findAll();
    county.slice(0, 1);
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
        name: 'Trøndelag'
      }
    ]);
  });
});

describe('municipal test', () => {
  it('correct data', async () => {
    let municipal = await Municipal.findAll();
    municipal.slice(0, 1);
    expect(
      municipal
        .map(e => e.toJSON())
        .map(e => ({
          mun_id: e.mun_id,
          name: e.name
        }))
    ).toEqual([
      {
        mun_id: 1,
        name: 'Trondheim'
      }
    ]);
  });
});

describe('municipal test', () => {
  it('correct data', async () => {
    let municipal = await Municipal.findAll();
    municipal.slice(0, 1);
    expect(
      municipal
        .map(e => e.toJSON())
        .map(e => ({
          mun_id: e.mun_id,
          name: e.name
        }))
    ).toEqual([
      {
        mun_id: 1,
        name: 'Trondheim'
      }
    ]);
  });
});

describe('status test', () => {
  it('correct data', async () => {
    let status = await Status.findAll();
    status.slice(0, 1);
    expect(
      status
        .map(e => e.toJSON())
        .map(e => ({
          status_id: e.status_id,
          name: e.name
        }))
    ).toEqual([
      {
        status_id: 1,
        name: 'Completed'
      }
    ]);
  });
});

describe('issue test', () => {
  it('correct data', async () => {
    let issue = await Issue.findAll();
    issue.slice(0, 1);
    expect(
      issue
        .map(e => e.toJSON())
        .map(e => ({
          issue_id: e.issue_id,
          title: e.title,
          content: e.content,
          image: e.image,
          longitude: e.longitude,
          latitude: e.latitude,
          date: e.date
        }))
    ).toEqual([
      {
        issue_id: 1,
        title: '',
        content: '',
        image: '',
        longitude: 0,
        latitude: 0,
        date: 'dd.mm.yyyyy'
      }
    ]);
  });
});

describe('feedback test', () => {
  it('correct data', async () => {
    let feedback = await Feedback.findAll();
    feedback.slice(0, 1);
    expect(
      feedback
        .map(e => e.toJSON())
        .map(e => ({
          feedback_id: e.feedback_id,
          name: e.name,
          content: e.content,
          date: e.date
        }))
    ).toEqual([
      {
        feedback_id: 1,
        name: '',
        content: '',
        date: 'ddmmyyyy'
      }
    ]);
  });
});

describe('event test', () => {
  it('correct data', async () => {
    let event = await Event.findAll();
    event.slice(0, 1);
    expect(
      event
        .map(e => e.toJSON())
        .map(e => ({
          event_id: e.event_id,
          title: e.title,
          content: e.content,
          image: e.image,
          longitude: e.longitude,
          latitude: e.latitude,
          date: e.data
        }))
    ).toEqual([
      {
        event_id: 1,
        title: '',
        content: '',
        image: '',
        longitude: '',
        latitude: '',
        date: 'ddmmyyyy'
      }
    ]);
  });
});

describe('issue_cat test', () => {
  it('correct data', async () => {
    let issue_cat = await Issue_category.findAll();
    issue_cat.slice(0, 1);
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
        name: 'Road'
      }
    ]);
  });
});

describe('event_cat test', () => {
  it('correct data', async () => {
    let event_cat = await Event_category.findAll();
    event_cat.slice(0, 1);
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
        name: 'Road'
      }
    ]);
  });
});
