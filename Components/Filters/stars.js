app.component("starFilter", {
  transclude: true,
  template:
    "<div><input  ng-repeat='(key,star) in $ctrl.stars' type='button' ng-click='$ctrl.change(key)' value='{{key+\"-\"+star.length}}' /></div>",
  controller: function () {
    this.actives = [];
    this.onChanges = function (items) {
      if (
        items.filters &&
        this.filters.stars &&
        this.filters.stars.length !== this.actives.stars.length
      ) {
          for(let i = 0;i<this.actives.length;i++)
          {
              if(!this.filters.indexOf(this.actives[i])+1)
              {
                  this.change(this.actives[i]);
                  break;
              }
          }
      }
    };
    this.change = function (key) {
      const active = this.actives.indexOf(key);
      if (active + 1) this.actives.splice(active, 1);
      else this.actives.push(key);

      let list = [];
      for (let i = 0; i < this.actives.length; i++)
        list = union(this.parentStars[this.actives[i]], list);

      this.updateFilters("stars", list);
    };
  },
  bindings: {
    stars: "<",
    parentStars: "=",
    hotels: "=",
    updateFilters: "=",
    filters: "<",
  },
});
