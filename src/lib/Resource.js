import ResourceView from './Views/ResourceView';
import Evented from './Evented'

/**
 * @class
 */
class Resources extends Evented {

	constructor(options){
		super();
		this.name = options.name;
		this._level = options.initial;
		this._resourceView = new ResourceView();
		this._resourceView.render( {name: this.name, level: this.level} );
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