'use strict';

var Promise        = require( 'bluebird' );
var util           = require( 'util' );
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

function post(el) {
	// domain:   Object: { uri: String, body: String }
	// codomain: Promise

	return function ReuestPromiseFactory () {
		return request( mergeDefaultsWith( el.uri, el.body ) ).tap( log ).then( inspect );
	}


	function log( message ) {
		console.log( message.req.method, message.req.path, ':', message.statusCode, message.statusMessage, message.body, '\n' );
	}

	function inspect( result ) {
		// TODO: expand the rules here. 
		if( result.statusCode !== 200 ) throw new Error(util.format("The %s to %s returned a %d: %s", result.req.method, result.req.path, result.statusCode, result.body));
	}
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

	// Map over the promises so they execute in sequence
	// The results are stored in an array
	var Posts = messages.map( post );
	return Promise.reduce(Posts, function PostReducer (results, doPost) {
		return doPost().then( function PostResultHandler (result) {
			results.push(result);
			return results;
		})
	}, []);

	// return Promise.cast(messages).mapSeries(post);
}
