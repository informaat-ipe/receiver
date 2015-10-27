'use strict';

var parser = require('./parser.js');
var sender = require('./sender.js');

// Github webhook message handler
module.exports = function handler ( req, res ){
	console.log('Received as POST to /new-module:', req.body);

	// TODO: Check we received VALID data

	// Parse the req.body and send it to sender:
	sender( parser( req.body ) );

	res.writeHead(200, {'Content-Type': 'text/html'});
	res.end('RECEIVED NEW REPO WEBHOOK');
}
