var config = {
    port: 14320,
    api: '/v1',
    galleryRoot: process.env.GALLERY_ROOT ? process.env.GALLERY_ROOT : './gallery',
    thumbsDir: 'thumbs',
    galleryEntryPoint: '/images',


    authentication: {
        enabled: false,
        secretKey: 'secretKey',
        expiresIn: 60*60*24,

    }
};

module.exports = config;