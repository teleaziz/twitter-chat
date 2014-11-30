'use strict';

angular.module('chatAppApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'btford.socket-io',
  'ui.router',
  'ui.bootstrap'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('authInterceptor');
  })

  .factory('authInterceptor', function ($rootScope, $q, $cookieStore, $location) {
    return {
      // Add authorization token to headers
      request: function (config) {
        config.headers = config.headers || {};
        if ($cookieStore.get('token')) {
          config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
        }
        return config;
      },

      // Intercept 401s and redirect you to login
      responseError: function(response) {
        if(response.status === 401) {
          $location.path('/login');
          // remove any stale tokens
          $cookieStore.remove('token');
          return $q.reject(response);
        }
        else {
          return $q.reject(response);
        }
      }
    };
  })

  .run(function ($rootScope, $location, Auth) {
    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$stateChangeStart', function (event, next) {
      Auth.isLoggedInAsync(function(loggedIn) {
        if (next.authenticate && !loggedIn) {
          $location.path('/login');
        }
      });
    });
  })
.directive('scrollItem',function(){
    return{
    restrict: "A",
    link: function(scope, element, attributes) {
        if (scope.$last){ // If this is the last item, trigger an event
           scope.$emit("Finished");
       }
    }
   }
})
.directive('scrollIf', function() {
return{
    restrict: "A",
    link: function(scope, element, attributes) {
        scope.$on("Finished",function(){ //Handle an event when all the items are rendered with ng-repeat
            var chat_height = element.outerHeight();
            console.log(chat_height);
            element.scrollTop(chat_height*20); 
        });
    }
   }
  })
.filter('matchRoom', function(Auth) {
  var me = Auth.getCurrentUser();
    return function(items , user) {
      var filtered = [];
      angular.forEach(items, function(item) {
        if(item.to == me.twitter.screen_name && item.from.handle == user.handle ) {
          filtered.push(item);
           }
         else if(item.to == user.handle && item.from.handle == me.twitter.screen_name) {
           filtered.push(item);
        }
      });
      return filtered;
    };

});