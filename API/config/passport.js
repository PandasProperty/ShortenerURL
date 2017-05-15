var LocalStrategy       = require('passport-local').Strategy,
    User                = require('./../models/User'),
    config              = require('./environment/index');

module.exports = function (passport) {

    User.findOne({'local.username': config.admin.username}, function (error, user) {
        if (error) {
            console.error('MongoDB error checking for admin user: ' + error);
            return;
        }
        if (!user) {
            var user = new User();
            user.local.username = config.admin.username;
            user.local.password = user.generateHash(config.admin.password);
            user.save(function(err) {
                if (err) {
                    console.error('MongoDB error creating admin user: ' + err);
                }
            });
        }
    });

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            if(err) {
                console.error('There was an error accessing the records of' +
                    ' user with id: ' + id);
                return console.log(err.message);
            }
            return done(null, user);
        })
    });

    passport.use('local-strategy', new LocalStrategy({
        username: 'username',
        password: 'password'
    }, function(username, password, done) {
        User.findOne({ 'local.username' :  username }, function(err, user) {
            if (err)
                return done(err);
            if (!user) {
                return done({
                  error: true,
                  message: 'No user found.'
                });
            }
            if (!user.validPassword(password)) {
                return done({
                  error: true,
                  message: 'Wrong password.'
                });
            }
            return done(null, user);
        });
    }));

};