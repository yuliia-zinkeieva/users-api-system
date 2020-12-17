const passport = require('../app/services/passport/passport');
const express = require('express');
const {User} = require('../app/models');
const router = express.Router();
const {isAuthorized} = require('../app/services/passport/isAuthorized');
const userSchema = require('../app/services/joi/userSchema');
const validate = require('../app/services/joi/validate-middleware');
const PassportError = require('../app/services/errors/PassportError');
// const session = require('express-session');


router.post('/sign-up', validate(userSchema, 'body'), (req, res, next) => {
    const {email, password} = req.body;
    User.create({email, password}).then((user) => {
        req.login(user, function (err) {
            if (err) {
                return next(err);
            }
            req.session.key = req.body.email;
            console.log('redis', req.body.email);

            res.sendStatus(200);
        });
    })
        .catch(e => {
            res.status(422).send({status: 422, message: e.errors[0].message});
        });
});

// header "set-cookie" with sessionId would be sent in response
router.post('/sign-in', function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        if (err) {
            return next(err)
        }
        if (!user) {
            next(new PassportError('Login fault', info.message));
        }
        req.logIn(user, function (err) {
            if (err) {
                return next(err);
            }
            req.session.key = req.body.email;
            console.log('redis', req.body.email);
            res.sendStatus(200);
        });
    })(req, res, next);
});

// cookie will be cleaned-up
router.get('/sign-out', (req, res) => {
        // req.logout();
        // res.end();
        if (req.session.key) {
            req.session.destroy(function () {
                // res.redirect('/');
                res.end();
            });
        } else {

        }
    }
);

// check cookies and verify sessionId
router.get('/me', isAuthorized, (req, res) => {
    res.sendStatus(200);
});

module.exports = router;
