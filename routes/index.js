var express = require('express');
var router = express.Router();
var Cart = require('../models/cart');

var Product = require('../models/products');

//Home page
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

router.get('/add-to-cart/:id', function(req,res, mext){
  var Product_Id = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});

  Product.findById(Product_Id, function(err, product){
    if(err){
      return res.redirect('/');
    }
    cart.add(product, product.id);
    req.session.cart = cart;
    console.log(req.session.cart);
    res.redirect('/');
  });
});

router.get('/shopping-cart/', function(req, res, next){
  if(!req.session.cart){
    return res.render('shop/shopping-cart',{products: null});
  }
  var cart = new Cart(req.session.cart);
  res.render('shop/shopping-cart', {products: cart.generateArray(), total_Qty: cart.total_Qty, total_Price: cart.total_Price});
});

router.get('/checkout', function(req, res, next){
  if(!req.session.cart){
    return res.redirect('shop/shopping-cart');
  }
  var cart = new Cart(req.session.cart);
  res.render('shop/checkout', {total: cart.total_Price});
});

module.exports = router;