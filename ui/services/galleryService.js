(function() {
    'use strict';
    
    var galleryService = function($http) {
        //_galleryService = this;
        
        var getAvailableGalleries = function() {
            return $http.get('/v1/directories');
        }
        
        var getFiles = function(directory) {
            return $http.get('/v1/list/' + directory);
        }
        
        return {
            getAvailableGalleries: getAvailableGalleries,
            getFiles: getFiles
        }
    };
    
    angular.module('fgallery-services').service(
        'GalleryService',
        [ '$http', galleryService ]
    );
})();