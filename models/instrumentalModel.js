var mongoose = require('mongoose');

// Creates schema for an Instrumental
var instrumentalSchema = new mongoose.Schema({
    title: {type: String, default: "No Title"},
    owner: {type: String, default: "No Owner"},
    uploadDateISO: Date,
    genre: {type: String, default: "No Genre"},
    tags: {type: String, default: "No Tags"},
    price: {type: Number, default: 0},
    bpm: {type: Number, default: 0},
    plays: {type: Number, default: 0},
    likes: {type: Number, default: 0},
    purchases: {type: Number, default: 0}
});

// Exports the above schema
module.exports = mongoose.model('Instrumental', instrumentalSchema);