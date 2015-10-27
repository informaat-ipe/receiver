'use strict';

var expect = require('chai').expect;
var fs     = require('fs');

describe('project template', function() {
	var project = require( '../sources/messages/project.js' );
	var stub    = fs.readFileSync( __dirname + '/stub/project.stub.xml', 'utf8' ); // `require` is sync as well people...
	var options = require( './stub/options.stub.json' );

	it('should return a populated template if a valid options object is passed in.', function() {
		// Normalize by removing whitespace
		var A = project( options ).replace(/\s/g, "");
		var B = stub.replace(/\s/g, "");

		expect( A ).to.eql( B );
	});

	describe('error handling', function() {
		it('should throw an error if no arguments are supplied', function() {
			expect( project ).to.throw( Error );
		});

		it('should throw an error if the options object is not complete.', function() {
			var brokenOpts = Object.assign( {}, options );
			delete brokenOpts.project;

			expect( project.bind( project, brokenOpts ) ).to.throw( Error );
		});

		it('should throw an error if the argument is not an object', function() {
			expect( project.bind( null, 'string' ) ).to.throw( TypeError );
		});

		it('should throw an error if there is more then one argument', function() {
			expect( project.bind( null, options, options ) ).to.throw( Error );
		});
	});
});
