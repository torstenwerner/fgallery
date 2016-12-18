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

        var shutdown = function() {
            return $http
                .post('/v1/shutdown');
        }

        const sound = new Howl({
            src: 'audio/LukHash-the_other_side.mp3',
            autoplay: true,
            loop: true
        });
        sound.play();

        return {
            getAvailableGalleries: getAvailableGalleries,
            getFiles: getFiles,
            shutdown,
            soundPlay: angular.bind(sound, sound.play),
            soundPause: angular.bind(sound, sound.pause),
            soundVolume: angular.bind(sound, sound.volume)
        }
    };
    
    angular.module('fgallery-services').service(
        'GalleryService',
        [ '$http', galleryService ]
    );
})();