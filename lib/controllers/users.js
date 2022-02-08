const { Router } = require('express');
const UserServices = require('../services/UserServices');


module.exports = Router().post('/', async (req, res, next) => {
  try{
    const newUser = await UserServices.createUser(req.body);

    res.send(newUser);
  }catch(error){
    next(error);
  }
});
