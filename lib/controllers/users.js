const { Router } = require('express');
const UserServices = require('../services/UserServices');

const ONEDAYINMS = 1000 * 60 * 60 * 24;

module.exports = Router().post('/', async (req, res, next) => {
  try{
    const newUser = await UserServices.createUser(req.body);

    res.send(newUser);
  }catch(error){
    next(error);
  }
})
  .post('/sessions', async (req, res, next) => {
    try{
      const existingUser = await UserServices.signin({
        email: req.body.email,
        password: req.body.password,
      });
      res.cookie(process.env.COOKIE_NAME, existingUser, {
        maxAge: ONEDAYINMS,
      })
        .json({ message: 'Sign in successful' });
    }catch(error){
      next(error);
    }
  })
  .delete('/sessions', (req, res) => {
    res.clearCookie(process.env.COOKIE_NAME)
      .json({ message: 'logout successful' });
  });
