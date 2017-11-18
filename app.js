require('dotenv').config();
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');

var passport = require('passport');
var flash    = require('connect-flash');


var logger = require('morgan');

var session      = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var configDB = require('./config/db');
var app = express();

// view engine setup
app.set('views', __dirname + '/app_server/views');
app.set('view engine', 'ejs'); // set up ejs for templating
app.use(express.static(path.join(__dirname, '/resources')));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/resources", express.static(__dirname + '/resources'));

// required for passport
require('./config/passport').setupPassport(passport);
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

require('./routes')(app, passport);

module.exports = app;