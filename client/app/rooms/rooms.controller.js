'use strict';

angular.module('chatAppApp')
.controller('RoomsCtrl', function ($scope, Auth, socket,messages) {

  $scope.message = 'Hello';
  $scope.mainRoom=[];
  $scope.privateRooms={};
  $scope.privateMessage={};


  messages.getPublic().success(function(response){
    $scope.mainRoom= response;
    console.log("here");
    console.log("response main: ", response);
    socket.syncUpdates('message', $scope.mainRoom);
  }).error(function(err){
    console.log("reerer", err);
  })


  function isMe(user){
    return Auth.getCurrentUser().twitter.screen_name == user.handle ;
  }


  $scope.send= function(){
    if($scope.newMessage === '') {
      return;
    }      
    var newMessage= $scope.newMessage;
    messages.send(newMessage).success(function(response){
      $scope.newMessage="";
    })
  }
  $scope.isMe = isMe ;
  $scope.me = Auth.getCurrentUser();
  $scope.initiatePrivateChat = function(user){
    if (isMe(user)) {return ;}
    if( $scope.privateRooms[user.handle]) {return ;}
    $scope.privateRooms[user.handle]= {with: user};
  }

  $scope.sendTo = function(user){
    if($scope.privateMessage[user.handle] === '') {
      return;
    }      
    var newMessage= $scope.privateMessage[user.handle];
    messages.sendTo(user,newMessage).success(function(response){
      $scope.privateMessage[user.handle]="";
    })
  }

  
});
