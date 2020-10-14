const passport = require('../app/services/passport/passport');
const express = require('express');
const { User } = require('../app/models');
const router = express.Router();
const { isAuthorized } = require('../app/services/passport/isAuthorized');

// todo: validation (joi schema)
// just create user and sing-in
router.post('/sign-up', (req, res, next) => {
  const { email, password } = req.body; // joi validator
  User.create({ email, password }).then((user) => {
    req.login(user, function (err) {
      if (err) {
        return next(err);
      }
      res.send({});
    });
  });
});

// header "set-cookie" with sessionId would be sent in response
router.post('/sign-in', passport.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// cookie will be cleaned-up
router.get('/sign-out', (req, res) => {
  req.logout();
  res.end();
});

// check cookies and verify sessionId
router.get('/me', isAuthorized, (req, res) => {
  console.log('check auth');
  res.sendStatus(200);
});

module.exports = router;
