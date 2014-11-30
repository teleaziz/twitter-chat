'use strict';

angular.module('chatAppApp')
.controller('RoomsCtrl', function ($scope, socket,messages) {
  $scope.message = 'Hello';
  $scope.mainRoom=[];
  
  messages.getPublic().success(function(response){
    $scope.mainRoom= response;
    console.log("here");
    console.log("response main: ", response);
    socket.syncUpdates('message', $scope.mainRoom);
  }).error(function(err){
    console.log("reerer", err);
  })
  $scope.send= function(){
    if($scope.newMessage === '') {
      return;
    }      
    var newMessage= $scope.newMessage;
    messages.send(newMessage).success(function(response){
      $scope.newMessage="";
    })
  }
});
