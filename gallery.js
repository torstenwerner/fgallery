function Gallery() {
    var _gallery = this;
    
    var configuration = require('./config');
    var fs = require('fs');
    var path = require('path');
    
    _gallery.buildThumbPath = function(relative) {
        var extension = path.extname(relative);
        var fileName = path.basename(relative, extension);

        return path.join(path.dirname(relative), configuration.thumbsDir, extension.replace('.', ''), fileName + ".jpg");
    }

    _gallery.buildList = function(dir, files) {
        var ret = [];
        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            var fullPath = path.join(dir, file);
            
            var relative = fullPath.substring(configuration.galleryRoot.length-1);
            
            var type;
            switch (path.extname(file).replace('.', '')) {
                case 'webm':
                case 'mp4':
                case 'gif':
                case 'avi':
                    type = 'video';
                    break;
                default:
                    type = 'image';
                    break;
            }
            
            ret.push({
                        name: path.join(configuration.galleryEntryPoint, path.join(relative)),
                        thumb: path.join(configuration.galleryEntryPoint, _gallery.buildThumbPath(relative)),
                        type: type
            });
        }
        
        return ret;
    }
    
    _gallery.buildDirectoriesList = function(dir) {
        var ret = [];
        var files = fs.readdirSync(dir).filter(function(file) {
                return fs.statSync(path.join(dir, file)).isDirectory() && file != configuration.thumbsDir;
            });

        for (var i = 0; i < files.length; i++) {
            var relative = path.join(dir, files[i]).substring(configuration.galleryRoot.length-1);
            ret.push({
                path: path.join(relative).replace('/', '%2F'),
                name: path.join(relative)
            });
            
            ret = ret.concat(_gallery.buildDirectoriesList(path.join(dir, files[i])));
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
            
            var response = {
                files: _gallery.buildList(basedir, files)
            };
            
            res.json(response.files);
        },
        
        listDirectories: function(req, res) {
            var response = {
              dirs: [{ path: '', name: '/'}].concat(_gallery.buildDirectoriesList(configuration.galleryRoot))
            };
            
            res.json(response.dirs);
        }
    }
}

module.exports = Gallery;