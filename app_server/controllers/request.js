const User = require('../model/user');
const matcher = require('../../lib/matcher');


function receivedRequest(req, res) {
    var userType = "Rider";
    if(req.body.userType !== "Rider") {
        userType = "Driver";
    }

    var ride = {
        userType: userType,
        area: req.body.area,
        points: req.body.points,
        date: req.body.date,
        time: req.body.time,
        userId: req.user._id,
        timeStamp: new Date(),
        gender: req.user.gender,
        genderPreference: req.body.driverPref
    };

    matcher.matchQuery(req, function () {

    });

    // User.findByIdAndUpdate(
    //     req.user._id,
    //     {$push: {rideHistory: ride}},
    //     {safe: true, upsert: true},
    //     function (err, model) {
    //         console.log(err);
    //     }
    // );
    res.redirect('/profile');
}

module.exports = {
    receivedRequest: receivedRequest
};