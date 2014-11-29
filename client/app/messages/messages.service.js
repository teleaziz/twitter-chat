'use strict';

angular.module('chatAppApp')
.factory('messages', function (socket, $http) {
  // Service logic
  // ...

  var getPublicMessages= function(){
    return $http.get('/api/messages');
  };
  
  var sendMessag= function(txt) {
      return $http.post('/api/messages', { body: txt });
  }

  // Public API here
  return {
    send: sendMessage ,
    getPublic: getPublicMessages
  };
});
