const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../../config/database');

// Create the schema for the user 
const UserSchema = mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    email: {
        type: String, 
        required: true
    },
    username: {
        type: String, 
        required: true 
    },
    password: {
        type: String, 
        required: true
    }
});

// Set an exportable user variable to the user schema and bind document
const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserbyId = (id, callback) => {
    User.findById(id, callback);
}

module.exports.getUserByUsername = (username, callback) => {
    const query = { username };
    User.findOne(query, callback);
}

module.exports.addUser = (newUser, callback) => {
    // hash the password from plain text to encrypted 
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) throw err;
            
            // encrypt the password in the database
            newUser.password = hash;
            newUser.save(callback);
        })
    })
}