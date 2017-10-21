var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var instrumentals = require('./routes/instrumentals.js');
var users = require('./routes/users.js');
var mongoose = require('mongoose');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes);

// Routes for instrumentals
app.get('/instrumentals', instrumentals.findAllInstrumentals);
app.get('/instrumentals/newest', instrumentals.sortByNewest);
app.get('/instrumentals/mostpurchased', instrumentals.sortByPurchases);
app.get('/instrumentals/:id', instrumentals.findOneInstrumental);

app.post('/instrumentals', instrumentals.addOneInstrumental);

app.put('/instrumentals/:id/likes', instrumentals.likeInstrumental);
app.put('/instrumentals/:id/purchases', instrumentals.purchaseInstrumental);
app.put('/instrumentals/:id/', instrumentals.updateInstrumental);

app.delete('/instrumentals/:id', instrumentals.deleteOneInstrumental);
app.delete('/instrumentals', instrumentals.deleteAllInstrumentals);

// Routes for users
app.get('/users', users.findAllUsers);
app.get('/users/:id', users.findOneUser);
app.post('/users', users.addOneUser);
app.put('/users/:id/', users.updateUser);
app.delete('/users/:id', users.deleteOneUser);
app.delete('/users', users.deleteAllUsers);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
