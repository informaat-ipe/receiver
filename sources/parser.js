'use strict';

module.exports = function parseNewRepoMessage( message ) {
	// TODO: replace with express way of handling errors
	if(! message || typeof message !== 'object') throw new Error( 'Did not receive an Object as argument' );

	var name       = message.repository.name;
	var repository = message.repository.url;
	var id         = name.replace(/\s+/g, ''); // strip all whitespace

	// Return the expected options structure
	// TODO: refactor this, now this is responsible for the default `build` part
	return {
		project: {
			id: id,
			name: name
		},
		build: {
			name: "Build"
		}
	}
};
