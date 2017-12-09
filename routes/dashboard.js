var router = require('express').Router();
const pendingRide = require('../app_server/model/rideRequest');


router.get('/', checkLoggedIn, function (req, res) {
    pendingRide.find({}, function (err, pendingRides) {
        if (err)
            return console.log(err);
        res.render('dashboard', {user: req.user, pendingRides: pendingRides});
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