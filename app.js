var configuration = require('./config');
var gm = new require('./gallery');
var gallery = new gm();
var express = require('express');

(function Api () {
    var app = express();
    var router = express.Router();
        
    app.use(configuration.api, router);
    app.use('/', express.static(app.settings.env === "production" ? "www" : "ui"));
    app.use(configuration.galleryEntryPoint, express.static(configuration.galleryRoot));
    
    router
    .route('/list')
    .get(gallery.list);
           
    router
    .route('/list/:directory')
    .get(gallery.list);
    
    router
    .route('/directories')
    .get(gallery.listDirectories);

    module.exports = app;
    
})();