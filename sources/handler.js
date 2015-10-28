'use strict';

var parser = require('./parser.js');
var sender = require('./sender.js');


// Github webhook message handler
module.exports = function handler ( req, res ){
	console.log('Received as POST to /new-module');

	sender( parser(req.body) )
	.then( function success (result) {
		console.log( 'SUCCESS' );

		res.writeHead(200, {'Content-Type': 'text/html'});
		res.end('SUCCESS');
	})
	.catch( function failure (error) {
		console.error( 'ERROR:', error );

		res.status(500, {
			error: error
		});
		res.end('ERROR');
	})
}
