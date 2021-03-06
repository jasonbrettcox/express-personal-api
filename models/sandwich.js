var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var SandwichSchema = new Schema({
  description: String,
  bread: String,
  protein: String,
  condiment: String,
  length: String
});

var Sandwich = mongoose.model('Sandwich', SandwichSchema);

module.exports = Sandwich;