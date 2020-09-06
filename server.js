const path = require('path');

const express = require('express'); //was var instead of const
const app = express();
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');
const env = require('dotenv').config();
const exphbs = require('express-handlebars')

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.use(session({secret: 'keyboard cat', resave: true, saveUninitialized: true})); // session secret
app.use(passport.initialize());
app.use(passport.session());


//Models
const models = require("./app/models");

//Routes
authRoute = require('./app/routes/auth.js')(app, passport);

//load passport strategies
require('./app/config/passport/passport.js')(passport, models.user);

//Sync Database
models.sequelize.sync().then(function () {

    console.log('Nice! Database looks fine')

}).catch(function (err) {

    console.log(err, "Something went wrong with the Database Update!")

});

//For Handlebars
app.engine('.hbs', exphbs({
    defaultLayout: 'layout',
    extname: '.hbs',
    layoutsDir: path.join(__dirname),
    partialsDir: path.join(__dirname)
}))

app.set('view engine', '.hbs')
app.set('views', path.join(__dirname))


app.get('/', function (req, res) {

    res.render('app/views/home');

});


app.listen(4000, function (err) {

    if (!err)
        console.log("Site is live");
    else console.log(err)

});

module.exports = app