var options = {
	project: {
		id: "TestConfig",
		name: "Test Config"
	},
	build: {
		name: "Build"
	}
}

module.exports = function project ( opts ) {
    if ( ! opts || arguments.length != 1 )
	throw new Error('You need to provide a single options object.');

	if ( typeof opts !== 'object')
	throw new TypeError('Expected an options object.');

    return {
        "id": opts.project.id,
        "name": opts.project.name,
        "parentProjectId": "NodeModules"
    }
}
