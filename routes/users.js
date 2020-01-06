// This file handles user routing
const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

// bring in the model
const User = require('../public/models/user');

// Register a user 
router.post('/register', (req, res, next) => {
    console.log(req.body);
    // construct the user 
    let newUser = new User({
        name: req.body.name, 
        email: req.body.email, 
        username: req.body.username, 
        password: req.body.password
    });

    User.addUser(newUser, (err, user) => {
        if(err) {
            res.json({ success: false, msg: "Could not register the user." });
        } else {
            res.json({ sucess: true, msg: "Successfully registered the user."})
        }
    });
});

// Authenticate the user 
router.get('/authenticate', (req, res, next) => {
    res.send('Authenticating user');
});

// User profile
router.get('/profile', (req, res, next) => {
    res.send('User profile');
});

module.exports = router;