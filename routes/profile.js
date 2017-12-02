var router = require('express').Router();
var mongoose = require('mongoose');
mongoose.connect('MONGODB_URI');
var User = require('../app_server/model/user');

router.get('/', checkLoggedIn, function (req, res) {
    User.findById(req.user._id, function (err, person) {
        if (err) return console.log(err);
        res.render('profile', {user: req.user, person: person});
    });
});

//Should pass the new password in the hashing function before updating the database. (password: req.body.newPassword)
router.post('/', checkLoggedIn, function (req, res) {
    User.findByIdAndUpdate(req.user._id, {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        mobileNum: req.body.mobileNum
    }, function (err, result) {
        if (err)
            return console.log(err);
        res.redirect('/profile');
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