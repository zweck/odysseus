import NarrativeView from './NarrativeView';
import Decision from './Decision';

export default class Narrative {
	constructor(options){

		this._narrativeView = new NarrativeView();

		// setup some public properties
		this._narrative;
		this._speed = options.speed || 1;
		this._perspective = options.perspective;
		this._progress = 0;
		this._characters = options.characters;
		this._resources = options.resources;
		
		// create an object of characters mapping names against their 
		// character class instance
		this._charactersByName = {};
		this._characters.forEach((character) => {
			this._charactersByName[character.name] = character;
		});

		// create an object of resources mapping names against their 
		// resource class instance
		this._resourcesByName = {};
		this._resources.forEach((resource) => {
			this._resourcesByName[resource.name] = resource;
		});		
	}

	/**
	 * This method is the initialiser for the narrative class
	 * @param  {Array<String>} narrative This method takes a scene and runs through it
	 */
	run(scene){
		this._narrative = scene;
		this.go();
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
	 * This method parses out the character at the start of the utterance and checks that they exist in the character class
	 * @param  {string} narrative The utterance from the scene array
	 * @return {string} character The character name from the utterance
	 */
	getCharactersForNarrative(narrative){
		var name = narrative.split(":")[0].trim();
		return this._charactersByName[name] || false;
	}

	/**
	 * This method offsets the wait time by the amount of characters in the utterance
	 * @param  {string} narrative The utterance from the scene array
	 * @return {number}           The amount of characters * 100ms
	 */
	textLengthOffset(narrative){
		return narrative.length * 100;
	}


	type(utterance){
		var utteranceType = typeof utterance;
		return utteranceType;
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
		var utterance, utteranceType;
		
		// if we're still in a narrative
		if( i < narrative.length ){

			utterance = narrative[i];

			// get the `type` of object in the scene array
			utteranceType = this.type(utterance);

			// decide which method to run on the scene utterance
			switch(utteranceType) {
				case "string":
					// if the array element is a string pass it to the say method
					this.say(utterance);
				break;
				case "number":
					// if the array element is an integer, pass the int and the array index to the wait method
					this.wait(utterance, i);
				case "object":

					if (utterance.is === "decision") {
						// if the array element is an object pass it to the decide method
						this.decide(utterance);					
					}

				break;
				default:
					this.say(utterance);
			}

		}

	}

	say(utterance){

		var character;
		
		// get a the character from the front of the scene text string
		character = this.getCharactersForNarrative(utterance);

		// if the character in the narrative isn't in the characters setup
		// assume that its the protaganist
		if(!character){

			character = {name: this._perspective};
			
		}else{

			// remove the character from the text string
			utterance = utterance.replace(character.name + ":", "");
		}

		// pass the character and the text to the narrative view
		this._narrativeView.render({utterance: utterance, character: character});

		// increment the progress
		this.incrementProgress();

		// repeat
		this.go();
	}

	decide(decision){

		var decision = new Decision({
			choices: decision.choices,
		});

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