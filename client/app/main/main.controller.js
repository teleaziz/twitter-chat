'use strict';

angular.module('chatAppApp')
.controller('MainCtrl', function (Auth,$scope, $http, $state,User, socket, $window) {
  $scope.awesomeThings = [];
  $scope.isCollapsed= false;
  
  if(Auth.getCurrentUser()) {
  $scope.users= User.query();
  }
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
  $scope.searchTerm = function (item) {
    return item.name === $scope.query || (item.twitter && item.twitter.screen_name === $scope.query); 
};

});
