app.controller("DropDownController", ["$scope", '$http', function ($scope, $http) {
    $http.get("/search.json").then(function (response) {
        $scope.Nationalities = response.data.Response.nationalities;
    });
    $http.get("/s.json").then(function (response) {
        $scope.dec = response.data;
    });
    $scope.view = function (obj) {
        return obj.CountryName;
    };
    $scope.filter = function (text) {
        $scope.objects = [];
        for (let i = 0; i < $scope.Nationalities.length; i++)
            if ($scope.Nationalities[i]['CountryName'].toLowerCase().indexOf(text) + 1)
                $scope.objects.push($scope.Nationalities[i]);

    };
    $scope.im = function (obj) {
        return obj.CityName + ', ' + obj.CountryCode;
    };
    $scope.l = function (obj) {
        console.log(obj);
    }
    $scope.items1 = [];

}]);