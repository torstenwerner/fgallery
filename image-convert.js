const config = require('./config');
const path = require('path');
const fs = require('fs');
const timers = require('timers');
const im = require('imagemagick');
const mkdirp = require('mkdirp');

function imCallback(err, stdout) {
    if (err) throw err;
}

function mkdirpCallback(err) {
    if (err) throw err;
}

function createThumbnail(absoluteImage, absoluteThumb) {
    const dirname = path.dirname(absoluteThumb);
    mkdirp(dirname, mkdirpCallback);
    im.convert([absoluteImage, '-resize', '120x120', absoluteThumb], imCallback);
}

function checkOrCreateThumbnail(relative, thumbPath) {
    const absoluteImage = path.join(config.galleryRoot, relative);
    const absoluteThumb = path.join(config.galleryRoot, thumbPath);
    if (!fs.existsSync(absoluteThumb)) {
        timers.setImmediate(createThumbnail, absoluteImage, absoluteThumb);
    }
}

module.exports = {
    checkOrCreateThumbnail
}
