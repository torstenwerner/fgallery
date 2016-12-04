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

/**
 * Check if the thumbnail exists and create it asynchronously if missing.
 */
function checkOrCreateThumbnail(relative, thumbPath) {
    const absoluteThumb = path.join(config.galleryRoot, thumbPath);
    if (!fs.existsSync(absoluteThumb)) {
        const absoluteImage = path.join(config.galleryRoot, relative);
        timers.setImmediate(createThumbnail, absoluteImage, absoluteThumb);
    }
}

function createScaledImage(imageAbsolute, scaledImageAbsolute, noScaledImageAbsolute) {
    console.log(imageAbsolute, scaledImageAbsolute, noScaledImageAbsolute);
    im.identify(imageAbsolute, function(err, features) {
        if (err) throw err;
        if (features.width > 2 * 1920 || features.height > 2 * 1080) {
            const dirname = path.dirname(scaledImageAbsolute);
            mkdirp(dirname, mkdirpCallback);
            im.convert([imageAbsolute, '-resize', '50%', scaledImageAbsolute], imCallback);
        } else {
            const dirname = path.dirname(noScaledImageAbsolute);
            mkdirp(dirname, mkdirpCallback);
            fs.createWriteStream(noScaledImageAbsolute);
        }
    });
}

function getRelativeImagePath(relative) {
    const basenameImage = path.basename(relative);
    const dirnameImage = path.dirname(relative);

    const scaledImage = path.join(dirnameImage, 'scaled', basenameImage);
    const noScaledImage = path.join(dirnameImage, 'no-scaled', basenameImage);

    const imageAbsolute = path.join(config.galleryRoot, relative);
    const scaledImageAbsolute = path.join(config.galleryRoot, scaledImage);
    const noScaledImageAbsolute = path.join(config.galleryRoot, noScaledImage);

    if (fs.existsSync(scaledImageAbsolute)) {
        return scaledImage;
    }
    if (fs.existsSync(noScaledImageAbsolute)) {
        return relative;
    }

    timers.setImmediate(createScaledImage, imageAbsolute, scaledImageAbsolute, noScaledImageAbsolute);

    return relative;
}

module.exports = {
    checkOrCreateThumbnail,
    getRelativeImagePath
}
