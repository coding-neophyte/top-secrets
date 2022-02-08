const jwt = require('jsonwebtoken');


module.exports = async (req, res, next) => {
  try{
    console.log(req.cookies);
    const cookie = req.cookies[process.env.COOKIE_NAME];
    console.log(cookie);
    const payload = jwt.verify(cookie, process.env.JWT_SECRET);
    req.user = payload;

    next();
  }catch(error){
    error.message = 'Sign in required to continue';
    error.status = 401;
    next(error);
  }
};
