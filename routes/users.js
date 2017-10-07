var express = require('express');
var router = express.Router();

/* GET users listing. */

router.use('/', function (req, res) {
  res.send('use called\n');
  next();
});
router.get('/*', function(req, res, next) {
  res.send('respond with a resource');
  next();
});

router.get('/*', function(req, res, next) {
    res.write('Res');
   // next();
});

router.get("/", function(httpRequest, httpResponse, next){
    httpResponse.write(" World !!!");
    httpResponse.end();
});

router.get("/", function(httpRequest, httpResponse, next){
    httpResponse.write("Hello");
    next(); //remove this and see what happens
});


module.exports = router;



