'use strict';

var request        = require('request');
var projectMessage = require('../messages/project.js');
var buildMessage   = require('../messages/build.js');

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

function postProject( config, callback ) {
	var uri  = '/projects';
	var body = projectMessage( config );

	request( mergeDefaultsWith( uri, body ), handler( callback ) );
}

function postBuild( config, callback ) {
	var uri  = '/buildTypes';
	var body = buildMessage( config );

	request ( mergeDefaultsWith( uri, body ), handler() );
}


module.exports = function sender( options ) {
	// `options` is the output of `parser.js`
	if( ! options ) throw new Error( 'You need to provide an options object' );

	// newProject & newDVCS, then newBuild
	postProject( postBuild );
}
