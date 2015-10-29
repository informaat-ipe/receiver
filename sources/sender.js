'use strict';

var Promise        = require( 'bluebird' );
var util           = require( 'util' );
var message        = require( './message.js' );
var request        = Promise.promisify( require( 'request' ) );

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

	return function ReuestPromiseFactory () {
		return request( mergeDefaultsWith( el.uri, el.body ) );
	}
}


module.exports = function sender( dictionary ) {
	// `dictionary` is the output of `parser.js`
	if( ! dictionary ) throw new Error( 'You need to provide a dictionary object' );

	// newProject & newDVCS, then newBuild
	var messages = [
		{ uri: '/projects',   body: message( './templates/project.xml', dictionary ) },
		{ uri: '/vcs-roots',  body: message( './templates/vcs.xml',     dictionary ) },
		{ uri: '/buildTypes', body: message( './templates/build.xml',   dictionary ) }
	];

	// Map over the promises so they execute in sequence
	// The results are stored in an array which the promise resolves into
	var Posts = messages.map( post );

	return Promise.reduce(Posts, function PostReducer (results, doPost) {
		return doPost().then( function PostResultHandler (result) {
			results.push(result);
			return results;
		})
	}, []);
}
