// @flow

import { User, sync } from '../src/models.js';

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
          rank: e.rank
        }))
    ).toEqual([
      {
        user_id: 1,
        firstName: 'Rolf',
        lastName: 'Roarson',
        email: 'email@adress.com',
        rank: 1
      }
    ]);
  });
});
