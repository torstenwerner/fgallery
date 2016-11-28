(function() {
    'use strict';
    
    var galleryController = function($scope, GalleryService, $mdSidenav, $mdPanel) {
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

        $scope.getBackgroundImage = function(path) {
            return {
                'background-image': 'url(\"' + path + '\")',
                'background-repeat': 'no-repeat',
                'background-size': '100% auto'                
            }
        }

        $scope.showPanel = function(file) {
            $mdPanel.open({
                attachTo: angular.element(document.body),
                controller: 'PanelController',
                controllerAs: 'ctrl',
                disableParentScroll: true,
                templateUrl: 'views/panel.html',
                hasBackdrop: true,
                panelClass: 'photo-panel',
                position: $mdPanel.newPanelPosition().absolute().center(),
                trapFocus: true,
                zIndex: 150,
                clickOutsideToClose: false, // will enable it, just have to figure out why sometimes it doesn't work
                escapeToClose: true,
                focusOnOpen: true,
                fileObject: file
            });
        }
    };
    
    angular.module('fgallery-controllers').controller(
        'GalleryController',
        [ '$scope', 'GalleryService', '$mdSidenav', '$mdPanel', galleryController ]
    );
})();