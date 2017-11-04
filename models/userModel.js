var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    name: String,
    username: String,
    password: String,
    email: String,
    admin: Boolean,
    location: String,
    age: Number,
});

module.exports = mongoose.model('User', userSchema);