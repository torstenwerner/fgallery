const config = require('./config');
const path = require('path');
const fs = require('fs');
const timers = require('timers');
const im = require('imagemagick');
const mkdirp = require('mkdirp');

let imInstances = 0;
let imQueue = [];

function enqueueIm(taskArray) {
    if (imInstances == 0) {
        imInstances ++;
        console.log('start immediatly', taskArray);
        timers.setImmediate(im.convert, taskArray, imCallback);
    } else {
        imQueue.push(taskArray);
    }
}

function imCallback(err, stdout) {
    console.log('finished');
    imInstances --;
    if (imInstances == 0 && imQueue.length > 0) {
        const taskArray = imQueue.shift();
        imInstances ++;
        console.log('start delayed', taskArray);
        timers.setImmediate(im.convert, taskArray, imCallback);
    }
    if (err) throw err;
}

function mkdirpCallback(err) {
    if (err) throw err;
}

function createThumbnail(absoluteImage, absoluteThumb) {
    const dirname = path.dirname(absoluteThumb);
    mkdirp(dirname, mkdirpCallback);
    enqueueIm([absoluteImage, '-resize', '120x120', absoluteThumb]);
}

/**
 * Check if the thumbnail exists and create it asynchronously if missing.
 */
function checkOrCreateThumbnail(relative, thumbPath) {
    const absoluteThumb = path.join(config.galleryRoot, thumbPath);
    if (!fs.existsSync(absoluteThumb)) {
        const absoluteImage = path.join(config.galleryRoot, relative);
        createThumbnail(absoluteImage, absoluteThumb);
    }
}

function createScaledImage(imageAbsolute, scaledImageAbsolute, noScaledImageAbsolute) {
    im.identify(imageAbsolute, function(err, features) {
        if (err) throw err;
        if (features.width > 2 * 1920 || features.height > 2 * 1080) {
            const dirname = path.dirname(scaledImageAbsolute);
            mkdirp(dirname, mkdirpCallback);
            enqueueIm([imageAbsolute, '-resize', '50%', scaledImageAbsolute]);
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

    createScaledImage(imageAbsolute, scaledImageAbsolute, noScaledImageAbsolute);

    return relative;
}

module.exports = {
    checkOrCreateThumbnail,
    getRelativeImagePath
}
