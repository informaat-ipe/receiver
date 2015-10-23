var options = {
	project: {
		id: "TestConfig",
		name: "Test Config"
	},
	build: {
		name: "Build"
	}
}

// NOTE: Even though the api can return JSON, it needs to receive XML.
// See: https://confluence.jetbrains.com/display/TCD9/REST+API#RESTAPI-ProjectSettings
// Create (or copy) a project: POST XML <newProjectDescription name='New Project Name' id='newProjectId' copyAllAssociatedSettings='true'><parentProject locator='id:project1'/><sourceProject locator='id:project2'/></newProjectDescription> to http://teamcity:8111/httpAuth/app/rest/projects.


module.exports = function project ( opts ) {
    if ( ! opts || arguments.length != 1 )
	throw new Error('You need to provide a single options object.');

	if ( typeof opts !== 'object')
	throw new TypeError('Expected an options object.');

    return  '<newProjectDescription name="'+opts.project.name+'" id="'+opts.project.id+'"><parentProject locator="id:NodeModules" /></newProjectDescription>';
}
