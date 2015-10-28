'use strict';

var Promise        = require( 'bluebird' );
var request        = Promise.promisify( require( 'request' ) );
var projectMessage = require( './messages/project.js' );
var buildMessage   = require( './messages/build.js' );
var vcsMessage     = require( './messages/vcs.js' );

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

function log( message ) {
	console.log( message.method, message.statusCode, message.statusMessage, message.body );
}

function post(el) {
	// domain:   Object: { uri: String, body: String }
	// codomain: Promise
	// TODO: add .then() to check for `statusCode`s other then 200
	return request( mergeDefaultsWith( el.uri, el.body ) ).tap( log );
}

module.exports = function sender( config ) {
	// `config` is the output of `parser.js`
	if( ! config ) throw new Error( 'You need to provide a config object' );

	// newProject & newDVCS, then newBuild
	var messages = [
		{ uri: '/projects',   body: projectMessage( config ) },
		{ uri: '/vcs-roots',  body: vcsMessage( config ) },
		{ uri: '/buildTypes', body: buildMessage( config ) }
	];

	// Process each promise in sequence
	// [TypeError: expecting a function but got [object Undefined]]
	return Promise.mapSeries( messages.map( post ) );
}
