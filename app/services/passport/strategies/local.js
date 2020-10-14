const bCrypt = require('bcrypt-nodejs');
const { User } = require('../../../models');
const LocalStrategy = require('passport-local').Strategy;

const isValidPassword = function (userpass, password) {
  return bCrypt.compareSync(password, userpass);
};

const local = new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
  },
  function (email, password, done) {
    User.findOne({
      where: {
        email: email,
      },
    }).then(function (user) {
      if (!user) {
        return done(null, false, {
          message: 'User does not exist',
        });
      }

      if (!isValidPassword(user.password, password)) {
        return done(null, false, {
          message: 'Incorrect password.',
        });
      }
      console.log('passport', user.toPublicJSON())

      return done(null, user.toPublicJSON());
    }).catch(function (err) {
      return done(null, false, {
        message: 'Something went wrong with your Signin',
      });
    });
  },
);

module.exports = local;