'use strict';

var expect = require('chai').expect;

describe('server', function() {
	var server = require('../sources/server.js');
	var express = require('express');

	it('should return an express app', function() {
		expect( server ).to.be.a('function');
		// compare structure of server object to an empty express app structure
		expect( server ).to.contain.keys( Object.keys( express() ) );
	});

	it('should expose the correct endpoint', function() {
		expect( server.route( 'new-repo' ).path ).to.equal( "new-repo" );
	});
});
