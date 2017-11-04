var model = require('../models/userModel');
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var db = mongoose.connection;

// Connects to the MongoDB server
mongoose.connect('mongodb://localhost:27017/instrumdb');

// Catches an error if there is a problem connecting to the database, sends the message 'connection error' to the console along with the error (err)
db.on('error', function (err) {
    console.log('connection error', err);
});

// If connection to the database is successful, the message 'connected to database' is displayed in the console
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
};

// GET - Finds all users in database
router.findAllUsers = function(req, res) {
    // Use the model model to find all user
    model.find(function(err, users) {
        if (err)
            res.send(err);
        else
            res.json(users);
    });
};

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
};

// PUT - Adds one purchase to an instrument given its ID
router.updateUser = function(req, res) {
    model.findOneAndUpdate({ "_id": req.params.id }, { "$set": { "name": req.body.name, "username": req.body.username, "password": req.body.password, "admin": req.body.admin, "location": req.body.location, "age": req.body.age}}).exec(function(err, instrumental)
    {
        if (err)
            res.send(err);
        res.json({ message: 'User Updated!', data: instrumental });
    });
};

// DELETE - Deletes one user given an id
router.deleteOneUser = function(req, res) {

    model.findByIdAndRemove(req.params.id, function (err) {
        if (err)
            res.send(err);
        else
            res.json({message: 'User Deleted!'});
    });
};

// DELETE - Deletes all users from db
router.deleteAllUsers = function(req, res) {

    model.remove({}, function(err) {
        if (err)
            res.send(err);
        else
            res.json({ message: 'All Users Have Been Deleted!'});
    });
};

module.exports = router;