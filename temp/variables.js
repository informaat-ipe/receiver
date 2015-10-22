let project = {
	id: "NewName", // generated from argument
	name: "New Name", // argument
	parent_id: "NodeModules", // const
	href: "/httpAuth/app/rest/projects/id:"+project.id,
	web: "http://teamcity:8111/project.html/?projectId="+project.id
}

const template = {
	id: "NodeModule", // const
	name: "node_module", // const
	parent_name: "node_modules", // const
	parent_id: "NodeModules", // const
	href: "/httpAuth/app/rest/buildTypes/id:"+template.parent_id, // const
}

let build = {
	name: "Build", // const
	id: project.id + '_' + build.name, // const
}

let builds = {
	href: "/httpAuth/app/rest/buildTtypes/id:"+build.id+'/builds'
}
