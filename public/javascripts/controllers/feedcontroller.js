var app = angular.module('InstrumApp');

app.controller('feedController', ['$scope', function($scope) {
    // create a message to display in our view
      $scope.message = 'This is the feed page!!';
     }
  ]);
