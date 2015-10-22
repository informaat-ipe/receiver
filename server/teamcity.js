var request = require('request');

// Require factories
var buildPostFactory   = require('../templates/build.js');
var projectPostFactory = require('../templates/project.js');

// Configuration
// TODO: take these as arguments
var options = {
	project: {
		id: "AnotherConfig",
		name: "Another Config"
	},
	build: {
		name: "Build"
	}
};

// Populate templates to POST
// var build   = buildPostFactory( options );

function optFactory(options) {
	// This function merges new options with build-in defaults.

	if (! options ) throw new Error('You need to provide an option object.');

	// `request` options object. See: https://github.com/request/request#requestoptions-callback
	var teamcity = {
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

	return Object.assign(options, teamcity);
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

function postProject( callback ) {
	// Set up the POST chain
	var opts = {
		uri: '/projects',
		body: projectPostFactory( options ),
	}

	request( optFactory( opts ), handler( callback ) );
}

function postBuild( callback ) {
	var opts = {
		uri: '/buildTypes',
		body: buildPostFactory( options ),
	}

	request ( optFactory( opts ), handler() );
}


postProject( postBuild );
