var config = {
    port: 14320,
    api: '/v1',
    galleryRoot: './gallery',
    thumbsDir: 'thumbs',
    galleryEntryPoint: '/images',


    authentication: {
        enabled: false,
        secretKey: 'secretKey',
        expiresIn: 60*60*24,

    }
};

module.exports = config;