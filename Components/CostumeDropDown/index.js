const name = "components.costumeDropdown";
const costumeDropDown = angular.module(name, []);
costumeDropDown.controller('costumeDropDown', function ($scope) {

    const ctrl = this;
    ctrl.show = false;
    ctrl.leave = true;
    ctrl.pointer = -1;
    ctrl.input = '';
    ctrl.mainId = 'main' + Math.floor(Math.random() * 0xffff).toString();
    this.removeListen = function (a) {
        ctrl.show = false;
        window.removeEventListener('click', ctrl.click);
        window.removeEventListener('keydown', ctrl.keyDown);
        if (!a)
            $scope.$apply();
    };
    //user focus text box
    this.focus = function () {
        ctrl.show = true;
        window.addEventListener('click', ctrl.click);
        window.addEventListener('keydown', ctrl.keyDown);
    };
    // user click object
    this.click = function () {
        if (ctrl.leave)
            ctrl.removeListen();
    };
    // use keyboard arrow change scroll position
    this.changeScroll = function () {
        const main = document.getElementById(ctrl.mainId);
        const element = main.children[ctrl.pointer];
        main.scroll(0, element.offsetTop);
    };
    // on select object
    this.select = function (index) {
        ctrl.input = ctrl.getView(ctrl.objects[index ? index : ctrl.pointer]);
        ctrl.onSelect({obj: ctrl.objects[index ? index : ctrl.pointer]});
        ctrl.pointer = -1;
    };
    //user use keyboard get keyCode and process
    this.keyDown = function (e) {
        switch (e.keyCode) {
            case 9:
                ctrl.show = false;
                $scope.$apply();
                break;
            case 38:
                if (ctrl.pointer <= 0)
                    ctrl.pointer = ctrl.objects.length - 1;
                else
                    ctrl.pointer -= 1;
                ctrl.changeScroll();
                $scope.$apply();
                break;
            case 40:
                if (ctrl.pointer >= ctrl.objects.length - 1)
                    ctrl.pointer = 0;
                else
                    ctrl.pointer += 1;
                ctrl.changeScroll();
                $scope.$apply();
                break;
            case  13:
                ctrl.select();
                ctrl.removeListen();

        }
    };
    //on change text in text box with user
    this.change = function () {
        if (this.minActive && parseInt(this.minActive) <= this.input.length)
            this.onChange({text: this.input});
        else if (!this.minActive)
            this.onChange({text: this.input});

    };
    //watch all input objects on change  reset options
    $scope.$watchCollection(function () {
            return ctrl.objects
        },
        function (newValue, oldValue) {
            ctrl.pointer = 0;
        });


});
costumeDropDown.component('costumeDropDown', {
    templateUrl: "/Components/CostumeDropDown/index.html",
    controller: 'costumeDropDown',
    bindings: {
        inputClass: '@?',
        inputName: '@',
        inputId:'@',
        objects: '<',
        iconTypes: "@",
        icons: '@',
        imageRoot: '@',
        imageType: '@',
        viewName: '@',
        getView: '=',
        group: '@',
        onSelect: "&",
        onChange: '&',
        minActive: "=?",
    }
});
