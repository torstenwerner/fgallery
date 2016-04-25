var configuration = require('./config');
var gm = new require('./Gallery');
var gallery = new gm();
var express = require('express');

(function Api () {
    var app = express();
    var router = express.Router();
        
    app.use(configuration.api, router);
    app.listen(configuration.port, function () {
        console.log('Running on port '+ configuration.port);
    });
    
    router
    .route('/list')
    .get(gallery.list);
           
    router
    .route('/list/:directory')
    .get(gallery.list);
    
})();