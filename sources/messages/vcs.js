// POST XML to /httpAuth/app/rest/vcs-roots/

var message = require('../message.js');
var template = './templates/vcs.xml';

var dictionary = {
	"{{project_id}}":   options.project.id,
	"{{project_name}}": options.project.name,
	"{{repo_url}}":     options.vcs.url
};

return message( template, dictionary );
