var app = angular.module('InstrumApp', ['ngRoute']);

app.config(function($routeProvider) {
        $routeProvider

            // route for the landing page which is the feed
            .when('/feed', {
                templateUrl : 'pages/feed.ejs',
                controller  : 'feedController'
            });

    });


  
  


