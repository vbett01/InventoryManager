var Product = require('../models/product');

// Get product details
exports.product_details_get= function(req, res, next)
{
 return res.render('add-product');
};

// handle product details on Post
exports.product_details_post = function(req, res, next)
{
  res.send(' Success the product had been added prontossssssssssdsfd fgdgdssdf');
};
