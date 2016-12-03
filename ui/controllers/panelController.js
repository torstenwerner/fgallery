(function() {
    'use strict';

    var panelController = function(mdPanelRef) {
        this.mdPanelRef = mdPanelRef;
        this.file = mdPanelRef.config.fileObject;

        const filename = this.file.name;
        const lastSlashPos = filename.lastIndexOf('/');
        this.nameonly = lastSlashPos >= 0 ? filename.substring(lastSlashPos + 1, filename.length) : filename;

        this.close = function() {
            mdPanelRef.close();
            mdPanelRef.destroy();
        }

        this.navigate = function(file) {
            this.close();
            mdPanelRef.config.showPanel(file);
        }
    };
    
    angular.module('fgallery-controllers').controller(
        'PanelController',
        [ 'mdPanelRef', panelController ]
    );
})();