var express = require('express');
var router = express.Router();
var User = require('../models/users');
var csrf = require('csurf');
var csrfProtection = csrf();
router.use(csrfProtection);
/* GET signin */
router.get('/user/signin', function(req, res, next) {
  var user_id = req.query['userid'];
  var user_name =  req.query['username'];
  if (user_id == null || user_id == " ")
  {
      res.render('users/signin',{notid: 'Please input User ID!'});
  }
  if (user_name == null || user_name == " ")
  {
      res.render('users/signin',{notname: 'Please input User Name!'});
  }
  else
  {
    User.find({userid: user_id, password: user_name},function(err, doc){
      if (err)
      {
        res.render('users/signin',{notCorrect: 'User ID and User Name NOT CORRECT.'});
      }
      else
      res.render('partials/header',{users: doc});
      res.render('shop/index');
   });
  };
});

router.get('/user/signin', function(req,res,next){
  res.render('user/signin',{csrfToken: req.csrfToken()});
});
module.exports = router;
