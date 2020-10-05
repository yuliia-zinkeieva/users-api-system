//passport strategy
const bCrypt = require('bcrypt-nodejs');
const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const models = require('../../models');

const User = models.user;

//serialize
passport.serializeUser(function (user, done) {
    //console.log('passport serialize')
    done(null, user.id);
});

// deserialize user
passport.deserializeUser(function (id, done) {
    console.log(id)
    User.findByPk(id).then(function (user) {
        if (user) {
            done(null, user.get());
        } else {
            done(user.errors, null);
        }
    });
});

passport.use('local-signup', new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true // allows us to pass back the entire request to the callback
    },
    function (req, email, password, done) {
        const generateHash = function (password) {
            return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
        };

        User.findOne({
            where: {
                email: email
            }
        }).then(function (user) {
            if (user) {
                return done(null, false, {
                    message: 'That email is already taken'
                });
            } else {
                const userPassword = generateHash(password);
                const data =
                    {
                        email: email,
                        password: userPassword,
                        firstname: req.body.firstname,
                        lastname: req.body.lastname,
                        age: req.body.age,
                        sex: req.body.sex
                    };

                User.create(data).then(function (newUser, created) {
                    if (!newUser) {
                        //console.log('not new');
                        return done(null, false);
                    }

                    if (newUser) {
                        return done(null, newUser);
                    }
                });
            }
        });
    }
));

passport.use('local-signin', new LocalStrategy(
    {
        // by default, local strategy uses username and password, we will override with email
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true // allows us to pass back the entire request to the callback
    },
    function (req, email, password, done) {
        console.log('hereeee');
        const isValidPassword = function (userpass, password) {
            return bCrypt.compareSync(password, userpass);
        }
        User.findOne({
            where: {
                email: email
            }
        }).then(function (user) {
            if (!user) {
                //console.log('here error')
                return done(null, false, {
                    message: 'Email does not exist'
                });
            }

            if (!isValidPassword(user.password, password)) {
                return done(null, false, {
                    message: 'Incorrect password.'
                });
            }

            const userinfo = user.get();
            return done(null, userinfo);

        }).catch(function (err) {
            console.log("Error:", err);
            return done(null, false, {
                message: 'Something went wrong with your Signin'
            });
        });
    }
));

module.exports = passport;
