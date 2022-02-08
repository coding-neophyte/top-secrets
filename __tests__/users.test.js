const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/UserServices');

describe('backend routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('should create a user', async () => {
    const newUser = {
      email: 'any@mail.com',
      password: 'nah',
    };
    const res = await request(app).post('/api/v1/users').send(newUser);

    console.log(res.body);

    expect(res.body).toEqual({
      id: expect.any(String),
      email: 'any@mail.com',
    });
  });
});
