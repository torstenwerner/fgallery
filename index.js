var configuration = require('./config');
var server = require('./app');
const fs = require('fs');
const spawn = require('child_process').spawn;

server.listen(configuration.port, function () {
        const url = 'http://localhost:' + configuration.port;
        console.log('Running on ' + url);

        const chromeOnMac = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
        const chromium = '/usr/bin/chromium-browser';

        if (fs.existsSync(chromeOnMac)) {
                spawn(chromeOnMac, [url]);
        } else if (fs.existsSync(chromium)) {
                spawn(chromium, [url]);
	}
});
