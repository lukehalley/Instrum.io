var app = angular.module('InstrumApp', ['ngRoute']);

app.config(function($routeProvider) {
        $routeProvider

            // route for the home page
            .when('/', {
                templateUrl : 'pages/instrumentalroutes.ejs',
                controller  : 'instrumentalController'
            });

    });


  
  


