const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = class UserServices {
  static async createUser({ email, password }){
    const hashedPassword = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS));

    const newUser = await User.insert({
      email,
      passwordHash: hashedPassword,
    });

    return newUser;
  }

  static async signin({ email, password = '' }){
    try{
      const existingUser = await User.getByEmail(email);

      if(!existingUser) throw new Error;
      if(!bcrypt.compareSync(password, existingUser.passwordHash))
        throw new Error('Password Incorrect');

      const webToken = jwt.sign({ ...existingUser }, process.env.JWT_SECRET);

      return webToken;

    }catch(error){
      error.status = 401;
      throw error;
    }
  }
};
