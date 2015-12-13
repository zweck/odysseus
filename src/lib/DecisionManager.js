import Decision from './Decision';
import Evented from './Evented';

/**
 * @class
 */
class DecisionManager extends Evented {

	/**
 	 * @description The classes constructure which calls the super() and sets up some properties as well as creating the events
	 */
	constructor(options){
		super();
		
		this._narrative = options.narrative;
		this._narrative.on("decision:required", (data) => {

			this._narrative._decision = new Decision({
				choices: data.options.choices,
				infrastructure: data.options.infrastructure,
				resources: data.options.resources,
				narrative: this._narrative,
			});
		});
	}


}

export default DecisionManager;