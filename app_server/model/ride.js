const mongoose = require('mongoose');//.set('debug', true);
const Schema = mongoose.Schema;

const rideRequestSchema = new Schema({
    userType: String,
    area: String,
    points: [String],
    date: String,
    time: String,
    userId: Schema.ObjectId,
    gender: String,
    genderPreference: String,
    timeStamp: Date
});


var  pendingRide =  mongoose.model('pendingRide', rideRequestSchema);

rideRequestSchema.methods.addRide = function(ride) {
    new pendingRide(ride).save();
};


module.exports = pendingRide;




