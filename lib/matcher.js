const pendingRide = require('../app_server/model/ride');
const notifier = require('./notifier');
const User = require('../app_server/model/user');

function matchQuery (ride, callback) {

    var query = {
        userType: ride.UserType === 'Driver' ? 'Rider' : 'Driver',
        area: ride.area,
        points: {$in: [ride.points]},
        date: ride.date,
        time: ride.time,
        genderPref: {$in: [ride.gender, "No Pref."]},
        gender: ride.genderPreference === "No Pref." ?  {$in: [ "Male", "Female"]} : ride.driverPref
    };

    console.log(query);

    pendingRide.findOne(query).sort('timeStamp').exec(function (err, partnerRide) {
        //console.log("PendingRide findOne");
            if(!partnerRide) {
                pendingRide.addRide(ride);
                callback(false);
            } else {
                notifier.notifyMatchByEmail(ride._id);
                notifier.notifyMatchByEmail(partnerRide._id);
                User.addMatch(ride, partnerRide);
                partnerRide.remove();
                callback(true);
            }

        });
}

module.exports = {
    matchQuery: matchQuery
};

