import ResourceView from './Views/ResourceView';
import Evented from './Evented';

/**
 * @description A simple class for initialising resources
 * @extends Evented
 * @class
 */
class Resources extends Evented {

	/**
	 * @description The constructor for the Resource class
	 * @param  {object} options the name and initial values of the single resource from the resource initialisation
	 */
	constructor(options){
		super();

		/**
		 * @public {string}
		 */
		this.name = options.name;

		// These are private properties
		this._level = options.initial;
		this._resourceView = new ResourceView();
		this._resourceView.render( {name: this.name, level: this.level} );
	}

	overrideLevel(level){
		this._level = level;		
		this._resourceView.render( {name: this.name, level: this.level} );
		this.trigger("change:level", this);
	}

	/**
	 * @description The level getter
	 * @return {number} The level of that resource as a number
	 */
	get level(){
		return this._level;
	}

	/**
	 * @description The level setter
	 * @param {number} The new level
	 */
	set level(level){
		this._level = level;
		this._resourceView.render( {name: this.name, level: this.level} );
		this.trigger("change:level", this);
	}

	/**
	 * Adjust the level
	 * @param  {number} amount Amount by which to adjust the level
	 * @return {number}        The new level
	 */
	incr(amount) {
		this.level = this.level + amount;
	}
}

export default Resources;