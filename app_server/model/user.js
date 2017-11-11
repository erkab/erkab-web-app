const mongoose = require('mongoose');//.set('debug', true);
const bcrypt   = require('bcrypt-nodejs');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email:String,
    password: String,
    firstName: String,
    lastName: String,
    collegeID: String,
    mobileNum: String,
    gender: String,
    rideHistory: [Schema.Types.ObjectId]
});

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);