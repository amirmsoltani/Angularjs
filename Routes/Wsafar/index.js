app.controller("WsafarController", ["$scope", "$http", function ($scope, $http) {
    $scope.fill = {};
    $scope.filters = {};
    $http.get('/json/wsafar.json').then(function (result) {
        $scope.hotels = result.data.result.hotels;
        const data = serialize($scope.hotels);
        $scope.parentSerialize = data[1];
        $scope.objects = [data[0]];
        $scope.childSerialize = $scope.parentSerialize;
    });
    $scope.updateFilters = function (name, list) {
        if (list.length === 0) {
            delete $scope.filters[name];
            if (Object.keys($scope.filters).length < 1) {
                $scope.childSerialize = $scope.parentSerialize;
                $scope.objects.splice(1, 1);
                return ;
            }
        } else
            $scope.filters[name] = list;
        const data = serializeByIndex($scope.hotels, $scope.parentSerialize, $scope.filters);
        $scope.childSerialize = data[1];
        $scope.objects[1] = data[0];
        console.log($scope.filters);

    }

}]);