'use strict';

angular.module('chatAppApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('rooms', {
        url: '/rooms',
        templateUrl: 'app/rooms/rooms.html',
        controller: 'RoomsCtrl',
        authenticate: true
      })
    .state('private', {
        url: '/private/:handle',
        templateUrl: 'app/rooms/rooms.html',
        controller: 'RoomsCtrl',
        authenticate: true
      });
  });