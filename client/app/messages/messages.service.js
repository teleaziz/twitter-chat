'use strict';

angular.module('chatAppApp')
.factory('messages', function (socket, $http, Auth) {
  // Service logic
  // ...
  var _id = Auth.getCurrentUser()._id;
  var getPublicM= function(){
    return $http.get('/api/users/'+_id+'/messages?main=true');
  };

  var getPrivate= function(){
    return $http.get('/api/users/'+_id+'/messages?me=true');
  };

  var send= function(txt) {
    return $http.post('/api/users/'+Auth.getCurrentUser()._id+'/messages', { body: txt });
  }
  var sendTo = function(user , txt){
    return $http.post('/api/users/'+Auth.getCurrentUser()._id+'/messages', { to: user.handle, body: txt });
  }

  // Public API here
  return {
    send: send,
    getPublic: getPublicM,
    getPrivate: getPrivate,
    sendTo: sendTo
  };
});
