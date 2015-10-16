import InfrastructureView from './Views/InfrastructureView';
import Evented from './Evented';

/**
 * @class
 */
class Infrastructure extends Evented {

	constructor(options){
		super();
		this.name = options.name;
		this._status = options.status;

		this._infrastructureView = new InfrastructureView();
		this._infrastructureView.render( {name: this.name, status: this.status} );
	}

	get status(){
		return this._status;
	}

	set status(status){
		this._status = status;
		this._infrastructureView.render( {name: this.name, status: this.status} );
		this.trigger("change:status", this);
	}
}

export default Infrastructure;