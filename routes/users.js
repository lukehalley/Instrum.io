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

module.exports = router;