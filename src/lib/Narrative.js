import NarrativeView from './NarrativeView';

export default class Narrative {
	constructor(options){

		this._narrativeView = new NarrativeView();

		// setup some public properties
		this._narrative;
		this._speed = options.speed || 1;
		this._perspective = options.perspective;
		this._progress = 0;
		this._characters = options.characters;
		this._charactersByName = {};
		options.characters.forEach((character) => {
			this._charactersByName[character.name] = character;
		});
	}

	/**
	 * This is a scene progress count used in the `go()` method
	 * @param  {integer} incAmount This is the amount to progress the narrative, default is 1
	 */
	incrementProgress(incAmount=1){
		var incAmount = incAmount;
		this._progress = this._progress + incAmount;
	}

	/**
	 * This method is the initialiser for the narrative class
	 * @param  {Array<String>} narrative This method takes a scene and runs through it
	 */
	run(scene){
		this._narrative = scene;
		this.go();
	}

	getCharactersForNarrative(narrative){
		var name = narrative.split(":")[0].trim();
		return this._charactersByName[name] || false;
	}

	textLengthOffset(narrative){
		return narrative.length * 100;
	}

	/**
	 * This method is the main scene parser, it iterates through the scene and outputs the narrative into the NarrativeView
	 */
	go(){

		// grab the current progress
		var i = this._progress;

		// get the scene narrative
		var narrative = this._narrative;

		// initialise some vars
		var character, say;
		
		// if we're still in a narrative
		if( i < narrative.length ){
		
			// and if the next element in the scene array is text
			if (!parseInt(narrative[i])) {

				// get a the character from the front of the scene text string
				character = this.getCharactersForNarrative(narrative[i]);

				// get the scene text string
				say = narrative[i];

				// if the character in the narrative isn't in the characters setup
				// assume that its the protaganist
				if(!character){

					switch(this._perspective) {
						case 1:
							character = "Me";
						break;
						case 3:
							character = "You";
						break;
						default:
							character = "Me";
					}
					
				}else{

					// remove the character from the text string
					say = narrative[i].replace(character.name + ":", "");
				}

				// pass the character and the text to the narrative view
				this._narrativeView.render({output: say, character: character});

				// increment the progress
				this.incrementProgress();

				// repeat
				this.go();
			}else{

				// if the array element is an integer, pass the int and the array index to the wait method
				this.wait(narrative[i], i);
			}

		}

	}

	wait(waitTime, i){
		var previousNarrative = this._narrative[i-1];
		var time = waitTime * 1000 + this.textLengthOffset(previousNarrative);
		time = time/this._speed;
		setTimeout(() => {
			this.incrementProgress();
			this.go();
		}, time);
	}
}