function Gallery() {
    var _gallery = this;
    
    var configuration = require('./config');
    var fs = require('fs');
    var path = require('path');
    var webm = require('./WebmUtils');
    var webmConverter = new webm();

    var image = require('./ImagesUtils');
    var imageConverter = new image();

    _gallery.buildList = function(dir, files) {
        var ret = [];
        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            var fullPath = dir + '/' + file;
            var thumbnailer;
            switch (path.extname(file)) {
                case '.webm':
                case '.mp4':
                    thumbnailer = webmConverter.getWebmThumbnail;
                    break;
                default:
                    thumbnailer = imageConverter.getImageThumbnail;
            }
                
                ret.push({
                            name: path.join(fullPath),
                            thumb: thumbnailer(fullPath)
                });
            }
        
        return ret;
    }
    
    return {
        list: function(req, res) {
            var requestedDirectory = req.params.directory || '';
            var basedir = path.join(configuration.galleryRoot, requestedDirectory);
            
            var files = fs.readdirSync(basedir).filter(function(file) {
                return !fs.statSync(path.join(basedir, file)).isDirectory();
            });
            
            res.setHeader('Content-Type', 'application/json');
            var response = {
                files: _gallery.buildList(basedir, files)
            };
            res.json(response.files);
        }
    }
}

module.exports = Gallery;