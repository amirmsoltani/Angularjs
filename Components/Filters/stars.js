app.component('starFilter', {
    transclude: true,
    template: "<div></div>",
    controller: function () {

    },
    bindings: {
        stars: '<',
        hotels: '=',
        newHotels: '=',
    }

});