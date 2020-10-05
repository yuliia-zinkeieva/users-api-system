const passport = require('../config/passport/passport');

module.exports = function (app) {
    app.get('/logout', (req, res) => {
        req.logout();
        res.send(200);
})

    app.post('/user', passport.authenticate('local-signup'), (req, res) => { //todo: signup
            console.log('server');
            res.sendStatus(200)
        }
    );

    app.post('/signin', passport.authenticate('local-signin'), (req, res) => {
            console.log('server 1', req.user);
            res.sendStatus(200);
        }
    );

}