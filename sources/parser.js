'use strict';

module.exports = function parseNewRepoMessage( message ) {
	if(! message || typeof message !== 'object') throw new Error( 'Did not receive an Object as argument' );

	var name       = message.repository.name;
	var repository = message.repository.url;
	var id         = name.replace(/\s+/g, ''); // strip all whitespace

	// TODO: return dictionary
	var dictionary = {
        "{{build_id}}":     id+'_Build',
        "{{build_name}}":   'Build',
    	"{{project_id}}":   id,
    	"{{project_name}}": name,
    	"{{repo_url}}":     repository
    };


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
