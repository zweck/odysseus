import ResourceView from './Views/ResourceView';
import Event from './Event'

/**
 * @class
 */
class Resources {

	constructor(options){
		super();
		this.name = options.resource.name;
		this._level = options.resource.initial;
		this._resourceView = new ResourceView();
		this._resourceView.render( {name: this.name, level: this.level} );

		// not sure about this, it feels wrong :(
		this.manager = options.manager;
	}

	get level(){
		return this._level;
	}

	set level(levelAdjust){
		this._level = this._level + levelAdjust;
		this._resourceView.render( {name: this.name, level: this.level} );
		this.trigger("change:level", this);
	}
}

export default Resources;