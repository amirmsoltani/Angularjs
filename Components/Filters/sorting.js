app.component('sorting', {
    transclude: true,
    template: "<input type='button' value='sort by {{$ctrl.by}}' ng-click='$ctrl.change()'/>",
    controller: function () {
        this.sorting = [];
        this.process = function () {
            const hotels = angular.copy(this.hotels);
            const len = hotels.length;
            for (let i = 0; i < len; i++) {
                for (let j = 0; j < len - 1 - i; j++) {
                    if (parseInt(hotels[j][this.by]) > parseInt(hotels[j + 1][this.by])) {
                        let a = hotels[j];
                        hotels[j] = hotels[j + 1];
                        hotels[j + 1] = a;
                    }
                }
                this.sorting.push(hotels[hotels.length - 1 - i].i);
            }
        };
        this.change = function (key) {
            if (this.sorting.length > 1)
                this.sorting.reverse();
            else
                this.process();
            this.updateFilters('sorting', this.sorting);
        }


    },
    bindings: {
        hotels: '=',
        updateFilters: '=',
        by: "@"
    }

});