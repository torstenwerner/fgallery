(function() {
    'use strict';
    
    var services = angular.module('fgallery-services', []);
    var controllers = angular.module('fgallery-controllers', ['ngMaterial', 'fgallery-services']);
    var app = angular.module('fgallery', ['ngMaterial', 'fgallery-controllers']);
    
    app.config(['$mdThemingProvider', function($mdThemingProvider) {
       $mdThemingProvider.theme('default')
                .primaryPalette('teal') // teal
                .accentPalette('orange') // orange
                .warnPalette('red'); 
    }]);
})();