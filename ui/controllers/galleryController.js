(function() {
    'use strict';
    
    var galleryController = function($scope, GalleryService, $mdSidenav) {
        $scope.currentDir = "";
        $scope.currentFilter = "";
        $scope.loading = false;

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
                $scope.loading = false;
            });
            
            $scope.files = null;
            $scope.loading = true;
            $mdSidenav('left').toggle();
        }
        
        $scope.open = function(image) {
            window.open(image);
        }

        $scope.getBackgroundImage = function(path) {
            return {
                'background-image': 'url(\"' + path + '\")',
                'background-repeat': 'no-repeat',
                'background-size': '100% auto'                
            }
        }
    };
    
    angular.module('fgallery-controllers').controller(
        'GalleryController',
        [ '$scope', 'GalleryService', '$mdSidenav', galleryController ]
    );
})();