import NarrativeView from './NarrativeView';
import DecisionView from './DecisionView';

export default class Narrative {
	constructor(options){

		this._narrativeView = new NarrativeView();
		this._decisionView = new DecisionView();

		// setup some public properties
		this._narrative;
		this._speed = options.speed || 1;
		this._perspective = options.perspective;
		this._characters = options.characters._names;
		this._progress = 0;
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
		var character = narrative.split(":")[0].trim();
		if(this._characters.indexOf(character) < 0){
			return false;
		}else{
			return character;
		}
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
		var character, utterance;
		
		// if we're still in a narrative
		if( i < narrative.length ){

			// and if the next element in the scene array is text
			if (!parseInt(narrative[i]) && !narrative[i].is) {

				utterance = narrative[i];

				// get a the character from the front of the scene text string
				character = this.getCharactersForNarrative(utterance);

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
					utterance = utterance.replace(character + ":", "");
				}

				// pass the character and the text to the narrative view
				this._narrativeView.render({output: utterance, character: character});

				// increment the progress
				this.incrementProgress();

				// repeat
				this.go();
			}else if (parseInt(narrative[i])){

				// if the array element is an integer, pass the int and the array index to the wait method
				this.wait(narrative[i], i);
			}else if(narrative[i].is === "decision"){
				this.decide(narrative[i]);
			}

		}

	}

	decide(decision){
		this._decisionView.render(decision.choices);
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