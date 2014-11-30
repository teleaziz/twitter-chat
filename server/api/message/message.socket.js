/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Message = require('./message.model');

exports.register = function(socket) {
  Message.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Message.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  if(doc.to==='main'){
    socket.emit('message:save:main', doc);
  }
  else {
    var handles = [ doc.to , doc.from.handle];
    socket.emit('message:save'+':'+handles.sort()[0]+':'+handles.sort()[1], doc);
  }
}

function onRemove(socket, doc, cb) {
  socket.emit('message:remove', doc);
}