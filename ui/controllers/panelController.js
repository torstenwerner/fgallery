(function() {
    'use strict';

    var panelController = function(mdPanelRef) {
        this.mdPanelRef = mdPanelRef;
        this.file = mdPanelRef.config.fileObject;

        this.close = function() {
            mdPanelRef.close();
            mdPanelRef.destroy();
        }

        this.open = function(image) {
            window.open(image);
        }
    };
    
    angular.module('fgallery-controllers').controller(
        'PanelController',
        [ 'mdPanelRef', panelController ]
    );
})();