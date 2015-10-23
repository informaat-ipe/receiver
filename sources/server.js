'use strict';

var express        = require('express');
var bparser        = require('body-parser');
var newRepoHandler = require('./handler.js');


var app = express();

// Set up default middlewares:
app.use(bparser.urlencoded({ extended: false }));

// Provide a GET index url for our future selves:
app.get('/', function(req, res){
    console.log('GET /')
    var html = '<html><body><h1>Github/Teamcity reflector</h1><p>POST the following JSON to /new-module, this will create a new build flow on this Teamcity:<p><code>{project: {id: "AnotherConfig",name: "Another Config"},build: {name: "Build"}}<code></body>';
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(html);
});

function registerEndpoint( app, endpoint, handler ) {
    // URL to receive Github webhook POST
    if( arguments.length !== 3 || typeof app !== 'function' || typeof endpoint !== 'string' || typeof handler !== 'function' )
        throw new Error('You need to provide an express app, endpoint string and its handler function to register an endpoint');

    return app.post( endpoint , handler );
}

// Register the POST /new-repo endpoint
registerEndpoint( app, '/new-repo', newRepoHandler );

module.exports = function server( options ) {
    if( ! options ) throw new Error( 'You need to provide an options object' );

    app.listen( options.port );
    console.log("Listening for github webhook messages at http://localhost:%d/new-repo", options.port);
}
