var LocalStrategy = require('passport-local').Strategy;
var User = require('../app_server/model/user');

module.exports = {
    setupPassport: function (passport) {

        passport.serializeUser(function (user, done) {
            done(null, user.id);
        });


        passport.deserializeUser(function (id, done) {
            User.findById(id, function (err, user) {
                done(err, user);
            });
        });

        passport.use('local-signup', new LocalStrategy({
                usernameField: 'email',
                passwordField: 'password',
                passReqToCallback: true
            },
            function (req, email, password, done) {
                User.findOne({'email': email}, function (err, user) {
                    if (err) {
                        return done(err);
                    }
                    if (user) {
                        return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
                    } else {
                        var newUser = new User();
                        newUser.email = email;
                        newUser.password = newUser.generateHash(password);
                        newUser.firstName = req.body.firstName;
                        newUser.lastName = req.body.lastName;
                        newUser.mobileNum = req.body.mobileNum;
                        newUser.collegeId = req.body.collegeId;
                        newUser.gender = req.body.gender;
                        newUser.save(function (err) {
                            if (err) {
                                throw err;
                            }
                            return done(null, newUser);
                        });
                    }
                });

            }));
        passport.use('local-login', new LocalStrategy({
                // by default, local strategy uses username and password, we will override with email
                usernameField: 'email',
                passwordField: 'password',
                passReqToCallback: true // allows us to pass back the entire request to the callback
            },
            function (req, email, password, done) { // callback with email and password from our form
                // find a user whose email is the same as the forms email
                // we are checking to see if the user trying to login already exists
                User.findOne({'email': email}, function (err, user) {
                    if (err) {
                        return done(err);
                    }
                    if (!user) // User not found
                        return done(null, false, req.flash('loginMessage', 'Wrong email or password.')); // req.flash is the way to set flashdata using connect-flash

                    if (!user.validPassword(password)) // Wrong password
                        return done(null, false, req.flash('loginMessage', 'Wrong email or password.')); // create the loginMessage and save it to session as flashdata
                    return done(null, user);
                });

            }));
    }
};