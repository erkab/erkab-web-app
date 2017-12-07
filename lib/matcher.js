const pendingRide = require('../app_server/model/ride');
const notifier = require('./notifier');
const User = require('../app_server/model/user');

function matchQuery (ride, cb) {
    var query = {
        userType: ride.UserType === 'Driver' ? 'Rider' : 'Driver',
        area: ride.area,
        points: {$in: [ride.points]},
        date: ride.date,
        time: ride.time,
        gender: {$in: [ride.gender, "No Pref."]},
        genderPref: ride.genderPreference === "No Pref." ?  {$in: [ "Male", "Female"] } : ride.driverPref
    };

    pendingRide.findOne(query).sort('timeStamp').exec(function (err, partnerRide) {
            if(!partnerRide) {
                pendingRide.addRide(ride);
            } else {
                notifier.notifyMatchByEmail(ride._id);
                notifier.notifyMatchByEmail(partnerRide._id);
                User.addMatch(ride, partnerRide);
                partnerRide.remove();
            }
        });
}


module.exports = {
    matchQuery: matchQuery
};

