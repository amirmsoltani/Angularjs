const name = "components.costumeDropdown";
const costumeDropDown = angular.module(name, []);
costumeDropDown.controller('costumeDropDown', function ($scope) {

    const ctrl = this;
    ctrl.show = false;
    ctrl.leave = true;
    ctrl.pointer = -1;
    ctrl.input = '';
    ctrl.mainId = 'main' + Math.floor(Math.random() * 0xffff).toString();
    this.removeListen = function () {
        ctrl.show = false;
        window.removeEventListener('click', ctrl.click);
        window.removeEventListener('keydown', ctrl.keyDown);
        $scope.$apply();
    };
    this.focus = function () {
        ctrl.show = true;
        window.addEventListener('click', ctrl.click);
        window.addEventListener('keydown', ctrl.keyDown);
    };
    this.click = function () {
        if (ctrl.leave)
            ctrl.removeListen();
    };
    this.changeScroll = function () {
        const main = document.getElementById(ctrl.mainId);
        main.scroll(0, 100);
    };
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
                ctrl.input = ctrl.objects[ctrl.pointer][ctrl.view];
                ctrl.pointer = -1;
                ctrl.onSelect({obj: ctrl.objects[ctrl.pointer]});
                ctrl.removeListen();

        }
    };


});
costumeDropDown.component('costumeDropDown', {
    templateUrl: "/Components/CostumeDropDown/index.html",
    controller: 'costumeDropDown',
    bindings: {
        class: '@?',
        name: '@?',
        objects: '<',
        icons: '@?',
        view: '@?',
        onSelect: "&"
    }
});
