var express = require('express');
var router = express.Router();
var User = require('../models/users');
var mongoosedb = require('mongoose');
var assert = require('assert');
var passport = require('passport');
var flash = require('connect-flash');
var csrf = require('csurf');
// Connection URL
var url_mongodb = 'mongodb://localhost:27017/shop';
var csrfProtection = csrf();
router.use(csrfProtection);

//Profile
router.get('/profile', isLoggedIn, function(req, res, next){
   res.render('user/profile');
});
//Loggout
router.get('/logout', isLoggedIn, function(req, res, next){
    req.logout();
    res.redirect('/');
  });
router.use('/', notLoggedIn, function(req, res, next){
    next();
});
//Sign In
router.get('/signin', function(req, res){
    var msgErr = req.flash('error');
    res.render('user/signin',{csrfToken: req.csrfToken(), msgErr: msgErr, hasError: msgErr.length > 0});
  });
router.post('/signin', passport.authenticate('local.signin', {
    successRedirect: '/user/profile',
    failureRedirect: '/user/signin',
    failureFlash: true
}));

//Sign up
router.get('/signup', function(req, res){
    var msgErr = req.flash('error');
    res.render('user/signup',{csrfToken: req.csrfToken(), msgErr: msgErr, hasError: msgErr.length > 0});
});
router.post('/signup', passport.authenticate('local.signup', {
      successRedirect: '/user/profile',
      failureRedirect: '/user/signup',
      failureFlash: true
}));

module.exports = router;

function isLoggedIn(req, res, next){
    if (req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
}

function notLoggedIn(req, res, next){
  if (!req.isAuthenticated()){
      return next();
  }
  res.redirect('/');
}
