const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const User = require('../models/user');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

// passport functions for login

passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
      if (err) { 
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          // passwords match! log user in
          return done(null, user)
        } else {
          // passwords do not match!
          return done(null, false, { message: "Incorrect password" });
        }
      })
      return done(null, user);
    });
  })
);

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});


exports.signup_get = function (req, res, next) {
  res.render('signup_form', { title: 'Sign up' });
};

exports.signup_post = [
  body('firstname', 'First name required').trim().isLength({ min: 1 }).escape(),
  body('lastname', 'Last name required').trim().isLength({ min: 1 }).escape(),
  body('username', 'Username required').trim().isLength({ min: 1 }).escape(),
  body('password', 'Password must not be empty').isLength({ min: 1 }).escape(),
  body('confirmpassword', 'Passwords must match').escape().custom((value, { req }) => value === req.body.password),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render('signup_form', { title: 'Sign Up', errors:errors.array() })
    } else {
      bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
        const user = new User(
          {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            username: req.body.username,
            password: hashedPassword,
            isMember: false,
            isAdmin: false
        }).save(function(err) {
          if (err) { return next(err); }
          res.redirect('/login');
        });
      });
    }
  }
];

exports.login_get = function (req, res, next) {
  res.render('login_form', { title: 'Log In' });
};

exports.login_post = [
  body('username', 'Username required').trim().isLength({ min: 1 }).escape(),
  body('password', 'Password required').isLength({ min: 1 }).escape(),

  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
  })
];

exports.profile_get = function (req, res, next) {
  res.render('userprofile', { title: 'User Profile', user: req.user });
}

exports.profile_post = function (req, res, next) {
  const user = new User(
    {
      _id: req.params.id,
      firstname: req.user.firstname,
      lastname: req.user.lastname,
      username: req.user.username,
      password: req.user.password,
      isMember: req.body.isMember
  });

  User.findByIdAndUpdate(req.params.id, user, {}, function(err, updateduser) {
    if (err) { return next(err); }
    res.redirect('/');
  });
}

exports.logout = function (req, res, next) {
  req.logout();
  res.redirect('/');
}