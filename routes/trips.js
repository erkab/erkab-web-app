var router = require('express').Router();

router.get('/', checkLoggedIn, function(req, res) {
    console.log("This is the trips.js GET handler");
    res.render('trips', {
        user: req.user
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