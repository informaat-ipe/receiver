'use strict';

var expect  = require('chai').expect;
var mockery = require('mockery'); // this module allows you to control what `require` returns

var requestMock = function( options, callback ) {
	return {
		body: "Success Message",
		statusCode: 200
	};
}

// Configuring calls to `require(reqeust)` to return `requestMock`
mockery.registerMock( 'request', requestMock );

describe('sender', function() {
	var sender = require('../sources/sender.js');
	var config = require('./stub/options.stub.json');
	var promise = sender(config);

	before(function(done) {
		mockery.enable({warnOnReplace: true, warnOnUnregistered: true});
		return done();
	});

	after(function(done) {
		mockery.disable();
		return done();
	});

	it('should return a Promise', function() {
		expect( typeof promise.then ).to.equal('function');
		expect( typeof promise.catch ).to.equal('function');
	});

	describe('error handling', function() {
		it('should throw an error when you do not pass in a message to send');
	});
});
