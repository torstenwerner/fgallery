var configuration = require('./config');
var server = require('./app');
const fs = require('fs');
const spawn = require('child_process').spawn;

server.listen(configuration.port, function () {
        const url = 'http://localhost:' + configuration.port;
        console.log('Running on ' + url);

        const chromeOnMac = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
        if (fs.existsSync(chromeOnMac)) {
                spawn(chromeOnMac, ['--start-fullscreen', url]);
        }
});