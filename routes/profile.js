var router = require('express').Router();
var User = require('../app_server/model/user');
var ctrl = require('../app_server/controllers/profile');

router.get('/', checkLoggedIn, function (req, res) {
    res.render('profile', {user: req.user});
});

//Should pass the new password in the hashing function before updating the database. (password: req.body.newPassword)
router.post('/', checkLoggedIn, function (req, res) {
    ctrl.updateUserInfo(req, res);
});

router.post('/ride-history', function (req, res) {
    ctrl.getRideHistory(req, res);
});

function checkLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    //Redirect to home if not logged in
    res.redirect('/');
}

module.exports = router;