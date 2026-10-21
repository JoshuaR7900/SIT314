const mongoose = require('mongoose');

module.exports = mongoose.model('dataFile', new mongoose.Schema({
  temperature: Number,
  humditiy: Number,
  peoplePresent: Number,
  chairsUsed: Number,
  airCon: Boolean,
  vent: Boolean,
  Heat: Boolean,
  time: Date
}));