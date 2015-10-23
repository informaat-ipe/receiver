// parse the environment and configuration, default entry point

// Parse the environment, create configuration
var ENDPOINT = process.env.OPS_WH_ENDPOINT || '/new-repo';

// Export the http server:
module.exports = require( './sources/server.js' )( options );
