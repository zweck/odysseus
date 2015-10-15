import Resources from './Resources';

export default class ResourceManager {

	constructor(resources){
		this.resources = resources;
		this.resourcesByName = {};

		this.resources.forEach((resource) => {
			this.resource = resource;
		});
	}

	set resource(rersc){
		var resource = new Resources(rersc);
		this.resourcesByName[resource.name] = resource;
	}
}