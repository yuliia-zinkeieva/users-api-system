const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');

const customersRouter = require('./routes/customer');
const authRouter = require('./routes/auth.js');

const ValidationError = require('./app/services/errors/ValidationError');
const PassportError = require('./app/services/errors/PassportError');


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(cookieParser());
app.use(session({secret: 'keyboard cat', resave: true, saveUninitialized: true})); // session secret

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRouter);
app.use('/customer', customersRouter);

app.listen(4000, function (err) {
    console.log('App is running on 4000 port');
    if (err)
        console.log(err);
});

app.use((err, req, res, next) => {
    console.log('app err');
    //handleError(err, req, res); ???????
    if (err instanceof ValidationError) {
        res.status(422).send({status: err.status, message: err.errorMessage});
    } else if (err instanceof PassportError) {
        console.log('here')
        res.status(422).send({status: err.status, message: err.errorMessage});
    }
    else
        console.log(err)
});

module.exports = app;