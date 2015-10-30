'use strict';

var express        = require( 'express' );
var bparser        = require( 'body-parser' );
var newRepoHandler = require( './handler.js' );


var app = express();

// Set up default middlewares:
app.use( bparser.json() );

// Provide a GET index url for our future selves:
app.get('/', function(req, res){
    console.log('GET /')
    var html = '<html><body><h1>Github/Teamcity reflector</h1><p>POST the following JSON to /new-module, this will create a new build flow on this (local) Teamcity:<p><code>{project: {id: "AnotherConfig",name: "Another Config"},build: {name: "Build"}}<code></body>';
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(html);
});

// Register the `newRepoHandler` on `/new-repo`
app.post('/new-repo', newRepoHandler );


module.exports = app;
