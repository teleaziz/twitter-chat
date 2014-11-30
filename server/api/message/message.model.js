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
  from: {},
  created: {
    type: Date,
    default: new Date().toUTCString()
  }

});
MessageSchema.pre('save', function (next) {
  this.created = new Date().toUTCString();
  next();
});

module.exports = mongoose.model('Message', MessageSchema);