var router = require('express').Router();

router.get('/', function(req, res) {
    req.logOut();
    res.redirect('/');
});

module.exports = router;