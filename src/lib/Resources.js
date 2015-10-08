import ResourceView from './ResourceView';

export default class Resources {

	constructor(options){
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
	}
}