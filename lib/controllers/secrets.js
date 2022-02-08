const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const Secret = require('../models/Secret');


module.exports = Router().post('/', authenticate, async (req, res, next) => {
  try{
    const newSecret = await Secret.insert({
      title: req.body.title,
      description: req.body.description,
    });
    res.send(newSecret);
  }catch(error){
    next(error);
  }
})
  .get('/', authenticate, async (req, res, next) => {
    try{
      const allSecrets = await Secret.getAllSecrets();

      res.send(allSecrets);
    }catch(error){
      next(error);
    }
  });
