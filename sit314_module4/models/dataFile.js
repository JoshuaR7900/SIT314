const mongoose = require('mongoose');

module.exports = mongoose.model('dataFile', new mongoose.Schema({
  locationID: Number,
  temperature: Number,
  time: Date
}));