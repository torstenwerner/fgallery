var configuration = require('./config');
var server = require('./app');
var spawn = require('child_process').spawn;

server.listen(configuration.port, function () {
        const url = 'http://localhost:' + configuration.port;
        console.log('Running on ' + url);
        spawn('open', [url]);
});