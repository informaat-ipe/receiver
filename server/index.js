'use strict';

var express = require('express');
var bparser = require('body-parser');
var app = express();

app.use(bparser.urlencoded({ extended: false }));

app.get('/', function(req, res){
    console.log('GET /')
    var html = '<html><body><form method="post" action="http://localhost:3000/new-module">Name: <input type="text" name="name" /><input type="submit" value="Submit" /></form></body>';
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(html);
});

// URL to receive Github webhook POST
app.post('/new-module', function(req, res){
    console.log('POST /new-module');
    console.dir(req.body);
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('thanks');
});

var port = 3000;
app.listen(port);
console.log('Listening at http://localhost:' + port)
