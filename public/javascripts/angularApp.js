var app = angular.module('InstrumApp', ['ngRoute']);

app.config(function($routeProvider) {
        $routeProvider

            // route for the landing page which is the feed
            .when('/', {
                templateUrl : 'pages/newest.ejs',
                controller  : 'newestController'
            })

            .when('/newest', {
                templateUrl : 'pages/newest.ejs',
                controller  : 'newestController'
            })

            .when('/genre', {
                templateUrl : 'pages/genre.ejs',
                controller  : 'genreController'
            })

            .when('/mostliked', {
                templateUrl : 'pages/likes.ejs',
                controller  : 'likesController'
            })

            .when('/mostpurchased', {
                templateUrl : 'pages/purchases.ejs',
                controller  : 'purchasesController'
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
                controller  : 'uploadController'
            });

    //    POSSIBLY HAVE TO ADD GOOGLE SIG IN COTROLLER HERE
    });


  
  


