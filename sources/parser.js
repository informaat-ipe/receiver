'use strict';

module.exports = function parseNewRepoMessage( message ) {
	if(! message || typeof message !== 'object') throw new Error( 'Did not receive an Object as argument' );

	var name       = message.repository.name;
	var repository = message.repository.url;
	var id         = name.replace(/\s+/g, ''); // strip all whitespace

	// Return the expected options structure
	// TOOD: add repo information
	return {
		project: {
			id: id,
			name: name
		},
		build: {
			name: "Build"
		},
		vcs: {
			url: repository
		}
	}
};
