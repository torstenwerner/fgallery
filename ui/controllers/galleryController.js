(function() {
    'use strict';
    
    var galleryController = function($scope, GalleryService, $mdSidenav, $mdPanel, $mdDialog, $timeout) {
        $scope.currentDir = "";
        $scope.currentFilter = "";
        $scope.loading = false;
        $scope.freshlyStarted = true;

        GalleryService.getAvailableGalleries()
        .then(function(res) {
            $scope.galleries = res.data;
        });
        
        $scope.toggleNav = function() {
            $mdSidenav('left').toggle();
        }

        // open sidenav on page loading
        $timeout(function() {
            $mdSidenav('left').open();
        });

        function preloadImage(file) {
            if (!file) {
                return;
            }
            $timeout(function() {
                const preloadNextImage = new Image();
                preloadNextImage.src = file.name;
            });
        }

        $scope.getFiles = function(dir) {
            GalleryService.getFiles(dir)
            .then(function(res) {
                $scope.files = res.data;
                $scope.currentDir = dir;
                $scope.loading = false;
                preloadImage($scope.files[0]);
            });
            
            $scope.files = null;
            $scope.loading = true;
            $mdSidenav('left').toggle();

            if ($scope.freshlyStarted) {
                // enable fullscreen on first click
                document.documentElement.webkitRequestFullscreen();
                $scope.freshlyStarted = false;
            }
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
                clickOutsideToClose: true, // will enable it, just have to figure out why sometimes it doesn't work
                escapeToClose: true,
                focusOnOpen: true,
                fileObject: file,
                showPanel: $scope.showPanel
            });
            preloadImage(file.next);
        }

        $scope.toggleFullscreen = function() {
            if (document.webkitIsFullScreen) {
                document.webkitExitFullscreen();
            } else {
                document.documentElement.webkitRequestFullscreen();
            }
        }

        $scope.shutdown = function() {
            const confirmationDialog = $mdDialog.confirm({
                title: 'Ausschalten',
                textContent: 'Soll das Gerät wirklich ausgeschaltet werden?',
                ok: 'Ja',
                cancel: 'Nein'
            })
            $mdDialog.show(confirmationDialog)
                .then(GalleryService.shutdown)
                .catch(() => null);
        }
    };
    
    angular.module('fgallery-controllers').controller(
        'GalleryController',
        [ '$scope', 'GalleryService', '$mdSidenav', '$mdPanel', '$mdDialog', '$timeout', galleryController ]
    );
})();