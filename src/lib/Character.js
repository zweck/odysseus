import Evented from './Evented';

/**
 * @class
 */
class Character extends Evented {
	constructor(options){
		super();
		this.name = options.character;
		this.perspective = options.perspective;

		if(this.name === "PLAYER"){
			this.name = options.perspective;
		}

		this.bindEvents();
	}

	bindEvents(){
		this.on("character:say", (data) => {
			this.say({utterance: data.utterance, narrativeView: data.narrativeView});
		});
	}

	say(options){
		let utterance = options.utterance;

		let template = `
			<p class="output ${ this.name }">
				<span class="name">${ this.name }:</span> <span class="utterance">${ utterance.text }</span>
			</p>`;

		options.narrativeView.render(template);
	}
}

export default Character;
