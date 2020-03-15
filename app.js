const app = angular.module('App', ['ngRoute', 'ngAnimate',name]);

app.config(function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: "Routes/Home/index.html",
        controller: "HomeController",
    });
    $routeProvider.when('/wsafar', {
        templateUrl: "Routes/Wsafar/index.html",
        controller: "WsafarController",
    });
    $routeProvider.when('/dropdown', {
        templateUrl: "Routes/DropDown/index.html",
        controller: "DropDownController",
    });
});


