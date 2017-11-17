var router = require('express').Router();
var fs = require('fs');

router.get('/', checkLoggedIn, function(req, res) {
    console.log(req);
    res.render('profile.ejs', {
        user: req.user // get the user out of session and pass to template
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