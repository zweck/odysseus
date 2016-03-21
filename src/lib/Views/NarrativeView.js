export default class NarrativeView {

	constructor(){
		this._scene;
	}

	get scene(){
		return this._scene
	}

	set scene(scene){
		this._scene = scene;
		document.getElementById("narrative").innerHTML += `<div class="output-wrapper" id="${scene}"></div>`;
	}

	render(template){
		document.getElementById(this.scene).innerHTML += template;
		document.getElementById("narrative").scrollTop = document.getElementById("narrative").scrollHeight
		return true;
	}
}
