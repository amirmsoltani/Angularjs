app.controller("WsafarController", ["$scope", "$http", function ($scope, $http) {

    $http.get('/json/wsafar.json').then(function (result) {
        $scope.parentSerialize =  serialize(result.data.result.hotels);
        $scope.childSerialize =  $scope.parentSerialize;
        $scope.hotels = result.data.result.hotels;
        serializeByIndex($scope.hotels,$scope.childSerialize,{stars:[10,20,30,40,50,60,70,80,90,100]})
    })


}]);