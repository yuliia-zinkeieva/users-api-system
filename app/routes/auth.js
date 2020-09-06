const authController = require('../controllers/authcontroller.js');

module.exports = function (app, passport) {

    app.get('/signup', authController.signup);
    app.get('/signin', authController.signin);
    app.get('/page', isLoggedIn, authController.personalPage);//:id
    app.get('/page/change', authController.change);//:id
    app.get('/users', authController.users);//redirects to sign in

    app.get('/logout', authController.logout);


    app.post('/signup', passport.authenticate('local-signup', {
            successRedirect: '/page',//?

            failureRedirect: '/signup'
        }
        )
    );

    app.post('/signin', passport.authenticate('local-signin', {
            successRedirect: '/page',//???

            failureRedirect: '/signin'
        }
    ));

    function isLoggedIn(req, res, next) {

        if (req.isAuthenticated())

            return next();

        res.redirect('/signin');
    }


}