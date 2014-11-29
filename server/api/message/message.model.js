'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MessageSchema = new Schema({
  title: String,
  body: String,
  active: Boolean,
  to: {
    type: String,
    default: 'main'
  },
  from: {}
  
});

module.exports = mongoose.model('Message', MessageSchema);