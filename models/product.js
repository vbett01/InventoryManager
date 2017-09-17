var mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true,
    trim:true
  },
  manufacturer: {
    type: String,
    required: true,
    trim:true
  },
  barcode: {
    type: Number,
    required: true,
    unique: true,
    trim:true
  },
  category: {
    type: String,
    required: true,
    trim:true

  },
  description: {
    type: String,
    trim:true

  }
});

productSchema.statics.authenticate = function(code, callback)
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
      // Return a function saying product already exists
      var err = new Error('Product Already Exists');
      err.status = 401;
      return callback(err);
    }

  })
}

var Product = mongoose.model('Product',productSchema);
module.expots = Product;
