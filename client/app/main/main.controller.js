'use strict';

angular.module('chatAppApp')
.controller('MainCtrl', function (Auth,$scope, $http, socket, $window) {
  $scope.awesomeThings = [];
  $scope.isCollapsed= false;
  
  $http.get('/api/things').success(function(awesomeThings) {
    $scope.awesomeThings = awesomeThings;
    socket.syncUpdates('thing', $scope.awesomeThings);
  });

  $scope.addThing = function() {
    if($scope.newThing === '') {
      return;
    }
    $http.post('/api/things', { name: $scope.newThing });
    $scope.newThing = '';
  };

  $scope.deleteThing = function(thing) {
    $http.delete('/api/things/' + thing._id);
  };

  $scope.$on('$destroy', function () {
    socket.unsyncUpdates('thing');
  });

  $scope.loginOauth = function(provider) {
    $window.location.href = '/auth/' + provider;
  };
  $scope.isLoggedIn = Auth.isLoggedIn;
});
