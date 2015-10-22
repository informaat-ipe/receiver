var request = require('request');

// Require factories
var buildPostFactory   = require('../templates/build.js');
var projectPostFactory = require('../templates/project.js');

// Configuration
var options = {
	project: {
		id: "TestConfig",
		name: "Test Config"
	},
	build: {
		name: "Build"
	}
};

// Populate templates to POST
// var build   = buildPostFactory( options );


// Teamcity
var teamcity = {
	baseUrl: 'http://teamcity:8111/app/rest',
	json: "true",
	method: "POST",
	auth: {
		user: 'admin',
		pass: 'admin',
		sendImmediately: false
	},
	encoding: 'utf8'
};

function optFactory(path, body) {
	if (! path || ! body) throw new Error('You need to provide a `path` and a `body` to post.');

	var result = Object.assign({
		uri: path,
		body: body
	}, teamcity);

	console.log(result);

	return result;

}

// Set up the POST chain
request( optFactory( '/projects', JSON.stringify( projectPostFactory( options ) ) ), function callback( error, response, body ) {
	if(error) throw new Error(error);

	console.log( "%s: %s", response.statusCode, body );
});
