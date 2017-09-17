var mongoose = requre('mongoose');

var CompanySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  description: {
    type: String
  }
});

var Company = mongoose.model('Company', CompanySchema);
module.exports = User;
