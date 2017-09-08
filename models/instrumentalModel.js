var mongoose = require('mongoose');

var instrumentalSchema = new mongoose.Schema({
    title: String,
    owner: String,
    genre: String,
    tags: String,
    price: Number,
    bpm: Number,
    plays: Number,
    purchases: {type: Number, default: 0}
});

module.exports = mongoose.model('Instrumental', instrumentalSchema);