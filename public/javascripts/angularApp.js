var app = angular.module('InstrumApp', ['ngRoute']);

app.config(function($routeProvider) {
        $routeProvider

            // route for the landing page which is the feed
            .when('/', {
                templateUrl : 'pages/feed.ejs',
                controller  : 'feedController'
            })

            .when('/feed', {
                templateUrl : 'pages/feed.ejs',
                controller  : 'feedController'
            })

            .when('/genre', {
                templateUrl : 'pages/genre.ejs',
                controller  : 'genreController'
            })

            .when('/charts', {
                templateUrl : 'pages/charts.ejs',
                controller  : 'chartController'
            })

            .when('/uploaded', {
                templateUrl : 'pages/uploaded.ejs',
                controller  : 'uploadedController'
            })

            .when('/users', {
                templateUrl : 'pages/users.ejs',
                controller  : 'usersController'
            })

            .when('/upload', {
                templateUrl : 'pages/upload.ejs',
                controller  : 'feedController'
            });

    });


  
  


