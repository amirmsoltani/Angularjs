app.component('locationFilter', {
    transclude: true,
    template: "<div><input  ng-repeat='(key,location) in $ctrl.locations' type='button' ng-click='$ctrl.change(key)' value='{{key+\"-\"+location.length}}' /></div>",
    controller: function () {
        this.actives = [];
        this.change = function (key) {
            const active = this.actives.indexOf(key);
            if (active + 1)
                this.actives.splice(active, 1);
            else
                this.actives.push(key);

            let list = [];
            for (let i = 0; i < this.actives.length; i++)
                list = union(this.parentLocations[this.actives[i]], list);

            this.updateFilters('Locations', list);
        }


    },
    bindings: {
        locations: '<',
        parentLocations: '=',
        hotels: '=',
        updateFilters: '=',
    }

});