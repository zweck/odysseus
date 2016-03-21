import Infrastructure from './Infrastructure';
import Evented from './Evented';

/**
 * @class
 */
class InfrastructureManager extends Evented {

	/**
 	 * @description The classes constructure which calls the super() and sets up some properties as well as creating the events
	 * @param  {array<object>} infrastructures An array of infrastructures e.g [{name: Killowatts, initial: 10}, {name: o2, initial: 5}]
	 */
	constructor(infrastructure){
		super();
		
		/**
		 * @public
		 */
		this.infrastructureByName = {};
		
		this.infrastructure = infrastructure;
		this.infrastructure.forEach((infrastructure) => {
			infrastructure = new Infrastructure(infrastructure);
			infrastructure.on("change:status", () => {

				// This triggers events for level changes on each of the infrastructures, 
				// allowing classes to subscribe to the "change:infrastructure:<infrastructure.name>" event
				// 
				// e.g
				// 		this._infrastructures.on("change:infrastructure:Killowatts", function(data){
				// 			console.log(data);
				// 		});
				this.trigger("change:infrastructure:" + infrastructure.name, this);
			});
			this.infrastructureByName[infrastructure.name] = infrastructure;
		});
	}


}

export default InfrastructureManager;