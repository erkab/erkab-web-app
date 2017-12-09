var User = require('../model/user');
var Ride = require('../model/ride');

function updateUserInfo(req, res) {
    User.findByIdAndUpdate(req.user._id, {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        mobileNum: req.body.mobileNum,
        email: req.body.email
    }, function (err, result) {
        if (err)
            return console.log(err);
        res.redirect('/profile');
    });
}

function getRideHistory(req, res) {
    var rideHistory = [];
    req.user.rides.forEach(function (rideId) {
        Ride.findOne ({_id: rideId}, function (err, ride) {
           rideHistory.push ({
               userType: req.user._id === ride.riderId ? "Rider" : "Driver",
               meetingPoint: ride.area + ", " + ride.meetingPoint,
               date: ride.date,
               time: ride.time
           });
           if(rideHistory.length === req.user.rides.length) {
               res.json(JSON.stringify(rideHistory));
           }
        });
    });
    res.json(JSON.stringify(rideHistory));
}

module.exports = {
    updateUserInfo : updateUserInfo,
    getRideHistory: getRideHistory
};