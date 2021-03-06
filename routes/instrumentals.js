var model = require('../models/instrumentalModel');
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var db = mongoose.connection;

// Connects to the MongoDB server
// mongoose.connect('mongodb://localhost:27017/instrumdb');
mongoose.connect('mongodb://instrumuser:instrumpassword@ds121494.mlab.com:21494/instrum-io');
// Catches an error if there is a problem connecting to the database, sends the message 'connection error' to the console along with the error (err)
db.on('error', function (err) {
    console.log('connection error', err);
});

// If connection to the database is successful, the message 'connected to database' is displayed in the console
db.once('open', function () {
    console.log('connected to database');
});
// todo Search using specific title like getting on instrumentl and make a new route two like sortby likes etc
// GET - Finds all current instrumentals in database
router.findAllInstrumentals = function(req, res) {
    if(req.query.search) {
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        model.find({"title": req.query.search.title},function(err, instrumentals) {
            if (err)
                res.send(err);
            else
                res.json(instrumentals);
        });
    } else {
        console.log('------ NOT WORKING ------');
        model.find(function(err, instrumentals) {
            if (err)
                res.send(err);
            else
                res.json(instrumentals);
        });
    }
};

// GET - Sorts the instrumentals by newest first
router.sortByNewest = function(req, res) {
    model.find({}).sort({uploadDateISO: -1}).exec(function(err, instrumental) {
        if (err)
            res.json({ message: 'Instrumentals could not be sorted by newest!', errmsg : err } );
        else
            res.json(instrumental);
    });
};

// GET - Finds one instrumental given an id
router.findOneInstrumental = function(req, res) {
    // Use the model model to find a single instrumental
    model.find({ "_id" : req.params.id },function(err, instrumental) {
        if (err)
            res.json({ message: 'model NOT Found!', errmsg : err } );
        else
            res.json(instrumental);
    });
};



// GET - Sorts the instrumentals by their purchase count
router.sortByPurchases = function(req, res) {
    model.find({}).sort({purchases: -1}).exec(function(err, instrumental) {
        if (err)
            res.json({ message: 'Instrumentals could not be sorted by purchases!', errmsg : err } );
        else
            res.json(instrumental);
    });
};

// GET - Sorts the instrumentals by their like count
router.sortByLikes = function(req, res) {
    model.find({}).sort({likes: -1}).exec(function(err, instrumental) {
        if (err)
            res.json({ message: 'Instrumentals could not be sorted by likes!', errmsg : err } );
        else
            res.json(instrumental);
    });
};

// POST - Adds an instrumental given some JSON data
router.addOneInstrumental = function(req, res) {

    var currentDateIso = new Date();

    var instrumental = new model();
    instrumental.title = req.body.title;
    instrumental.owner = req.body.owner;
    instrumental.uploadDateISO = currentDateIso.toISOString();
    instrumental.genre = req.body.genre;
    instrumental.tags = req.body.tags;
    instrumental.price = req.body.price;
    instrumental.bpm = req.body.bpm;
    instrumental.plays = req.body.plays;
    instrumental.likes = req.body.likes;
    instrumental.purchases = req.body.purchases;

    console.log('Adding instrumental: ' + JSON.stringify(instrumental));

    // Save the instrumental and check for errors
    instrumental.save(function(err) {
        if (err)
            res.send(err);
        res.json({ message: 'Instrumental Added!', data: instrumental });
    });
};

// PUT - Adds one like to an instrument given its ID
router.likeInstrumental = function(req, res) {
    model.findById(req.params.id, function(err,instrumental) {
        if (err)
            res.send(err);
        else {
            instrumental.likes += 1;
            instrumental.save(function (err) {
                if (err)
                    res.send(err);
                else
                    res.json({ message: 'Instrumental Has Been Liked!', data: instrumental });
            });
        }
    });
};

// PUT - Adds one purchase to an instrument given its ID
router.purchaseInstrumental = function(req, res) {
    model.findById(req.params.id, function(err,instrumental) {
        if (err)
            res.send(err);
        else {
            instrumental.purchases += 1;
            instrumental.save(function (err) {
                if (err)
                    res.send(err);
                else
                    res.json({ message: 'Purchase Has Been Liked!', data: instrumental });
            });
        }
    });
};

// PUT - Adds one purchase to an instrument given its ID
router.updateInstrumental = function(req, res) {
    model.findOneAndUpdate({ "_id": req.params.id }, { "$set": { "title": req.body.title, "owner": req.body.owner, "genre": req.body.genre, "tags": req.body.tags, "price": req.body.price, "bpm": req.body.bpm, "plays": req.body.plays, "purchases": req.body.purchases}}).exec(function(err, instrumental)
    {
        if (err)
            res.send(err);
        res.json({ message: 'Instrumental Updated!', data: instrumental });
    });
}

// DELETE - Deletes one instrumental given an id
router.deleteOneInstrumental = function(req, res) {

    model.findByIdAndRemove(req.params.id, function (err) {
        if (err)
            res.send(err);
        else
            res.json({message: 'Instrumental Deleted!'});
    });
};

// DELETE - Deletes all instrumentals from db
router.deleteAllInstrumentals = function(req, res) {

    model.remove({}, function(err) {
        if (err)
            res.send(err);
        else
            res.json({ message: 'All Instrumentals Have Been Deleted!'});
    });
};

// Fuzzy search
// https://stackoverflow.com/questions/38421664/fuzzy-searching-with-mongodb
function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};


module.exports = router;
