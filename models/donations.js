var mongoose = require('mongoose');

var InstrumentSchema = new mongoose.Schema({
    // Name of the instrument, eg - Trumpet, Piano
    instrumentname: String,
    // Instrument type, eg - Wind, Percussion
    instrumenttype: String,
    // Price of the instrument, eg - 23
    instrumentprice: Number,
    upvotes: {type: Number, default: 0}
});

module.exports = mongoose.model('Instrument', InstrumentSchema);