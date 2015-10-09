export default class UIView {

	constructor(options){
		this._section = options.section;
		this._seletor = options.selector;
		this.state = options.state || false;
	}

	get seletor(){
		return this._seletor;
	}

	get section(){
		return this._section;
	}

	get state(){
		return this._state;
	}

	set state(state){
		this._state = state;
		var domNodes = document.querySelectorAll(this.seletor);
		
		if(this._state){
			
			for (var i = domNodes.length - 1; i >= 0; i--) {
				domNodes[i].classList.add('show');
			};

		}else{

			for (var i = domNodes.length - 1; i >= 0; i--) {
				domNodes[i].classList.remove('show');
			};

		}
	}

	render(data){
		return true;
	}

	toggle(visual){

	}
}