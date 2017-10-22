var app = angular.module('InstrumApp');

app.controller('likesController', ['$scope', '$http' ,function($scope, $http) {

    sortByLikes();

    function sortByLikes() {
        $http.get('/instrumentals/mostliked')
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
                sortByLikes();
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };

    $scope.purchaseInstrumental = function (id) {
        $http.put('/instrumentals/' + id + '/purchases')
            .success(function (data) {
                console.log(data);
                sortByLikes();
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };

}]);