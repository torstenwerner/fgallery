(function() {
    'use strict';
    
    var galleryService = function($http) {
        //_galleryService = this;
        
        var getAvailableGalleries = function() {
            return $http.get('/v1/directories');
        }
        
        var getFiles = function(directory) {
            return $http
                .get('/v1/list/' + directory)
                .then(function(response) {
                    const fileList = response.data;
                    // add references to previous and next file
                    if (fileList.length > 1) {
                        for (let i = 0; i < fileList.length - 1; i ++) {
                            fileList[i].next = fileList[i + 1];
                            fileList[i + 1].prev = fileList[i];
                        }
                    }
                    return response;
                });
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