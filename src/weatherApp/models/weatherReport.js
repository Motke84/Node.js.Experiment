const mongoose = require('mongoose');

const WeatherReport = mongoose.model('WeatherReport', {
  address: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  },
  temperature: {
    type: Number,
    required: true,
    trim: true,
    default: null
  },
  feelsLike: {
    type: Number,
    required: true,
    trim: true,
    default: null
  },
  date: {
    type: Number,
    default: null
  }
  ,
  ip: {
    type: String,
    default: null,
    trim: true,
  }
});


module.exports = {
  WeatherReport
}