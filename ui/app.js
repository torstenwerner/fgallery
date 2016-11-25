(function() {
    'use strict';
    
    var services = angular.module('fgallery-services', []);
    var controllers = angular.module('fgallery-controllers', ['ngMaterial', 'fgallery-services']);
    var app = angular.module('fgallery', ['ngMaterial', 'ngRoute', 'fgallery-controllers']);
    
    app.config(['$mdThemingProvider', function($mdThemingProvider) {
       $mdThemingProvider.theme('default')
                .primaryPalette('teal') // teal
                .accentPalette('orange') // orange
                .warnPalette('red'); 
    }]);

    app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.
            when('/login', {
                templateUrl: 'views/login.html',
                controller: 'GalleryController'
            }).
            when('/', {
                templateUrl: 'views/index.html',
                controller: 'GalleryController'
            }).
            otherwise({
                redirectTo: '/'
            });
    }]);
})();