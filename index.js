var configuration = require('./config');
var server = require('./app');

server.listen(configuration.port, function () {
        console.log('Running on port '+ configuration.port);
});