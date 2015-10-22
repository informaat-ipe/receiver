'use strict';

let expect = require( 'chai' ).expect;
let utils  = require( '../templates/utils.js' );

describe( 'utils', function() {

	const options = require( './stub/options.stub.json' );
	const result  = require( './stub/result.stub.json' );

	describe( 'compare', function() {
		it( 'should return false when two Arrays do not have the same structure', function() {
			expect( utils.compare( [], result )).to.equal( false );
		} );

		it( 'should return true when two Arrays have the same structure', function() {
			expect (utils.compare( result, result ) ).to.equal( true );
		} );

		describe('error handling', function() {
			it( 'should throw an error when you pass in no arguments', function() {
				expect( utils.compare ).to.throw( Error );
			});

			it( 'should throw an error when you pass in one Array', function() {
				expect( utils.compare.bind ( null, {} ) ).to.throw( Error );
			});
			it( 'should throw an error when you pass in more then two Arrays', function() {
				expect( utils.compare.bind ( null, 1, 2, 3 ) ).to.throw( Error );
			});
		});
	});

	describe( 'keyList', function() {
		it( 'should return the structure of an object', function() {
			const r = utils.keyList( options );
			expect( r ).to.be.an( 'array' );
			expect( r.length ).to.equal( 3 );
			expect( r ).to.eql( result );
		} );

		describe('error handling', function() {
			it( 'should throw an error when you pass in something else then an object', function() {
				expect( utils.keyList.bind( null, 'string') ).to.throw( Error );
			} );

			it( 'should throw an error when you pass in no arguments', function() {
				expect( utils.keyList ).to.throw( Error );
			} );
		});
	});

});
