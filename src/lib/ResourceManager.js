import Resource from './Resource';
import Evented from './Evented'

/**
 * @class
 */
class ResourceManager extends Evented {

	constructor(resources){
		super();
		this.resources = resources;
		this.resourcesByName = {};
		this.callbacks = [];

		this.resources.forEach((resource) => {
			resource = new Resource(resource);
			resource.on("change:level", () => {
				this.trigger("change:resource:" + resource.name, this);
			});
			this.resourcesByName[resource.name] = resource;
		});
	}
}

export default ResourceManager;
