var app = angular.module('InstrumApp');

app.controller('chartsController', ['$scope', function($scope) {

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

    $scope.likeInstrumental = function (id) {
        $http.put('/instrumentals/' + id + '/likes')
            .success(function (data) {
                console.log(data);
                findInstrumentals();
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };

    $scope.purchaseInstrumental = function (id) {
        $http.put('/instrumentals/' + id + '/purchases')
            .success(function (data) {
                console.log(data);
                findInstrumentals();
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };

}]);
