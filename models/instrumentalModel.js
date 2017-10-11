var mongoose = require('mongoose');

// Creates schema for an Instrumental
var instrumentalSchema = new mongoose.Schema({
    title: String,
    owner: String,
    uploadDateISO: Date,
    uploadDateNormal: Date,
    genre: String,
    tags: String,
    price: Number,
    bpm: Number,
    plays: Number,
    purchases: {type: Number, default: 0}
});

// Exports the above schema
module.exports = mongoose.model('Instrumental', instrumentalSchema);