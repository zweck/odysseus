import InfrastructureView from './Views/InfrastructureView';
import Evented from './Evented';

class Infrastructure extends Evented {

	/**
	 * Infrastructure represents physical assets, e.g. rooms, weapons systems, corridors
	 * @constructor
	 *
	 */
	constructor(options){
		super();

		/**
		 * Name of the infrastructure item
		 * @type {String}
		 */
		this.name = options.name;
		/**
		 * The item's status (on or off)
		 * @type {Boolean}
		 */
		this._status = options.status;

		this._infrastructureView = new InfrastructureView();
		this._infrastructureView.render( {name: this.name, status: this.status} );
	}

	/**
	 * Status getter
	 * @return {Boolean}
	 */
	get status(){
		return this._status;
	}

	/**
	 * Status setter
	 * @param {Boolean} status The new status
	 */
	set status(status){
		this._status = status;
		this._infrastructureView.render( {name: this.name, status: this.status} );
		this.trigger("change:status", this);
	}
}

export default Infrastructure;
