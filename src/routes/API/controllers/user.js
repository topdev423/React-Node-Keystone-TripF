/* eslint-disable no-underscore-dangle */

const userModel = require('keystone').list('User').model;
const Types = require('keystone').Field.Types;
const jwt = require('../helpers/auth/jwt');
const bcrypt = require('bcrypt-nodejs'); // bcrypt for password encryptation

module.exports.register = (newUser, cb) => {
  // Register a new user
  const username = newUser.username;
  const password = newUser.password;
  const email = newUser.email;
  const name = {
    first: newUser.name.split(' ')[0],
    last: newUser.name.split(' ')[1],
  };

  if (!(username && password && name && email)) {
    return cb({
      message: 'Missing required parameters',
      status: 400
    });
  }

  userModel.findOne({
    $or: [{
      username,
    }, {
      email,
    }],
  }, (err, user) => {
    if (err) {
      return cb({
        message: 'Internal Server Error',
        status: 500,
      });
    }

    if (user) {
      return cb({
        message: 'Username or email already exists',
        status: 409
      });
    }

    return userModel.create({
      username,
      name,
      email,
      password,
    }, (err, user) => {
      if (err) {
        return cb({
          message: 'Internal Server Error',
          status: 500,
        });
      }

      // Creates JWT.

      const payload = {
        id: user._id
      };
      const token = jwt.createJwtToken(payload);

      return cb(null, {
        token,
        message: 'User successfully created',
      });
    });
  });
};

module.exports.login = (userLogin, cb) => {
  // Authentication
  const username = userLogin.username;
  const password = userLogin.password;

  if (!(username && password)) {
    return cb({
      message: 'Missing required parameters',
      status: 400
    });
  }

  return userModel.findOne({
    $or: [{
      username,
    }, {
      email: username,
    }],
  }, (err, user) => {
    if (err || !user) {
      return cb({
        message: 'Username doesn\'t exist',
        status: 404
      });
    }

    if (bcrypt.compareSync(password, user.password)) {
      // Creates and send JWT if password matches
      const payload = {
        id: user._id
      };
      const token = jwt.createJwtToken(payload);

      return cb(null, {
        token,
        message: 'Sucessful login',
      });
    }

    return cb({
      message: 'Incorrect password',
      status: 401
    });
  });
};

module.exports.refreshToken = (oldToken, cb) => {
  jwt.jwt.verify(oldToken, jwt.tokenSecret, (err, decoded) => {
    if (err) {
      return cb({
        message: 'Malformed token',
        status: 400,
        success: false
      });
    }

    const newToken = jwt.createJwtToken(decoded);

    return cb(null, {
      message: 'Token refresh was succesful',
      status: 201,
      success: true,
      token: newToken
    });
  });
};
