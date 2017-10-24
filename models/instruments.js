var mongoose = require('mongoose');

var InstrumentSchema = new mongoose.Schema({
    instrumentname: String,
    instrumenttype: String,
    instrumentprice: Number,
    purchases: {type: Number, default: 0}
});

module.exports = mongoose.model('Instrument', InstrumentSchema);