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

// GET - Finds all instruments in database
router.findAllInstruments = function(req, res) {
    // Use the Instrument model to find all instrument
    Instrument.find(function(err, instruments) {
        if (err)
            res.send(err);
        else
            res.json(instruments);
    });
}

// GET - Finds one instrument given an id
router.findOneInstrument = function(req, res) {

    // Use the Instrument model to find a single instrument
    Instrument.find({ "_id" : req.params.id },function(err, instrument) {
        if (err)
            res.json({ message: 'Instrument NOT Found!', errmsg : err } );
        else
            res.json(instrument);
    });
}

// POST - Adds an instrument given some JSON data
router.addOneInstrument = function(req, res) {

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

// // PUT - Updates an instrument given some JSON data
// router.updateOneInstrument = function(req, res) {
//
//     Instrument.findByIdAndUpdate(req.params.id,{$set:req.body}, function(err, result){
//         if (err)
//             res.send(err);
//         else {
//             console.log("RESULT: " + result);
//             res.json({message: 'Instrument Updated!', data: instrument});
//         }
//     });
// };

router.incrementPurchases = function(req, res) {

    Instrument.findById(req.params.id, function(err,instrument) {
        if (err)
            res.send(err);
        else {
            instrument.purchases += 1;
            instrument.save(function (err) {
                if (err)
                    res.send(err);
                else
                    res.json({ message: 'instrument Upvoted!', data: instrument });
            });
        }
    });
}

// DELETE - Deletes one instrument given an id
router.deleteOneInstrument = function(req, res) {

    Instrument.findByIdAndRemove(req.params.id, function (err) {
        if (err)
            res.send(err);
        else
            res.json({message: 'Instrument Deleted!'});
    });
}

router.deleteAllInstruments = function(req, res) {

    Instrument.remove({}, function(err) {
        if (err)
            res.send(err);
        else
            res.json({ message: 'All Instruments Deleted!'});
    });
}

module.exports = router;