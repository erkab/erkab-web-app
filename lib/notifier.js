var nodemailer = require('nodemailer');
const User = require('../app_server/model/user');

// Twilio Credentials
const accountSid = 'ACaa53eda78df24a7d5049d418006f4472';
const authToken = '29fb33e2b2b76d8ec98c11a4614856a4';

// require the Twilio module and create a REST client
const client = require('twilio')(accountSid, authToken);


function sendRiderSMS(rideReq, rider, driver, meetingPoint) {
    var notificationMessage = 'Hey ' + rider.firstName + ', you will meet ' + driver.firstName + ' at ' + meetingPoint + ', ' + rideReq.area + ' on ' + rideReq.date + ', ' + rideReq.time + '. Please be on time! - Erkab';
    client.messages
        .create({
            to: '+2' + rider.mobileNum,
            from: '+16024564295',
            body: notificationMessage,
        })
        .then((message) => console.log(message.sid));
}

function sendDriverSMS(rideReq, driver, rider, meetingPoint) {
    var notificationMessage = 'Hey ' + driver.firstName + ', you will meet ' + rider.firstName + ' at ' + meetingPoint + ', ' + rideReq.area + ' on ' + rideReq.date + ', ' + rideReq.time + '. Please be on time! - Erkab';
    client.messages
        .create({
            to: '+2' + driver.mobileNum,
            from: '+16024564295',
            body: notificationMessage,
        })
        .then((message) => console.log(message.sid));
}

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'erkab.aast.org@gmail.com',
        pass: 'erkab_org'
    }
});

function sendRiderEmail(rideReq, rider, driver, meetingPoint) {
    var content = 'Hey ' + rider.firstName + ', you will meet ' + driver.firstName + ' ' + driver.lastName + ' at ' + meetingPoint + ', '
        + rideReq.area + ' on ' +
        rideReq.date + ', ' + rideReq.time + (driver.gender === 'Male' ? '. His' : '. Her') + ' mobile number is ' +
        driver.mobileNum + '. Please be on time! - Erkab';
    var mailOptions = {
        from: 'erkab.aast.org@gmail.com',
        to: rider.email,
        subject: 'Good news, you\'ve been matched!',
        text: content
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

function  sendDriverEmail(rideReq, driver, rider, meetingPoint) {
    var content = 'Hey ' + driver.firstName + ', you will meet ' + rider.firstName + ' ' + rider.lastName + ' at ' + meetingPoint + ', '
        + rideReq.area + ' on ' +
        rideReq.date + ', ' + rideReq.time + (rider.gender === 'Male' ? '. His' : '. Her') + ' mobile number is ' +
        rider.mobileNum + '. Please be on time! - Erkab';

    var mailOptions = {
        from: 'erkab.aast.org@gmail.com',
        to: driver.email,
        subject: 'Congratulations, you\'ve been matched!',
        text: content
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

function notifyMatchByEmail(riderReq, driverReq, meetingPoint) {

    User.findOne({_id: riderReq.userId}, function (err, rider) {
        if(err) {
            return;
        }
        User.findOne({_id: driverReq.userId}, function (err, driver) {
            if(err) {
                return;
            }
            sendRiderEmail(riderReq, rider, driver, meetingPoint);
            sendDriverEmail(riderReq, driver, rider, meetingPoint);

            sendRiderSMS(riderReq, rider, driver, meetingPoint);
            sendDriverSMS(riderReq, driver, rider, meetingPoint);
        });
    });
}

module.exports = {
    notifyMatchByEmail: notifyMatchByEmail
};