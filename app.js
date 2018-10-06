var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expresshbs  = require('express-handlebars');
var mongooesdb = require('mongoose');
var mongo = require('mongodb');
var session = require('express-session');
var bodyParse = require('body-parser');
var passport = require('passport');
var validator = require('express-validator');
var flash = require('connect-flash');
var LocalStrategy = require('passport-local').Strategy;
// Connection string URL
var url_mongodb = 'mongodb://localhost:27017/shop';
require('./config/passport');

//Routes
//var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');
var routes = require('./routes/index');

//Init app
var app = express();

//connect setup
mongooesdb.connect(url_mongodb);
var db = mongooesdb.Connection;

// view engine setup
app.engine('.hbs',expresshbs({defaultLayout:'layout', extname:'.hbs'}));
app.set('view engine', '.hbs');

app.use(logger('dev'));
//BodyParser Middleware
app.use(bodyParse.json());
app.use(bodyParse.urlencoded({ extended: false }));
app.use(validator());
app.use(cookieParser());
// Express session
app.use(session({secret:'mysupersecret', resave:false, saveUninitialized:false}));
// Connect Flash
app.use(flash());
// Passport init
app.use(passport.initialize());
app.use(passport.session());
// Set static Folder
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next){
  res.locals.login = req.isAuthenticated();
  res.locals.session = req.session;
  next();
});

//app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/', routes);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Express Validator
app.use(validator({
    errorFormatter: function(param, msg, value){
      var namespace = param.split('.'),
       root = namespace.shift(),
       formParam = root;
       while(namespace.length){
         formParam += '[' + namespace.shift() + ']';
       }
       return{
         param:formParam,
         msg: msg,
         value: value
       };
    }
}));

// Global Vars
app.use(function(req, res, next){
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});
module.exports = app;
