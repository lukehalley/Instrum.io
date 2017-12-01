var app = angular.module('InstrumApp');

app.controller('feedController', ['$scope', '$http' ,function($scope, $http) {

    sortByNewest();

    function sortByNewest() {
        $http.get('/instrumentals/newest')
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
                sortByNewest();
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };

    $scope.purchaseInstrumental = function (id) {
        $http.put('/instrumentals/' + id + '/purchases')
            .success(function (data) {
                console.log(data);
                sortByNewest();
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };

}]);

