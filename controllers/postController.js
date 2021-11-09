const passport = require("passport");

const User = require('../models/user');
const Post = require('../models/post');

const { body, validationResult } = require('express-validator');

// passport functions to pass user object to post calls
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});


exports.allposts = function (req, res, next) {
  Post.find()
    .sort({ dateTime: -1 })
    .exec((err, postlist) => {
      if (err) { return next(err); }
      res.render('allposts', { title: 'View All Posts', posts: postlist, user: req.user });
  });
}

exports.onepost_view = function (req, res, next) {
  Post.findById(req.params.id)
    .exec(function(err, result) {
      if (err) { return next(err); }
      if (result==null) {
        const error = new Error('Post not found');
        err.status = 404;
        return next(error);
      }
      res.render('onepost', { title: 'View Post', post: result, user: req.user });
  });
}

exports.onepost_delete = function (req, res, next) {
  Post.findByIdAndDelete(req.params.id, function (err) {
    if (err) { return next(err); }
    res.redirect('/posts/');
  })
}

exports.createpost_get = function(req, res, next) {
  res.render('createpost_form', { title: 'Create New Post', user: req.user });
}

exports.createpost_post = [
  body('content', 'Content cannot be blank').trim().isLength({ min: 1 }).escape(),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.redirect('/posts/create', { title: 'Create New Post', user: req.user, errors: errors.array() });
    }
    else {
      const post = new Post(
        {
          createdBy: req.body.createdBy,
          dateTime: req.body.dateTime,
          content: req.body.content
      }).save(function(err) {
        if (err) { return next(err); }
        res.redirect('/posts/');
      });
    }
  }
];