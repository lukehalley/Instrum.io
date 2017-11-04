var express = require('express');
var router = express.Router();

// Sets the page which is displayed when the home page of the web application is visited
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Instrum.io' });
});

module.exports = router;
