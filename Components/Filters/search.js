app.component("search", {
  transclude: true,
  template:
    "<input ng-model='$ctrl.search' type='text' placeholder='{{$ctrl.placeholder}}' class='filters__search-box' ng-change='$ctrl.change()'/>",
  controller: function () {
    this.search = "";
    Hotels = [];
    this.onChanges = function (items) {
      if (
        items.filters &&
        !this.filters.search && 
        this.search.length > 1
      ) {
        this.search = "";
        this.change();
      }
    };
    this.change = function () {
      Hotels = [];
      for (let i = 0; i < this.hotels.length; i++)
        if (this.hotels[i][this.by].indexOf(this.search) + 1)
          Hotels.push(this.hotels[i].i);
      this.updateFilters("search", Hotels);
      this.changeActives({ key: "search", value: this.actives });
    };
  },
  bindings: {
    placeholder: "@",
    hotels: "=",
    by:'@',
    updateFilters: "=",
    changeActives: "&",
    filters: "<",
  },
});
