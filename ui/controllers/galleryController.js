(function() {
    'use strict';
    
    var galleryController = function($scope, GalleryService, $mdSidenav) {
        $scope.currentDir = "";

        GalleryService.getAvailableGalleries()
        .then(function(res) {
            $scope.galleries = res.data;
        });
        
        $scope.toggleNav = function() {
            $mdSidenav('left').toggle();
        }
        
        $scope.getFiles = function(dir) {
            GalleryService.getFiles(dir)
            .then(function(res) {
                $scope.files = res.data;
                $scope.currentDir = dir;
            });
        }
        
        $scope.open = function(image) {
            window.open(image);
        }
    };
    
    angular.module('fgallery-controllers').controller(
        'GalleryController',
        [ '$scope', 'GalleryService', '$mdSidenav', galleryController ]
    );
})();