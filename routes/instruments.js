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
    // Use the Instrument model to find all instrument
    Instrument.find(function(err, instruments) {
        if (err)
            res.send(err);
        else
            res.json(instruments);
    });
}

router.findOne = function(req, res) {

    // Use the Instrument model to find a single instrument
    Instrument.find({ "_id" : req.params.id },function(err, instrument) {
        if (err)
            res.json({ message: 'Instrument NOT Found!', errmsg : err } );
        else
            res.json(instrument);
    });
}

router.addInstrument = function(req, res) {

    var instrument = new Instrument();
    instrument.instrumentname = req.body.instrumentname;
    instrument.instrumenttype = req.body.instrumenttype;
    instrument.instrumentprice = req.body.instrumentprice;
    instrument.purchases = req.body.purchases;

    console.log('Adding instrument: ' + JSON.stringify(instrument));

    // Save the instrument and check for errors
    instrument.save(function(err) {
        if (err)
            res.send(err);

        res.json({ message: 'Instrument Added!', data: instrument });
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

    Instrument.findById(req.params.id, function(err,instrument) {
        if (err)
            res.send(err);
        else {
            instrument.upvotes += 1;
            instrument.save(function (err) {
                if (err)
                    res.send(err);
                else
                res.json({ message: 'Instrument Upvoted!', data: instrument });
            });
        }
    });
}

module.exports = router;