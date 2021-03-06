var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var flash = require('connect-flash')

var array_rounter = require('./router')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//session
app.use(session({
    secret : "huytiep",
    saveUninitialized: true,
    resave: true,
    name: 'HuyTiep',
    // cookie: {
    //     httpOnly: true,
    //     secure: true
    // }
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(flash())
require('./config/passport')(passport);

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'logo-icon.png')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', array_rounter.index);
app.use('/user', array_rounter.user);
app.use('/content',array_rounter.content)
app.use('/admin', array_rounter.admin);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error",{err:err});
});

module.exports = app;
