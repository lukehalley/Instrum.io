var app = angular.module('InstrumApp');

app.controller('feedController', ['$scope', '$http' ,function($scope, $http) {
    // create a message to display in our view
    $scope.message = 'This is the instrumentals page!!';

    findInstrumentals();

    function findInstrumentals() {
        $http.get('/instrumentals')
            .success(function (data) {
                $scope.instrumentals = data;
                console.log(data);
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };

}
]);

