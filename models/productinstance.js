var mongoose = require('mongoose');
var product = require('product');


var productInstanceSchema = new mongoose.Schema({
  code:{
    type: Number,
    requred: true
  },
  product: {
     type: Schema.ObjectId,
     ref: 'Product',
     required: true
  },
  owner: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  }
  expiry: {
    type: Date,
    requred: true
  }

});

productInstaceSchema.statics.authenticate = function(code, callback)
{
  product.findOne({code: code})
    .exec(function (error,product)
  {
    if(error)
    {
      return callback(error);
    }
    else if(product)
    {
      // Add details of the product to the product instance
    }
    else
    {
      // product not found create a new one
    }
}

var ProductInstance = mongoose.model('ProductInstance',productInstanceSchema);
module.expots = Product;
