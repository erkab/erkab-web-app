var router = require('express').Router();
var mongoose = require('mongoose');
var ctrl = require('../app_server/controllers/request');
mongoose.connect('MONGODB_URI');



router.get('/', checkLoggedIn, function (req, res) {
    res.render('request', {
        user: req.user // get the user out of session and pass to template
    });
});

router.post('/', checkLoggedIn, function (req, res) {
    ctrl.receivedRequest(req, res);
});

function checkLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    //Redirect to home if not logged in
    res.redirect('/');
}

module.exports = router;