const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

router.get('/register', (req, res) => res.render('auth/register'));

router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username: username });
    if (existingUser) {
        req.flash('error_msg', 'Username is already taken. Please choose another one.');
        return res.redirect('/auth/register');
      }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ username, password: hashedPassword });
    req.flash('success_msg', 'You are now registered! Please log in.');
    res.redirect('/auth/login');
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'An error occurred during registration. Please try again.');
    res.redirect('/auth/register');
  }
});

router.get('/login', (req, res) => res.render('auth/login'));

router.post('/login',
  passport.authenticate('local', {
    successRedirect: '/books',
    failureRedirect: '/auth/login',
    failureFlash: true
  })
);

router.get('/logout', (req, res) => {
  req.logout(() => {
    req.flash('success_msg', 'You are logged out');
    res.redirect('/auth/login');
  });
});

router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

router.get('/github/callback',
  passport.authenticate('github', {
    failureRedirect: '/auth/login',
    failureFlash: true
  }),
  (req, res) => {
    res.redirect('/books');
  }
);

module.exports = router;
