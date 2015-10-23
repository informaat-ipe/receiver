'use strict';

var xml = '<buildType id="{{build_id}}" name="{{build_name}}" projectId="{{project_id}}" > \
    <project id="{{project_id}}" name="{{project_name}}" parentProjectId="NodeModules" href="/httpAuth/app/rest/projects/id:{{project_id}}" webUrl="http://localhost:8111/project.html?projectId={{project_id}}" /> \
    <template id="NodeModule" name="node_module" templateFlag="true" projectName="node_modules" projectId="NodeModules" href="/httpAuth/app/rest/buildTypes/id:NodeModule" /> \
    <vcs-root-entries> \
        <!--vcs-root-entry elements are not necessary--> \
    </vcs-root-entries> \
    <settings> \
    </settings> \
    <parameters> \
    </parameters> \
    <steps> \
    </steps> \
    <features> \
    </features> \
    <triggers> \
    </triggers> \
    <snapshot-dependencies/> \
    <artifact-dependencies/> \
    <agent-requirements/> \
    <builds href="/httpAuth/app/rest/buildTypes/id:{{build_id}}/builds/" /> \
</buildType>';


module.exports = function build ( opts ) {
	if ( ! opts || arguments.length != 1 )
	throw new Error('You need to provide a single options object.');

	if ( typeof opts !== 'object')
	throw new TypeError('Expected an options object.');

	return xml
		.replace(/{{build_id}}/g, opts.project.id + "_" + opts.build.name)
		.replace(/{{build_name}}/g, opts.build.name)
		.replace(/{{project_id}}/g, opts.project.id)
		.replace(/{{project_name}}/g, opts.project.name)
	;
}
