app.controller("DropDownController", ["$scope",'$http', function ($scope,$http) {
    $http.get("/search.json").then(function (response) {
        $scope.Nationalities = response.data.Response.nationalities;
    });
 $scope.filter = function (text) {

 }

}]);