'use strict';

var _ = require('lodash');
var Message = require('./message.model');

// Get list of messages
exports.index = function(req, res) {
  if(req.query.main){
    Message.find({to:'main'}).exec(function (err, messages) {
      if(err) { return handleError(res, err); }
      return res.json(200, messages);
    });
  } else if(req.query.me){
    Message.find(
      {
        $or: [
          { to: req.user.twitter.screen_name },
          { 'from.handle': req.user.twitter.screen_name} 
        ]
      })
    .exec(function(err,messages){
      if(err) { return handleError(res, err); }
      return res.json(200, messages);
    })
  }
};

// Get a single message
exports.show = function(req, res) {
  Message.findById(req.params.id, function (err, message) {
    if(err) { return handleError(res, err); }
    if(!message) { return res.send(404); }
    return res.json(message);
  });
};

// Creates a new message in the DB.
exports.create = function(req, res) {
  req.body.from = {
    name: req.user.name,
    img: req.user.twitter.profile_image_url,
    handle: req.user.twitter.screen_name,
    id: req.user._id
  }
  Message.create(req.body, function(err, message) {
    if(err) { return handleError(res, err); }
    return res.json(201, message);
  });
};

// Updates an existing message in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Message.findById(req.params.id, function (err, message) {
    if (err) { return handleError(res, err); }
    if(!message) { return res.send(404); }
    var updated = _.merge(message, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, message);
    });
  });
};

// Deletes a message from the DB.
exports.destroy = function(req, res) {
  Message.findById(req.params.id, function (err, message) {
    if(err) { return handleError(res, err); }
    if(!message) { return res.send(404); }
    message.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}