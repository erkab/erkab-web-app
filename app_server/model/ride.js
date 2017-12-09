const mongoose = require('mongoose');//.set('debug', true);
const Schema = mongoose.Schema;

const rideSchema = new Schema({
    area: String,
    meetingPoint: String,
    date: String,
    time: String,
    riderId: Schema.ObjectId,
    driverId: Schema.ObjectId
});

rideSchema.statics.addRide = function(riderRequest, driverRequest, meetingPoint, callback) {
    if(riderRequest.userType === 'Driver') {
        var temp = riderRequest;
        riderRequest = driverRequest;
        driverRequest = temp;
    }
    var ride = new Ride({
        area : riderRequest.area,
        meetingPoint: meetingPoint,
        date: riderRequest.date,
        time: riderRequest.time,
        riderId: riderRequest.userId,
        driverId: driverRequest.userId
    });
    ride.save(function (err, ride) {
        callback(riderRequest.userId, ride._id);
        callback(driverRequest.userId, ride._id);
    });
};

var Ride = mongoose.model('Ride', rideSchema);
module.exports =  mongoose.model('Ride', rideSchema);