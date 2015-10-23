// parse the environment and configuration, default entry point

// Parse the environment, create configuration
var options = {
	port: process.env.TC_PORT || 8000
}

// Export the http server:
module.exports = require( './sources/server.js' )( options );
