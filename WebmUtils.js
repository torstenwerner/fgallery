function WebmUtils() {
    var ffmpeg = require('ffmpeg');
    var path = require('path');
    var fs = require('fs');
    
    return {
        getWebmThumbnail: function(fileName) {
            var process = new ffmpeg(fileName);
            var extension = path.extname(fileName).replace('.', '');
            var destination = path.dirname(fileName) + '/thumbs' + '/' + extension;
            var resultPath = path.join(destination, path.basename(fileName, '.' + extension) + '_1' + '.jpg');
            
            if (!fs.existsSync(resultPath)) {                    
                process.then(function (video) {
                    video.fnExtractFrameToJPG(destination, {
                        frame_rate: 1,
                        number: 1,
                        file_name: fileName
                    }, function(error, files) {
                        if (!error)
                            console.log('Files ' + files);
                        return files;
                    }) 
                }, function(error) {
                        console.log('Error ' + error);
                });
             
            };
            
            return resultPath;
        }
    }
}

module.exports = WebmUtils;