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

	render(data){

		var template = ` 
			<p class="output ${ data.character.name }">
				${ data.character.name }: <span class="utterance">${ data.utterance }</span>
			</p>`;

		document.getElementById(this.scene).innerHTML += template;
		document.getElementById("narrative").scrollTop = document.getElementById("narrative").scrollHeight
		return true;
	}
}