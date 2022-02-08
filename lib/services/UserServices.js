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
};
