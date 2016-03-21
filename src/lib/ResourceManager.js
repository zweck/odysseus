import Resource from './Resource';
import Evented from './Evented';

/**
 * @description This class is a factory class and event manager for resources
 * @extends Evented
 * @class
 */
class ResourceManager extends Evented {

	/**
 	 * @description The classes constructure which calls the super() and sets up some properties as well as creating the events
	 * @param  {array<object>} resources An array of resources e.g [{name: Killowatts, initial: 10}, {name: o2, initial: 5}]
	 */
	constructor(resources){
		super();

		/**
		 * @public
		 */
		this.resourcesByName = {};

		this.resources = resources;
		this.resources.forEach((resource) => {
			resource = new Resource(resource);
			resource.on("change:level", () => {

				// This triggers events for level changes on each of the resources, 
				// allowing classes to subscribe to the "change:resource:<resource.name>" event
				// 
				// e.g
				// 		this._resources.on("change:resource:Killowatts", function(data){
				// 			console.log(data);
				// 		});
				this.trigger("change:resource:" + resource.name, this);
			});
			this.resourcesByName[resource.name] = resource;
		});
	}
}

export default ResourceManager;
