'use strict';

angular.module('chatAppApp')
.controller('RoomsCtrl', function ($scope, Auth, socket,messages, User) {

  $scope.message = 'Hello';
  $scope.mainRoom=[];
  $scope.privateRooms={};
  $scope.privateMessage={};
  $scope.me = Auth.getCurrentUser();
  $scope.users=User.query();
  console.log($scope.users);
  messages.getPublic().success(function(response){
    $scope.mainRoom= response;
    socket.syncUpdates('message', $scope.mainRoom , 'main');
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
  $scope.initiatePrivateChat = function(user){
    if (isMe(user)) {return ;}
    if( $scope.privateRooms[user.handle]) {return ;}

    messages.getPrivate().success(function(response){
      $scope.privateMessages= response;
      $scope.privateRooms[user.handle]= {with: user};
      socket.syncUpdatesWith('message', $scope.privateMessages , [$scope.me.twitter.screen_name, user.handle]);
    }).error(function(err){
      console.log("error in fetching private messages", err);
    })


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
  $scope.$on('$destroy', function () {
    socket.unsyncUpdates('message');
  });


});
