app.component('starFilter', {
    transclude: true,
    templateUrl: 'Components/Filters/index.html',
    controller: function () {
        this.action = function (element, data) {
            const list = [];
            console.log(element, 1);
            angular.forEach(this.hotels, function (hotel) {
                if (hotel.starRate === element.key)
                    list.push(hotel)
            });
            this.newHotels(list);
        }
    },
    bindings: {
        stars: '<',
        hotels: '=',
        newHotels: '=',
    }

});