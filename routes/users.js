// This file handles user routing
const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

// bring in the model
const User = require('../public/models/user');

// Register a user 
router.post('/register', (req, res, next) => {
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

// Authenticate the user as they attempt to login
router.post('/authenticate', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (err, user) => {
        if(err) {
            throw err;
        }
        if(!user) {
            return res.json({ success: false, msg: "Could not find the user."});
        } 

        User.comparePassword(password, user.password, (err, isMatch) => {
            if(err) {
                throw err;
            }

            if(isMatch) {
                // create the token as the password was correct
                const token = jwt.sign({user}, config.secret, {
                    expiresIn: 2592000
                });

                res.json({
                    success: true, 
                    token: `Bearer ${token}`,
                    user: {
                        id: user._id,
                        name: user.name,
                        username: user.username, 
                        email: user.email
                    }
                });
            } else {
                res.send({ success: false, msg: "Incorrect password."});
            }
        });
    })
});

// User profile
router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    res.json({user: req.user})
});

module.exports = router;