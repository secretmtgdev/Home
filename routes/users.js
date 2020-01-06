// This file handles user routing
const express = require('express');
const router = express.Router();

// Register a user 
router.post('/register', (req, res, next) => {
    res.send('Registering user');
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