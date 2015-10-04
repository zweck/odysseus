import NarrativeView from './NarrativeView';

export default class Narrative {
	constructor(options){

		this._narrativeView = new NarrativeView();

		// setup some public properties
		this._narrative;
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

	/**_narrativeView
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

	go(){

		var i = this._progress;
		var narrative = this._narrative;
		var character, say;
		
		if( i < narrative.length ){
		
			if (!parseInt(narrative[i])) {

				character = this.getCharactersForNarrative(narrative[i]);

				say = narrative[i];

				// if the character in the narrative isn't in the characters setup
				// assume that its the protaganist
				if(!character){

					switch(this._perspective) {
						case 1:
							character = "me";
						break;
						case 3:
							character = "you";
						break;
						default:
							character = "me";
					}
					
				}else{
					say = narrative[i].replace(character + ":", "");
				}

				this._narrativeView.render({output: say, character: character});
				this.incrementProgress();
				this.go();
			}else{
				this.wait(narrative[i]);
			}

		}

	}

	wait(waitTime){
		var time = waitTime * 1000;
		setTimeout(() => {
			this.incrementProgress();
			this.go();
		}, time);
	}
}