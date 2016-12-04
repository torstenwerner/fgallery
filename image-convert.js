const config = require('./config');
const path = require('path');
const fs = require('fs');
const timers = require('timers');
const im = require('imagemagick');
const mkdirp = require('mkdirp');

let convertInstances = 0;
let convertQueue = [];

function enqueueIm(taskArray) {
    if (convertInstances == 0) {
        convertInstances ++;
        timers.setImmediate(im.convert, taskArray, imCallback);
    } else {
        convertQueue.push(taskArray);
    }
}

function imCallback(err, stdout) {
    convertInstances --;
    if (convertInstances == 0 && convertQueue.length > 0) {
        const taskArray = convertQueue.shift();
        convertInstances ++;
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

let identifyInstances = 0;
let identifyQueue = [];

function createScaledImage(imageAbsolute, scaledImageAbsolute, noScaledImageAbsolute) {
    if (identifyInstances == 0) {
        identifyInstances ++;
        im.identify(imageAbsolute, function(err, features) {
            identifyInstances --;
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
            if (identifyQueue.length > 0) {
                const task = identifyQueue.shift();
                createScaledImage(task[0], task[1], task[2]);
            }
        });
    } else {
        identifyQueue.push([imageAbsolute, scaledImageAbsolute, noScaledImageAbsolute]);
    }
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
