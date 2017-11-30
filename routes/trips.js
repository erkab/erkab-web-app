var router = require('express').Router();
var mongoose = require('mongoose');
mongoose.connect('MONGODB_URI');
var User = require('../app_server/model/user');

router.get('/', checkLoggedIn, function(req, res) {
    console.log("This is the trips.js GET handler");

    User.findById(req.user._id, function (err, person) {
        if (err) return console.log(err);
        console.log(person);
        res.render('trips', {user: req.user, person: person});
    });
});

function checkLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    //Redirect to home if not logged in
    res.redirect('/');
}

module.exports = router;