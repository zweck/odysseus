export default class NarrativeView {

	constructor(){
		this._scene;
	}

	get scene(){
		return this._scene
	}

	set scene(scene){
		this._scene = scene;
		document.getElementById("narrative").innerHTML += `<div id="${scene}"></div>`;
	}

	render(data){

		var template = ` 
			<p class="output">
				${ data.character.name }: ${ data.utterance }
			</p>
		`;

		document.getElementById(this.scene).innerHTML += template;

		return true;
	}
}