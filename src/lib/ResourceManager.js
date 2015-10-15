import Resource from './Resource';

export default class ResourceManager {

	constructor(resources){
		this.resources = resources;
		this.resourcesByName = {};

		this.resources.forEach((resource) => {
			this.resource = resource;
		});
	}

	set resource(resource){
		resource = new Resource(resource);
		this.resourcesByName[resource.name] = resource;
	}
}