
module.exports = async (req, res, next) => {

  try{
    if(req.user.email){
      next();
    }else{
      throw Error;
    }
  }catch(error){
    error.message = 'Not authorized to view content';
    error.status = 403;
    next(error);
  }

};
