'use strict';

var Promise        = require( 'bluebird' );
var request        = Promise.promisify( require( 'request' ) );
var projectMessage = require( './messages/project.js' );
var buildMessage   = require( './messages/build.js' );

function mergeDefaultsWith( uri, message ) {
	// This function merges new options with build-in defaults.

	if(! uri || ! message ) throw new Error('You need to provide a uri and a message');
	if( typeof uri !== 'string' ) throw new TypeError( 'Expected `uri` to be a string');
	if( typeof message !== 'string' ) throw new TypeError( 'Expected `message` to be a string');

	// `request` options object. See: https://github.com/request/request#requestoptions-callback
	return {
		uri: uri,
		body: message,
		// defaults
		baseUrl: 'http://teamcity:8111/app/rest',
		method: "POST",
		auth: {
			user: 'admin',
			pass: 'admin',
			sendImmediately: false
		},
		encoding: 'utf8',
		headers: {
			"Content-Type": "application/xml"
		}
	};
}

// TODO: refactor to promises
function handler( callback ) {
	// Ghetto-curried handler. Tasty!
	return function handler( error, response, body ) {
		if(error) throw new Error(error);

		console.log( "%s: %s", response.statusCode, body );

		if( ! error && response.statusCode == 200) {
			callback && callback();
		}
	}

}

function postPromise(el) {
	// domain:   Object: { uri: String, body: String }
	// codomain: Promise
	return request( mergeDefaultsWith( el.uri, el.message ) );
}

// Do something akin to this:
// messages.map(postPromise);


function postProject( config ) {
	var uri  = '/projects';
	var body = projectMessage( config );

	return request( mergeDefaultsWith( uri, body ) );
}

function postBuild( config ) {
	var uri  = '/buildTypes';
	var body = buildMessage( config );

	return request ( mergeDefaultsWith( uri, body ) );
}



postBuild( { project: { name: "TEST", id: "TEST" }, build: {name: "BUILD" } }).then(function(err, result) {
	if( err ) { throw err };
	console.log( check(result) );
}).catch(function(error) {
	console.error(error.statusCode);
	console.log(arguments.length);
});


function success( response ) {
	console.log( 'SUCCESS' );
	return res.end(true);
}

function failure( error ) {
	console.error( 'FAILURE' );
	console.error( error );
	return false;
}

module.exports = function sender( config ) {
	// `config` is the output of `parser.js`
	if( ! config ) throw new Error( 'You need to provide a config object' );

	// newProject & newDVCS, then newBuild
	var messages = [
		{ uri: '/projects', body: projectMessage( config ) },
		{ uri: '/buildTypes', body: buildMessage( config ) }
	];

	Promise
		.all( messages.map(post) )
		.then( sucess )
		.catch( failure )
}
