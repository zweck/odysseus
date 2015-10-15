import Resource from './Resource';
import Event from './Event'

export default class ResourceManager extends Event {

	constructor(resources){
		super();
		this.resources = resources;
		this.resourcesByName = {};
		this.callbacks = [];

		this.resources.forEach((resource) => {
			this.resource = resource;
		});
	}

	set resource(resource){
		resource = new Resource({resource: resource, manager: this});
		resource.on("change:level", this.callback);
		this.resourcesByName[resource.name] = resource;
	}

	callback(resource){
		this.manager.trigger("change:resource:" + resource.name, this);
	}

}