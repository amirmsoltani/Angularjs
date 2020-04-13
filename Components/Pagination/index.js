app.component('pagination', {
    templateUrl: "/Components/Pagination/index.html",
    controller: function () {
        this.page = 1;
        this.pages = [];
        this.pagelen = 0;
        ctrl = this;
        this.$onChanges = function (items) {
            if ((items.list || items.itemsPerPage) && ctrl.list)
            {
                ctrl.changePage(ctrl.page);
                this.page = 1;
            }
        }
        this.change = function (select) {
            switch (select) {
                case 'first':
                    ctrl.changePage(1);
                    break;
                case 'last':
                    ctrl.changePage(Math.ceil(ctrl.list.length / ctrl.itemsPerPage));
                    break;
                case 'next':
                    ctrl.changePage(ctrl.page + 1);
                    break;
                case 'prev':
                    ctrl.changePage(ctrl.page - 1);
                    break;
                default:
                    ctrl.changePage(parseInt(select));
                    break;

            }

        };
        this.changePage = function (pageNumber) {
            ctrl.page = pageNumber;
            ctrl.pages = [];
            const pages = Math.ceil(ctrl.list.length / ctrl.itemsPerPage);
            this.pagelen = pages;
            let start = ctrl.page-Math.floor(ctrl.maxSize/2);
            start = start < 1?1:(pages-start<ctrl.maxSize?pages-ctrl.maxSize+1:start)
            for (let i = start, j = 1; i <= pages && j <= ctrl.maxSize; i++, j++)
                ctrl.pages.push(i)
            ctrl.onChange({ page: pageNumber, list: ctrl.list.slice((pageNumber-1)*ctrl.itemsPerPage, ctrl.itemsPerPage * pageNumber) })

        };
    },
    bindings: {
        firstText: '@?', //text first button if empty dont show this
        lastText: '@?', // text last button if empty dont show this
        nextText: '@?', // text next button text if empty dont show this
        prevText: '@?', // text prev button text if empty dont show this 
        itemsPerPage: '<?', //Maximum number of items per page (default 10) 
        maxSize: '=', //  Limit number for pagination size.
        list: '<', //list object for paginations (hotels)
        onChange: '&', // on page with client (page and list)
    }
});
