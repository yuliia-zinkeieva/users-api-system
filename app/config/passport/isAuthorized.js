const passport = require('passport');

function isAuthorized(req, res, next) {
    if(req.isAuthenticated()){
        //req.isAuthenticated() will return true if user is logged in
        next();
    } else{
        res.send(401);
    }
}

const authenticate = passport.authenticate('local-signin');
module.exports = {
    isAuthorized,
    authenticate
};