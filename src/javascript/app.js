angular.module("app", ["ui.router"])
.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/");
    $stateProvider
        .state("Home", {
            url: "/",
            templateUrl: "templates/home.html"
        })
    $stateProvider
        .state("Cities", {
            url: "/cities",
            templateUrl: "templates/cities.html"
        })
})
.run(function() {
    jQuery(document).ready(function() {
        jQuery(".button-collapse").sideNav();
    })
})
