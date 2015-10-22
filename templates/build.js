'use strict';

// TODO: using es5 here, otherwise have to put all of babel in.
var keyList = require('./utils.js').keyList;
var compare = require('./utils.js').compare;


var options = {
	project: {
		id: "TestConfig",
		name: "Test Config"
	},
	build: {
		name: "Build"
	}
}

module.exports = function build ( opts ) {
	if ( ! opts || arguments.length != 1 )
	throw new Error('You need to provide a single options object.');

	if ( typeof opts !== 'object')
	throw new TypeError('Expected an options object.');

	// it('should throw an error if the options object is not complete.');
	// if (Object.keys(options) !== Object.keys(opts) )
	// throw new Error(`You need to provide an options object like this: ${options}`);

	var build_id = options.project.name + "_" + options.build.name;

	return {
	    "id": build_id, // TestConfig_Build
	    "name": opts.build.name, // "Build",
	    "projectName": "node_modules :: "+opts.project.name, //Test Config
	    "projectId": opts.project.id, // "TestConfig",
	    "href": "/app/rest/buildTypes/id:" + build_id, //TestConfig_Build
	    "webUrl": "http://gpro.local:8111/viewType.html?buildTypeId=" + build_id, // TestConfig_Build
	    "project": {
	        "id": opts.project.id, // "TestConfig",
	        "name": opts.project.name, //"Test Config",
	        "parentProjectId": "NodeModules",
	        "href": "/app/rest/projects/id:"+opts.project.id ,// TestConfig
	        "webUrl": "http://gpro.local:8111/project.html?projectId="+opts.project.id //TestConfig
	    },
	    "template": {
	        "id": "NodeModule",
	        "name": "node_module",
	        "templateFlag": true,
	        "projectName": "node_modules",
	        "projectId": "NodeModules",
	        "href": "/app/rest/buildTypes/id:NodeModule"
	    },
	    "vcs-root-entries": {
	        "count": 0,
	        "vcs-root-entry": []
	    },
	    "builds": {
	        "href": "/app/rest/buildTypes/id:"+build_id+"/builds/" //TestConfig_Build
	    }
	}
}
