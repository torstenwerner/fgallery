var config = {
    port: 14320,
    api: '/v1',
    galleryRoot: './gallery',
    thumbsDir: 'thumbs',
    galleryEntryPoint: '/images',


    authentication: {
        enabled: true,
        secretKey: 'secretKey',
        expiresIn: 60*60*24,

    }
};

module.exports = config;