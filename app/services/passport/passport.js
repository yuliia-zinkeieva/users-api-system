//passport strategy
const localStrategy = require('./strategies/local');
const passport = require('passport');
const { User } = require('../../models');

// this function is called when we encrypt user data to cookie (we use only Id)
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

// here we find user by cookie-encrypted data (id)
passport.deserializeUser(function (id, done) {
  User.findByPk(id).then(function (user) {
    if (user) {
      done(null, user.toPublicJSON());
    } else {
      done(user.errors, null);
    }
  });
});

passport.use('local', localStrategy);

module.exports = passport;
