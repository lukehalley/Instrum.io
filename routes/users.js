var model = require('../models/userModel');
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var db = mongoose.connection;

mongoose.connect('mongodb://localhost:27017/instrumdb');

db.on('error', function (err) {
    console.log('connection error', err);
});

db.once('open', function () {
    console.log('connected to database');
});

// GET - Finds one user given an id
router.findOneUser = function(req, res) {

    // Use the model model to find a single user
    model.find({ "_id" : req.params.id },function(err, user) {
        if (err)
            res.json({ message: 'User NOT Found!', errmsg : err } );
        else
            res.json(user);
    });
}

// GET - Finds all users in database
router.findAllUsers = function(req, res) {
    // Use the model model to find all user
    model.find(function(err, users) {
        if (err)
            res.send(err);
        else
            res.json(users);
    });
}

// POST - Adds an user given some JSON data
router.addOneUser = function(req, res) {

    var user = new model();
    user.name = req.body.name;
    user.username = req.body.username;
    user.password = req.body.password;
    user.admin = req.body.admin;
    user.email = req.body.email;
    user.location = req.body.location;
    user.age = req.body.age;
    user.created = req.body.created;

    console.log('Adding user: ' + JSON.stringify(user));

    // Save the user and check for errors
    user.save(function(err) {
        if (err)
            res.send(err);
        res.json({ message: 'User Added!', data: user });
    });
}

// PUT - Adds one purchase to an instrument given its ID
router.updateUser = function(req, res) {
    model.findOneAndUpdate({ "_id": req.params.id }, { "$set": { "name": req.body.name, "username": req.body.username, "password": req.body.password, "admin": req.body.admin, "location": req.body.location, "age": req.body.age}}).exec(function(err, instrumental)
    {
        if (err)
            res.send(err);
        res.json({ message: 'User Updated!', data: instrumental });
    });
}

// DELETE - Deletes one user given an id
router.deleteOneUser = function(req, res) {

    model.findByIdAndRemove(req.params.id, function (err) {
        if (err)
            res.send(err);
        else
            res.json({message: 'User Deleted!'});
    });
}

// DELETE - Deletes all users from db
router.deleteAllUsers = function(req, res) {

    model.remove({}, function(err) {
        if (err)
            res.send(err);
        else
            res.json({ message: 'All Users Have Been Deleted!'});
    });
}

module.exports = function(passport){

    /* GET login page. */
    router.get('/', function(req, res) {
        // Display the Login page with any flash message, if any
        res.render('index', { message: req.flash('message') });
    });

    /* Handle Login POST */
    router.post('/login', passport.authenticate('login', {
        successRedirect: '/home',
        failureRedirect: '/',
        failureFlash : true
    }));

    /* GET Registration Page */
    router.get('/signup', function(req, res){
        res.render('register',{message: req.flash('message')});
    });

    /* Handle Registration POST */
    router.post('/signup', passport.authenticate('signup', {
        successRedirect: '/home',
        failureRedirect: '/signup',
        failureFlash : true
    }));

    return router;
}

module.exports = router;