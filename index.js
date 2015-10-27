// parse the environment and configuration, start the server

// Parse the environment, create configuration
var options = {
	port: process.env.TC_PORT || 8000
}

var server = require('./sources/server.js');

server.listen( options.port );
console.log("Listening for github webhook messages at http://localhost:%d/new-repo", options.port);
