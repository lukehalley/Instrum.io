var mongoose = require('mongoose');

var InstrumentSchema = new mongoose.Schema({
    // Name of the instrument, eg - Trumpet, Piano
    instrumentname: String,
    // Instrument type, eg - Wind, Percussion
    instrumenttype: String,
    // Price of the instrument, eg - 23
    instrumentprice: Number,
    // The amount of times an instrument has been purchased, eg - 4
    purchases: {type: Number, default: 0}
});

module.exports = mongoose.model('Instrument', InstrumentSchema);