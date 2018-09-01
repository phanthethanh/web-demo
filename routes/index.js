var express = require('express');
var router = express.Router();
var Product = require('../models/products');
var csrf = require('csurf');
var csrfProtection = csrf();
router.use(csrfProtection);

router.get('/', function(req,res,next){
  var key = req.query['search'];
  if (key == null || key == " ")
  {
    Product.find(function(err, docs){
      if (err) throw err;
      res.render('shop/index',{title: 'Welcome to Shoes Shop', products: docs});
    });
  }
  else
  {
    Product.find({p_name:{$regex:key}},function(err, docs){
      if (err) throw err;
        res.render('shop/index',{title: 'Result for search', products: docs});
   });
  };
});

router.get('/user/signin', function(req,res,next){
  res.render('user/signin',{csrfToken: req.csrfToken()});
});

router.get('/shop/help', function(req,res,next){
  res.render('shop/help',{csrfToken: req.csrfToken()});
});
router.get('/user/signup', function(req,res,next){
  res.render('user/signup',{csrfToken: req.csrfToken()});
});
router.get('/user/createuser', function(req,res,next){
  res.render('user/createuser',{csrfToken: req.csrfToken()});
});
router.post('/shop/index', function(req,res,next){
  res.render('shop/index',{csrfToken: req.csrfToken()});
});
module.exports = router;