var Instrument = require('../models/instruments');
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/instrumentsdb');

var db = mongoose.connection;

db.on('error', function (err) {
    console.log('connection error', err);
});
db.once('open', function () {
    console.log('connected to database');
});

router.findAll = function(req, res) {
    // Use the Instrument model to find all instruments
    Instrument.find(function(err, instruments) {
        if (err)
            res.send(err);
        else
            res.json(instruments);
    });
}

router.findOne = function(req, res) {

    // Use the Instrument model to find a single Instrument
    Instrument.find({ "_id" : req.params.id },function(err, Instrument) {
        if (err)
            res.json({ message: 'Instrument NOT Found!', errmsg : err } );
        else
            res.json(Instrument);
    });
}

router.addInstrument = function(req, res) {

    var Instrument = new Instrument();

    Instrument.paymenttype = req.body.paymenttype;
    Instrument.amount = req.body.amount;

    console.log('Adding Instrument: ' + JSON.stringify(Instrument));

    // Save the Instrument and check for errors
    Instrument.save(function(err) {
        if (err)
            res.send(err);

        res.json({ message: 'Instrument Added!', data: Instrument });
    });
}

router.deleteInstrument = function(req, res) {

    Instrument.findByIdAndRemove(req.params.id, function(err) {
        if (err)
            res.send(err);
        else
            res.json({ message: 'Instrument Deleted!'});
    });
}

router.incrementUpvotes = function(req, res) {

    Instrument.findById(req.params.id, function(err,Instrument) {
        if (err)
            res.send(err);
        else {
            Instrument.upvotes += 1;
            Instrument.save(function (err) {
                if (err)
                    res.send(err);
                else
                res.json({ message: 'Instrument Upvoted!', data: Instrument });
            });
        }
    });
}

module.exports = router;