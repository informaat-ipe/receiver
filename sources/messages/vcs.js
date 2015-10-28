// POST XML to /httpAuth/app/rest/vcs-roots/

var message = require('../message.js');
var template = './messages/templates/vcs.xml';

module.exports = function( options ) {
	var dictionary = {
		"{{project_id}}":   options.project.id,
		"{{project_name}}": options.project.name,
		"{{repo_url}}":     options.vcs.url
	};

	return message( template, dictionary );
}
