const pendingRide = require('../app_server/model/rideRequest');
const notifier = require('./notifier');
const User = require('../app_server/model/user');
const Ride = require('../app_server/model/ride');


function getMeetingPoint(pointsA, pointsB) {
    if(typeof pointsA === 'string') {
        return pointsA;
    }
    if(typeof pointsB === 'string') {
        return pointsB;
    }
    pointsA.sort();
    pointsB.sort();
    for(var i = 0, j = 0; i < pointsA.length; i++) {
           while(j < pointsB.length && pointsB[j] < pointsA[i]) {
               j++;
           }
           if(j < pointsB.length && pointsB[j] === pointsA[i]) {
               return pointsA[i];
           }
    }
    throw "Impossible";
}

function matchQuery (ride, callback) {
    var query = {
        userId: {$ne: ride.userId},
        userType: ride.userType === 'Driver' ? 'Rider' : 'Driver',
        area: ride.area,
        points: typeof ride.points === 'string' ? {$in: [ride.points]} : {$in: ride.points},
        date: ride.date,
        time: ride.time,
        genderPreference: {$in: [ride.gender, "No Pref."]},
        gender: ride.genderPreference === "No Pref." ?  {$in: [ "Male", "Female"]} : ride.genderPreference
    };
    pendingRide.findOne(query).exec(function (err, partnerRide) {
            if(!partnerRide) { //Didn't find a match, we'll add this request for now so that it can be matched later
                pendingRide.addRide(ride);
                callback(false);
            } else {
                var meetingPoint = getMeetingPoint(ride.points, partnerRide.points);
                notifier.notifyMatchByEmail(ride, partnerRide, meetingPoint);
                Ride.addRide(ride, partnerRide, meetingPoint, User.addRideReference);
                partnerRide.remove();
                callback(true);
            }
        });
}

module.exports = {
    matchQuery: matchQuery
};