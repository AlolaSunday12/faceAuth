const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const keys = require('./config/keys');
const passportSetup = require("./config/passportSetup");
const profileRoutes = require('./routes/profileRoutes');
const authRoutes = require('./routes/authRoutes');


const app = express();

//set view engine
app.set('view engine', 'ejs');

app.use(session({
    secret: 'SECRET_KEY',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));

app.use(passport.initialize());
app.use(passport.session());

const connection = mongoose.connection

mongoose.connect(keys.mongodb.MONGOURL);

connection.on('connected', () => {
    console.log('mongoose connection succesful')
});

connection.on('error', (error) => {
    console.log('mongoose connection failed')
});

app.use('/auth', authRoutes)
app.use('/profile', profileRoutes)

//create home route
app.get('/', (req, res) => {
    res.render('home', {user: req.user});
});

const port = process.env.Port || 3000
app.listen(port, () => {
    console.log('node server started using nodemon')
});