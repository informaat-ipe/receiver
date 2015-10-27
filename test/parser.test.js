'use strict';

var expect = require('chai').expect;
// var fs = require('fs');

describe('parser', function() {
	var parser = require('../sources/parser.js');
	var output = require('./stub/options.stub.json');

	var input = {
		repository: {
			name: "Test Config",
			url: "id://lsdkfjs;adkjf"
		}
	};

	it('should return a valid options object', function() {
		expect( parser( input ) ).to.eql( output );
	});

	describe('error handling', function() {
		it('should throw an error if you pass in incomplete data' /*, function() {
			var brokenInput = Object.assign({}, input );
			delete brokenInput.repository.name;

			expect( parser.bind( null, brokenInput) ).to.throw('missing');
		} */);

		it('should throw an error if you pass in the wrong data', function() {
			var brokenInput = ['maks', 'typed', 'a', 'lot', 'of', 'zorks', 'and', 'lolipops'];
			expect( parser.bind( null, brokenInput ) ).to.throw(TypeError);
		});

		it('should throw an error if you pass no argument', function() {
			expect( parser ).to.throw( Error );
		});

		it('should throw an error if you pass more then one argument', function() {
			expect( parser.bind( null, {}, {}) ).to.throw( Error );
		});
	});
});
