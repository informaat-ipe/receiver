'use strict';

let expect = require('chai').expect;

describe('build template', function() {
	const build   = require( '../templates/build.js' );
	const stub    = require( './stub/build.stub.json' );
	const options = require( './stub/options.stub.json' );

	it('should return a populated object if a valid options object is passed in.', function() {
		expect( build( options ) ).to.eql( stub );
	});

	describe('error handling', function() {
		it('should throw an error if no arguments are supplied', function() {
			expect( build ).to.throw( Error );
		});

		it('should throw an error if the options object is not complete.', function() {
			let brokenOpts = Object.assign( {}, options );
			delete brokenOpts.project;

			expect( build.bind( build, brokenOpts ) ).to.throw( Error );
		});

		it('should throw an error if the argument is not an object', function() {
			expect( build.bind( null, 'string' ) ).to.throw( TypeError );
		});

		it('should throw an error if there is more then one argument', function() {
			expect( build.bind( null, options, options ) ).to.throw( Error );
		});
	});
});
