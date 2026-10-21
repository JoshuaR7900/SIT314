const mongoose = require('mongoose');

module.exports = mongoose.model('dataFile', new mongoose.Schema({
  locationID: Number,
  fire: String,
  temperature: Number,
  wind: Number,
  rain: Number, 
  time: Date,
  postcode: Number,
}));