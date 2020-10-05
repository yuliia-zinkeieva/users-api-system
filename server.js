const path = require('path');
const express = require('express'); //was var instead of const
const cookieParser = require('cookie-parser');
const app = express();
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');
const env = require('dotenv').config();
const models = require('./app/models');
const custRouter = require('./app/routes/customer')

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({secret: 'keyboard cat', resave: true, saveUninitialized: true})); // session secret
app.use(passport.initialize());
app.use(passport.session());
//load passport strategies

app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", 'http://localhost:3000'); //
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
});

authRoute = require('./app/routes/auth.js')(app);
app.use('/customer', custRouter);




//Sync Database
models.sequelize.sync().then(function () {
    //console.log('Nice! Database looks fine')
}).catch(function (err) {
    console.log(err, "Something went wrong with the Database Update!")
});



app.listen(4000, function (err) {

    if (err)
        //console.log("Site is live");
        console.log(err)

});

module.exports = app