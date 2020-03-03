app.controller("HomeController", ["$scope", function ($scope) {
    $scope.months = ['2020/1/1', '2020/1/12'];
    $scope.select = function (first, end) {
        console.log(first, end);
        $scope.months = [first, end];
    };


}]);