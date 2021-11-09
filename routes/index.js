var express = require('express');
var router = express.Router();

const userController = require('../controllers/userController');
const postController = require('../controllers/postController');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Clubhouse', user: req.user });
});


// ******* USER routes *******
// GET signup page
router.get('/signup', userController.signup_get);

// POST signup request
router.post('/signup', userController.signup_post);

// GET login page
router.get('/login', userController.login_get);

// POST login page
router.post('/login', userController.login_post);

// logout
router.get('/logout', userController.logout);

// GET profile form page
router.get('/user/:id', userController.profile_get);

// POST profile form page
router.post('/user/:id', userController.profile_post);


// ******* POSTS routes *******
// GET allposts page
router.get('/posts', postController.allposts);

// GET create post form
router.get('/posts/create', postController.createpost_get);

// POST create post form
router.post('/posts/create', postController.createpost_post);

// GET viewpost page
router.get('/posts/:id', postController.onepost_view);

// GET update post form

// POST update post form

// POST delete post
router.post('/posts/:id', postController.onepost_delete);


module.exports = router;
