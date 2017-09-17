var express = require('express');
var router = express.Router();
var User = require('../models/user');
var midd = require('../middleware');

var userController = require('../controllers/userController');
var productController = require('../controllers/productController');

// Get /register
router.get('/register',midd.loggedOut, userController.user_register_get);
// Get /login
router.get('/login',midd.loggedOut, userController.login_user_get);

// Post login
router.post('/login', userController.login_user_post);

// Get profile
router.get('/profile',midd.requiresLogin, userController.get_user_profile);

// Get /Logout
router.get('/logout', userController.logout_user);

// Post register
router.post('/register', userController.user_register_post);


// Get Add product
router.get('/profile/add-product',productController.product_details_get);

// Post add Product
router.post('/profile/add-product',midd.loggedOut, productController.product_details_post);



/* GET home page. */
router.get('/', midd.loggedOut, function(req, res, next) {
  res.render('index', { title: 'Home' });
});

// Get / about
router.get('/about', function(req, res, next) {
  res.render('about', {title:'About'});
});

// Get /Contact
router.get('/contact', function(req, res, next) {
  res.render('contact', {title:'Contact'})
});

module.exports = router;
