var login = require('./login');
var logout = require('./logout');
var signup = require('./sign_up');
var dashboard = require('./dashboard');
var request = require('./request');
var profile = require('./profile');

module.exports = function (app, passport) {
    app.use('/login', login);
    app.use('/logout', logout);
    app.use('/signup', signup);
    app.use('/dashboard', dashboard);
    app.use('/request', request);
    app.use('/profile', profile);
    app.get('/', function(req, res) {

        res.render('index'); // load the index.ejs file
    });
    // catch 404 and forward to error handler

    app.use(function(req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    //error handler
    app.use(function(err, req, res, next) {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};
        res.status(err.status || 500);
        res.render('error');
    });
};