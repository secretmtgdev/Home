const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');
const app = express();
const port = 3000;
const users = require('./routes/users');

// connect to the database 
mongoose.connect(config.database, { useUnifiedTopology: true, useNewUrlParser: true });

// check for connection with mongoose
mongoose.connection.on('connected', () => {
    console.log(`Connected to database: ${config.database}`);
});

// check for a database error 
mongoose.connection.on('error', err => {
    console.log(`Issue with the database: ${err}`);
})

// Allow requests to API from different domain names
app.use(cors());

// Bind the appropriate routes
app.use('/users', users)

// Allow the application to parse json
app.use(bodyParser.json());

// Sets the view 
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
});
