var mongoose = require('mongoose');

var CategorySchema = new mongoose.Schema({
  name: {
    type: String
  }
});

var Category = mongoose.model('Category', CategorySchema);
module.exports = Category;
