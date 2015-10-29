'use strict';

var parser = require('./parser.js');
var sender = require('./sender.js');


function summarize( result ) {
	return {
		path:		result.req.path,
		method:		result.req.method,
		statusCode: result.statusCode,
		body:		result.body
	}
}

function checkForDuplicate( message ) {
	// Filter all messages whose body contains 'Duplicate'
	return message.body.indexOf('Duplicate');
}


// Github webhook message handler
module.exports = function handler ( req, res ){
	console.log('Received as POST to /new-module');

	// Check payload
	if( ! req.body || Object.keys(req.body) === 0 ) {
		var error = "Received an empty payload.";

		console.error("ERROR: ", error);

		res.status(500, { error: error });
		res.end('ERROR');
	}


	// Handle payload -- turn it into posts to the Teamcity API
	sender( parser(req.body) )
	.then( function summarizeResults( results ) {
		return results.map( summarize );
	})
	.then( function success (summaries) {
		console.log("SUCCESS", summaries);

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
