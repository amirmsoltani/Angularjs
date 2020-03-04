const app = angular.module('App', ['ngRoute', 'ngAnimate']);

app.config(function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: "Routes/Home/index.html",
        controller: "HomeController",
    });
    $routeProvider.when('/wsafar', {
        templateUrl: "Routes/Wsafar/index.html",
        controller: "WsafarController",
    });
});


