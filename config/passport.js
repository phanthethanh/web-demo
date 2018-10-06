var passport = require('passport');
var User = require('../models/users');
var LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function(user, done){
    done(null, user.id);
});

passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        done(err, user);
    });
});

passport.use('local.signup', new LocalStrategy({
    usernameField: 'userid',
    passwordField: 'password',
    passReqToCallback: true
    }, function(req, userid, password, done){
            req.checkBody('userid', 'Invaid User ID').notEmpty();
            req.checkBody('password', 'Password must contain at least 6 characters').notEmpty().isLength({min:6});
            
            var errors = req.validationErrors();
            if (errors){
                var message = [];
                errors.forEach(function(error) {
                    message.push(error.msg);
                });
                return done(null, false, req.flash('error', message));
            }
            User.findOne({'userid': userid}, function(err, user){
                if(err){
                    return done(err);
                }
                if(user){
                    return done(null, false, {message: 'User ID is already in use.'});
                }
                var newUser = new User();
                newUser.userid = userid;
                newUser.password = newUser.encryptPassword(password);
                newUser.save(function(err, result){
                    if(err){
                        return done(err);
                    }
                    return done(null, newUser);
                });

            });
        }
));

passport.use('local.signin', new LocalStrategy({
    usernameField: 'userid',
    passwordField: 'password',
    passReqToCallback: true
    }, function(req, userid, password, done){
        req.checkBody('userid', 'Invaid User ID').notEmpty();
        req.checkBody('password', 'Invaid password').notEmpty();
        var errors = req.validationErrors();
        if (errors){
            var message = [];
            errors.forEach(function(error) {
                message.push(error.msg);
            });
            return done(null, false, req.flash('error', message));
        }
        User.findOne({'userid': userid}, function(err, user){
            if(err){
                return done(err);
            }
            if(!user){
                return done(null, false, {message: 'Not found user.'});
            }
            if(!user.validPassword(password)){
                return done(null, false, {message: 'Wrong password.'});
            }
           return done(null, user);
        });
    }
));