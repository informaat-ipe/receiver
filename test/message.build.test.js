'use strict';

var expect = require('chai').expect;
var fs     = require('fs');

describe('build template', function() {
	var build   = require( '../sources/messages/build.js' );
	var stub    = fs.readFileSync( __dirname + '/stub/build.stub.xml', 'utf8' );
	var options = require( './stub/options.stub.json' );

	it('should return a populated object if a valid options object is passed in.', function() {
		// Normalize by removing whitespace
		var A = build( options ).replace(/\s/g, "");
		var B = stub.replace(/\s/g, "");

		expect( A ).to.eql( B );
	});

	describe('error handling', function() {
		it('should throw an error if no arguments are supplied', function() {
			expect( build ).to.throw( Error );
		});

		it('should throw an error if the options object is not complete.', function() {
			var brokenOpts = Object.assign( {}, options );
			delete brokenOpts.project;

			expect( build.bind( null, brokenOpts ) ).to.throw( Error );
		});

		it('should throw an error if the argument is not an object', function() {
			expect( build.bind( null, 'string' ) ).to.throw( TypeError );
		});

		it('should throw an error if there is more then one argument', function() {
			expect( build.bind( null, options, options ) ).to.throw( Error );
		});
	});
});
