var router = require('express').Router();
var passport = require('passport');

router.get('/', function(req, res) {
    /* Logic to handle attempt of logging in of already logged in users to be added */
    /* Flash could have been populated if password was wrong in a previous attempt */
    res.render('login', { message: req.flash('loginMessage') });
});

// process the login form
router.post('/', passport.authenticate('local-login', {
    successRedirect : '/dashboard', // redirect to the secure profile section
    failureRedirect : '/login', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}));

module.exports = router;