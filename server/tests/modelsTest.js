// @flow

import { User, Municipal, County, Status, Issue_category, sync } from '../src/models.js';

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
