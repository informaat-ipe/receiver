'use strict';

// TODO: refactor this using Array generics

function keyList(obj) {
	if( ! arguments || arguments.length > 1 || typeof obj !== 'object' ) throw new Error ('You need to provide one object as an argument');

	var output = [];

	function loop(obj, stack) {
		Object.keys(obj).forEach(function(key) {
			(obj.hasOwnProperty(key) && typeof obj[key] === 'object') ? loop(obj[key], stack+'.'+key) : output.push(stack+'.'+key);
		});
	}

	loop(obj, 'object');

	return output;
}

function compare(a, b) {
	if(arguments.length !== 2 || ! a instanceof Array || ! b instanceof Array ) throw new Error('You need to provide two Arrays to compare');

	return ! a.every(function(key) {
		return b.indexOf( key );
	});
}

module.exports = {
	keyList: keyList,
	compare: compare
}
