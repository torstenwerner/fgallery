function Gallery() {
    var _gallery = this;
    
    var configuration = require('./config');
    var fs = require('fs');
    var path = require('path');
    
    _gallery.buildThumbPath = function(dir, fullPath) {
        var extension = path.extname(fullPath);
        var fileName = path.basename(fullPath, extension);

        return path.join(dir, configuration.thumbsDir, extension.replace('.', ''), fileName + ".jpg");
    }

    _gallery.buildList = function(dir, files) {
        var ret = [];
        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            var fullPath = dir + '/' + file;
                
            ret.push({
                        name: path.join(fullPath),
                        thumb: _gallery.buildThumbPath(dir, fullPath)
            });
        }
        
        return ret;
    }
    
    return {
        list: function(req, res) {
            var requestedDirectory = req.params.directory || '';
            console.log (requestedDirectory);
            var basedir = path.join(configuration.galleryRoot, requestedDirectory);
            
            var files = fs.readdirSync(basedir).filter(function(file) {
                return !fs.statSync(path.join(basedir, file)).isDirectory();
            });
            
            console.log(files);
            
            res.setHeader('Content-Type', 'application/json');
            var response = {
                files: _gallery.buildList(basedir, files)
            };
            res.json(response.files);
        }
    }
}

module.exports = Gallery;