// Create an XML message by populating a template

// Register .xml extension with `require`
require.extensions['.xml'] = function(module, filename) {
	var fs = require('fs');
	module.exports = fs.readFileSync(filename, 'utf8');
};

function populate( file, dictionary ) {
	var template = require( file );

	Object.keys( dictionary ).forEach(function(el) {
		template = template.replace( new RegExp(el, 'g'), dictionary[el] );
	});

	return template;
}
