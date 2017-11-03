var model = require('../models/instrumentalModel');
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

// GET - Finds all instrumentals in database
router.findAllInstrumentals = function(req, res) {
    // Use the model model to find all instrumental
    model.find(function(err, instrumentals) {
        if (err)
            res.send(err);
        else
            res.json(instrumentals);
    });
}

// GET - Finds one instrumental given an id
router.findOneInstrumental = function(req, res) {

    // Use the model model to find a single instrumental
    model.find({ "_id" : req.params.id },function(err, instrumental) {
        if (err)
            res.json({ message: 'model NOT Found!', errmsg : err } );
        else
            res.json(instrumental);
    });
}

// POST - Adds an instrumental given some JSON data
router.addOneInstrumental = function(req, res) {

    var instrumental = new model();
    instrumental.title = req.body.title;
    instrumental.owner = req.body.owner;
    instrumental.genre = req.body.genre;
    instrumental.tags = req.body.tags;
    instrumental.price = req.body.price;
    instrumental.bpm = req.body.bpm;
    instrumental.plays = req.body.plays;
    instrumental.purchases = req.body.purchases;

    console.log('Adding instrumental: ' + JSON.stringify(instrumental));

    // Save the instrumental and check for errors
    instrumental.save(function(err) {
        if (err)
            res.send(err);

        res.json({ message: 'Instrumental Added!', data: instrumental });
    });
}

// POST - Adds one purchase to an instrument given its ID
router.incrementPurchases = function(req, res) {

    model.findById(req.params.id, function(err,instrumental) {
        if (err)
            res.send(err);
        else {
            instrumental.purchases += 1;
            instrumental.save(function (err) {
                if (err)
                    res.send(err);
                else
                    res.json({ message: 'model Has Been Purchased!', data: instrumental });
            });
        }
    });
}

// DELETE - Deletes one instrumental given an id
router.deleteOneInstrumental = function(req, res) {

    model.findByIdAndRemove(req.params.id, function (err) {
        if (err)
            res.send(err);
        else
            res.json({message: 'model Deleted!'});
    });
}

// DELETE - Deletes all instrumentals from db
router.deleteAllInstrumentals = function(req, res) {

    model.remove({}, function(err) {
        if (err)
            res.send(err);
        else
            res.json({ message: 'All Instrumentals Have Been Deleted!'});
    });
}

module.exports = router;