const mongoose = require('mongoose');

module.exports = mongoose.model('dataFile', new mongoose.Schema({
  id: Number,
  name: String,
  time: Date,
  temperature: Number
}));