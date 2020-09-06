const theExports = module.exports = {}

theExports.signup = function (req, res) {

    res.render('app/views/signup');

}

theExports.signin = function (req, res) {

    res.render('app/views/signin');

}

theExports.personalPage = function (req, res) {
    res.render('app/views/personalPage', {
        id: req.user.id,
        name: req.user.firstname,
        lastName: req.user.lastname,
        age: req.user.age
    });

}

theExports.users = function (req, res) {

    res.render('app/views/usersList');

}

theExports.change = function (req, res) {

    res.render('app/views/changes');

}

theExports.logout = function (req, res) {


    req.session.destroy(function (err) {

        res.redirect('/');

    });

}