app.component('sorting', {
    transclude: true,
    template: "<input type='button' value='sort by {{$ctrl.by}}' ng-click='$ctrl.sorting()'/>",
    controller: function () {
        this.Sorting = [];
        this.sort = function () {
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
                this.Sorting.push(hotels[hotels.length - 1 - i].i);
            }
        };
        this.sorting = function () {
            this.Sorting = angular.copy(this.Sorting);
            if (this.Sorting.length > 1)
                this.Sorting.reverse();
            else
                this.sort();
            this.updateFilters('sorting', this.Sorting);
        };

    },
    bindings: {
        hotels: '=',
        updateFilters: '=',
        by: "@"
    },


});