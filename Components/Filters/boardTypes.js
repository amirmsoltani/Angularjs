app.component('boardTypeFilter', {
    transclude: true,
    template: "<div><input  ng-repeat='(key,boardType) in $ctrl.boardTypes' type='button' ng-click='$ctrl.change(key)' value='{{key+\"-\"+boardType.length}}' /></div>",
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
                list = union(this.parentBoardTypes[this.actives[i]], list);

            this.updateFilters('boardTypes', list);
        }


    },
    bindings: {
        boardTypes: '<',
        parentBoardTypes: '=',
        hotels: '=',
        updateFilters: '=',
    }

});