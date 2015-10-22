'use strict';

var express = require('express');
var bparser = require('body-parser');
var app = express();

app.use(bparser.urlencoded({ extended: false }));

app.get('/', function(req, res){
    console.log('GET /')
    var html = '<html><body><h1>Github/Teamcity reflector</h1><p>POST the following JSON to /new-module, this will create a new build flow on this Teamcity:<p><code>{project: {id: "AnotherConfig",name: "Another Config"},build: {name: "Build"}}<code></body>';
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(html);
});

// URL to receive Github webhook POST
app.post('/new-module', function(req, res){
    console.log('POST /new-module:', req.body);

	// TODO: make this a separate thing
	function parseNewRepoPayload(payload) {
		// TODO: determine if we want to throw...
		if(! payload || typeof payload !== 'object') throw new Error( 'Did not receive an Object as argument' );

		var name       = payload.repository.name;
        var repository = payload.repository.url;
		var id         = name.replace(/\s+/g, ''); // strip all whitespace

		// Return the expected options structure
		// TODO: refactor this, now this is responsible for the default `build` part
		return {
			project: {
				id: id,
				name: name
			},
			build: {
				name: "Build"
			}
		}
	};

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('OK');
});

var port = 3000;
app.listen(port);
console.log('Listening at http://localhost:' + port)
