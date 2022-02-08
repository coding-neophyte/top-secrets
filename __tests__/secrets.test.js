const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Secret = require('../lib/models/Secret');
const UserServices = require('../lib/services/UserServices');

const agent = request.agent(app);

describe('testing secret routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  afterAll(() => {
    pool.end();
  });

  it('should post a new secret', async () => {
    const mockUser = {
      email: 'any@mail.com',
      password: 'allgood'
    };

    await UserServices.createUser(mockUser);

    await agent.post('/api/v1/users/sessions').send(mockUser);

    const res = await agent.post('/api/v1/secrets').send({
      title: 'aliens',
      description: 'aliens do exist',
    });
    expect(res.body).toEqual({
      id: expect.any(String),
      title: 'aliens',
      description: 'aliens do exist',
      created_at: expect.any(String),
    });
  });
});
