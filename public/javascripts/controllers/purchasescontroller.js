var app = angular.module('InstrumApp');

app.controller('purchasesController', ['$scope', '$http' ,function($scope, $http) {

    sortByPurchases();

    function sortByPurchases() {
        $http.get('/instrumentals/mostpurchased')
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
                sortByPurchases();
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };

    $scope.purchaseInstrumental = function (id) {
        $http.put('/instrumentals/' + id + '/purchases')
            .success(function (data) {
                console.log(data);
                sortByPurchases();
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };

}]);