const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/facebook', passport.authenticate('facebook', {
    scope: ['email', 'public_profile']
}));

router.get('/facebook/redirect', passport.authenticate('facebook', {
    failureRedirect: '/auth/login' // Redirect on failure
}), (req, res) => {
    try {
        res.redirect('/profile');
    } catch (err) {
        console.error('Error during redirect:', err); // Log errors here
        res.status(500).send('An error occurred');
    }
});

router.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
});

router.get('/login', (req, res) => {
    res.render('login', {user: req.user});
});

module.exports = router;