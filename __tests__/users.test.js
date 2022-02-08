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

    expect(res.body).toEqual({
      id: expect.any(String),
      email: 'any@mail.com',
    });
  });
  it('should log in a existing user', async () => {
    const mockUser = {
      email: 'any@mail.com',
      password: 'allgood'
    };

    const newUser = await UserService.createUser(mockUser);

    // const existingUser = await UserService.signin(mockUser);

    const res = await request(app).post('/api/v1/users/sessions').send(mockUser);

    expect(res.body).toEqual({ message: 'Sign in successful' });
  });

  it('should logout a user', async () => {
    const mockUser = {
      email: 'any@email.com',
      password: 'allgood',
    };
    const res =  await request(app).delete('/api/v1/users/sessions').send(mockUser);

    expect(res.body).toEqual({
      message: 'logout successful',
    });
  });
});
