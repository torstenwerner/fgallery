var configuration = require('./config');
var gm = new require('./gallery');
var gallery = new gm();
var authentication = new require('./auth');
var auth = new authentication();
var express = require('express');
var bodyParser = require('body-parser');

(function Api () {
    var app = express();
    var router = express.Router();
    app.use('/', express.static(app.settings.env === "production" ? "www" : "ui"));
    app.use('/node_modules', express.static("node_modules"));
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(configuration.api, router);
    app.use(configuration.galleryEntryPoint, express.static(configuration.galleryRoot));
    
    // NOT AUTHENTICATED ROUTES
    router
    .route('/auth')
    .post(auth.authenticate);

    if (configuration.authentication.enabled) {
        router.use(auth.checkAuthentication);
    }

    // AUTHENTICATED ROUTES
    
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