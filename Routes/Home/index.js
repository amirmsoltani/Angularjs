app.controller("HomeController", ["$scope", function ($scope) {
    $scope.celender = true;
    $scope.months = [moment('2020/1/1', "YYYY/MM/DD"), moment('2020/1/12', "YYYY/MM/DD")];
    $scope.select = function (first, end) {
        console.log(first, end);
        $scope.months = [first, end];
    };
    $scope.c = function () {
        $scope.months[1] = moment(`2020/1/${$scope.n}`, 'YYYY/MM/DD');
        console.log($scope.n);
    };

}]);