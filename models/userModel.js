var mongoose = require('mongoose');

// Creates schema for a User
var userSchema = new mongoose.Schema({
    name: String,
    username: String,
    password: String,
    email: String,
    admin: Boolean,
    location: String,
    age: Number,
});

// Exports the above schema
module.exports = mongoose.model('User', userSchema);