var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var SandwichSchema = new Schema({
  description: String,
  Bread: String,
  Protein: String,
  Condiment: String,
  Length: Number
});

var Campsite = mongoose.model('Campsite', CampsiteSchema);

module.exports = Campsite;