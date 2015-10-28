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

function post(el) {
	// domain:   Object: { uri: String, body: String }
	// codomain: Promise
	return request( mergeDefaultsWith( el.uri, el.body ) );
}


/*
postBuild( { project: { name: "TEST", id: "TEST" }, build: {name: "BUILD" } }).then(function(err, result) {
	if( err ) { throw err };
	console.log( check(result) );
}).catch(function(error) {
	console.error(error.statusCode);
	console.log(arguments.length);
});
*/


module.exports = function sender( config ) {
	// `config` is the output of `parser.js`
	if( ! config ) throw new Error( 'You need to provide a config object' );

	// newProject & newDVCS, then newBuild
	var messages = [
		// { uri: '/vcs-roots', body: vcsMessage( config ) },
		{ uri: '/projects', body: projectMessage( config ) },
		{ uri: '/buildTypes', body: buildMessage( config ) }
	];

	return Promise.all( messages.map(post) );
}
