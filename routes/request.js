var router = require('express').Router();
var mongoose = require('mongoose');
mongoose.connect('MONGODB_URI');
var User = require('../app_server/model/user');

router.get('/', checkLoggedIn, function (req, res) {
    res.render('request', {
        user: req.user // get the user out of session and pass to template
    });
});

router.post('/', checkLoggedIn, function (req, res) {
    var userType = "Rider";
    if(req.body.userType != "Rider")
        userType = "Driver";
    var ride = {
        userType: userType,
        area: req.body.area,
        points: req.body.points,
        date: req.body.date,
        time: req.body.time,
        driverPref: req.body.driverPref
    };
    User.findByIdAndUpdate(
        req.user._id,
        {$push: {rideHistory: ride}},
        {safe: true, upsert: true},
        function (err, model) {
            console.log(err);
        }
    );
    res.redirect('/profile');
});

function checkLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    //Redirect to home if not logged in
    res.redirect('/');
}

module.exports = router;