import Resource from './Resource';
import Event from './Event'

/**
 * @class
 */
class ResourceManager {

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
<<<<<<< HEAD

	callback(resource){
		this.manager.trigger("change:resource:" + resource.name, this);
	}

}
=======
}

export default ResourceManager;
>>>>>>> develop
