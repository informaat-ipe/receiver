// parse the environment and configuration, start the server

// Parse the environment, create configuration
var config = require('./config.js');
var server = require('./sources/server.js');

server.set('x-powered-by', false);     // do not expose implementation details

server.listen( options.port );
console.log("Listening for github webhook messages at http://localhost:%d/new-repo", options.port);
