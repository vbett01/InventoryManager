var User = require('../models/user');


//Get user registration details
exports.user_register_get = function(req, res, next){
  return res.render('register', {title: 'Sign Up' });
};

// Post user registration details
exports.user_register_post = function(req, res, next)
{
  if(req.body.email &&
  req.body.name &&
  req.body.nameofStore &&
  req.body.password &&
  req.body.confirmPassword)
{
  // Check if both Passwords are similar
  if(req.body.password !== req.body.confirmPassword)
  {
    var err = new Error('Passwords do not match');
    err.status = 400;
    return next(err);
  }
  // create object with form nput
  var userData = {
    email: req.body.email,
    name: req.body.name,
    nameofStore: req.body.nameofStore,
    password: req.body.password
  };
  // Use schema's create method to insert document into mongo
  User.create(userData, function(error, user)
{
    if(error)
    {
      return next(error);
    } else
    {
      req.session.userId = user._id;
      return res.redirect('/profile');
    }

});
}
  else {
    var err = new Error('All fields required.');
    err.status = 400;
    return next(err);
  }

};


// Function to ask for user login credentials
exports.login_user_get  = function(req, res, next){
  return res.render('login',{title: 'Log In'});
};

// Function to show the current user inventory
exports.get_user_inventory = function(req, res, next){
  return res.render('inventory');
}


// Login the user and show the profile
exports.login_user_post = function(req, res, next){
  // The req,body.email comes from pug template in the name section
  if(req.body.email && req.body.password)
  {
    // Method to authenticate the user is done in the models section
    // from the function  UserSchema.statics.authenticate = function(email, password, callback);
    User.authenticate(req.body.email, req.body.password, function(error, user)
  {
    if(error || !user)
    {
      var err = new Error('Wrong email or password.');
      err.status = 401;
      return next(err);
    }
    else {
      {
        // Create a session
        req.session.userId = user._id;
        return res.redirect('/profile');
      }
    }
  });
  }
  else {
    {
      var err =  new Error('Email and password are required.');
      err.status = 401;
      return next(err);
    }
  }
};

// Display the user's profile once all the requirements are met.
exports.get_user_profile = function(req, res, next)
{

  User.findById(req.session.userId)
    .exec(function(error, user)
  {
    if (error)
    {
      return next(error);
    } else
    {
      return res.render('profile',{title: 'Profile', name: user.name, StoreName: user.nameofStore});
    }
  })
};

// Log out the user
exports.logout_user = function(req, res, next)
{
  if(req.session)
  {
    // delete the session
    req.session.destroy(function(err)
  {
    if(err)
    {
      return next(err);
    }
    else
      {
        return res.redirect('/');
      }

  });

  }
};
