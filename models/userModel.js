var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    name: String,
    username: String,
    password: String,
    admin: Boolean,
    location: String,
    age: Number,
});

module.exports = mongoose.model('User', userSchema);

// {"name":"Luke Halley","username":"lukehalley123","password":"password123","admin":true,"location":"Ireland","age":20}