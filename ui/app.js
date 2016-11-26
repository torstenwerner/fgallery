(function () {
    'use strict';

    var services = angular.module('fgallery-services', []);
    var controllers = angular.module('fgallery-controllers', ['ngMaterial', 'fgallery-services']);
    var app = angular.module('fgallery', ['ngMaterial', 'ngRoute', 'ngStorage', 'fgallery-controllers']);

    app.config(['$mdThemingProvider', function ($mdThemingProvider) {
        $mdThemingProvider.theme('default')
            .primaryPalette('teal') // teal
            .accentPalette('orange') // orange
            .warnPalette('red');
    }]);

    app.config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {
        $routeProvider.
        when('/login', {
            templateUrl: 'views/login.html',
            controller: 'LoginController'
        }).
        when('/', {
            templateUrl: 'views/index.html',
            controller: 'GalleryController'
        }).
        otherwise({
            redirectTo: '/'
        });

        $httpProvider.interceptors.push(['$q', '$location', '$localStorage', function ($q, $location, $localStorage) {
            return {
                'request': function (config) {
                    config.headers = config.headers || {};
                    if ($localStorage.token) {
                        config.headers.authorization = $localStorage.token;
                    }
                    return config;
                },
                'responseError': function (response) {
                    if (response.status === 401) {
                        $location.path('/login');
                    }
                    return $q.reject(response);
                }
            };
        }]);
    }]);
})();