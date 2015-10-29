'use strict';

var message  = require('../message.js');
var template = './messages/templates/build.xml';

module.exports = function( options ) {
    var dictionary = {
        "{{build_id}}":     options.project.id+'_'+options.build.name,
        "{{build_name}}":   options.build.name,
    	"{{project_id}}":   options.project.id,
    	"{{project_name}}": options.project.name,
    	"{{repo_url}}":     options.vcs.url
    };

    return message( template, dictionary );
}
