const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');

const customersRouter = require('./routes/customer');
const authRouter = require('./routes/auth.js');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cookieParser());
app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true })); // session secret

app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); //
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use('/auth', authRouter);
app.use('/customer', customersRouter);


app.listen(4000, function (err) {
  console.log('App is running on 4000 port');
  if (err)
    console.log(err);
});

module.exports = app;