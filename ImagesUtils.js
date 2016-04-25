function ImagesUtils() {
    var frameParam = '[1]';
    
    var im = require('imagemagick');
    var path = require('path');
    var fs = require('fs');
    
    return {
        getImageThumbnail: function(fileName) {
            var extension = path.extname(fileName).replace('.', '');
            var destination = path.join(path.dirname(fileName), 'thumbs', extension);
            var resultPath = path.join(destination, path.basename(fileName, '.' + extension) + '.jpg');
            
            console.log(fileName);
            console.log(destination);
            if (!fs.existsSync(resultPath)) {
                if (!fs.existsSync(destination)) {
                    fs.mkdirSync(destination);
                }
                
                var options = {
                  srcPath: fileName + frameParam,
                  dstPath: resultPath,
                  width: 200,
                  format: 'jpg'
                };
                
                im.resize(options, function(err, stdout, stderr) {
                    if (err) console.log(err);
                    console.log(stdout);
                })
            };
            
            return resultPath;
        }
    }
}

module.exports = ImagesUtils;