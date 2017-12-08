const pendingRide = require('../app_server/model/ride');
const notifier = require('./notifier');
const User = require('../app_server/model/user');

function matchQuery (ride, callback) {

    console.log(ride);

    var query = {
        userType: ride.userType === 'Driver' ? 'Rider' : 'Driver',
        area: ride.area,
        points: typeof ride.points === "string" ? {$in: [ride.points]} : {$in: ride.points},
        date: ride.date,
        time: ride.time,
        genderPreference: {$in: [ride.gender, "No Pref."]},
        gender: ride.genderPreference === "No Pref." ?  {$in: [ "Male", "Female"]} : ride.genderPreference
    };

    pendingRide.findOne(query).exec(function (err, partnerRide) {
            if(!partnerRide) {
                // console.log("Match not found");
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