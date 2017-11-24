var app = angular.module('InstrumApp');

app.controller('usersController', ['$scope', '$http' ,function($scope, $http) {
    // create a message to display in our view
    $scope.message = 'This is the users page!!';

    findAll();

    function findAll() {
        $http.get('/users')
            .success(function (data) {
                $scope.users = data;
                console.log(data);
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };

}]);
