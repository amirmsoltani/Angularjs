app.controller("WsafarController", ["$scope", "$http", function ($scope, $http) {

    $scope.name = '';
    $scope.starRate = '10';

    function classify(hotels) {
        const regex = /(all\sinclusive|half\sboard|full\sboard|breakfast|room\sonly)/g;
        let boardTypes = {other: 0};
        const star = {};
        const location = {};
        const price = {max: hotels[0].priceToman, min: hotels[0].priceToman};
        angular.forEach(hotels, function (hotel) {
            if (hotel.starRate !== "")
                star[parseInt(hotel.starRate)] = 0;
            hotel.boardTypesmatch = hotel.boardTypes.join('').toLowerCase().match(regex);
            angular.forEach(hotel.boardTypesmatch, function (boardtype) {
                boardTypes[boardtype] = 0;
            });
            location[hotel.neighbourhood] = 0;
            price.min = Math.min(price.min, hotel.priceToman);
            price.max = Math.max(price.max, hotel.priceToman);
        });
        return {star: star, location: location, price: price, boardTypes: boardTypes};

    };

    function getNumber(hotels) {
        let classify = {};
        angular.copy($scope.classify, classify);
        classify.price = {max: hotels[0].priceToman, min: hotels[0].priceToman};
        angular.forEach(hotels, function (hotel) {
            classify.price.min = Math.min(classify.price.min, hotel.priceToman);
            classify.price.max = Math.max(classify.price.max, hotel.priceToman);
            classify.location[hotel.neighbourhood] += 1;
            let other = true;
            angular.forEach(Object.keys(classify.boardTypes), function (boardtype) {
                if (hotel.boardTypesmatch && hotel.boardTypesmatch.indexOf(boardtype) + 1) {
                    classify.boardTypes[boardtype] += 1;
                    other = false;
                }
            });
            if (other)
                classify.boardTypes.other += 1;
            if (hotel.starRate !== "")
                classify.star[parseInt(hotel.starRate)] += 1;
        });
        return classify;
    }

    $http.get('/json/wsafar.json').then(
        function (result) {
            $scope.hotels = result.data.result.hotels;
            $scope.classify = classify($scope.hotels);

            $scope.All = [];
            angular.copy($scope.hotels, $scope.All);
            $scope.numbers = getNumber($scope.hotels);
            console.log($scope.numbers);

        }
    );
    $scope.setNew = function (hotels) {
        $scope.All = hotels;
        $scope.numbers = getNumber($scope.All);
    }


}]);