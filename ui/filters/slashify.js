(function() {
    'use strict';
    
    var slashify = function() {
        return function(input) {
            input = input || '';

            return input.replace(/(%2F)/g, ' > ').toLowerCase();
       }
    };
    
    angular.module('fgallery').filter(
        'slashify',
        [ slashify ]
    );
})();