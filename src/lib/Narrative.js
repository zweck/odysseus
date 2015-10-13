import NarrativeView from './Views/NarrativeView';
import UIView from './Views/UIView';
import Decision from './Decision';

// map the scenes for require, this currently needs to 
// be done manually until I find a way of dynamically loading modules
let FindDroneScene = require('../scenes/find-drone');

export default class Narrative {
	constructor(options){

		this._narrativeView = new NarrativeView();

		// setup some public properties
		this._speed = options.speed || 1;
		this._perspective = options.perspective;
		this._progress = 0;
		this._characters = options.characters;
		this._resources = options.resources;
		this._infrastructure = options.infrastructure;
		this._ui = options.ui;

		// enable any dev features requested
		this._setupDev(options);

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


		// create an object of infrastructure mapping names against their 
		// resource class instance
		this._infrastructureByName = {};
		this._infrastructure.forEach((infrastructure) => {
			this._infrastructureByName[infrastructure.name] = infrastructure;
		});	


		// create an object of uiview mapping sections against their 
		// resource class instance
		this._uiBySection = {};
		this._ui.forEach((ui) => {
			this._uiBySection[ui.section] = ui;
		});	
	}

	set narrative(scene){
		this._narrative = scene;
	}

	get narrative(){
		return this._narrative;
	}

	/**
	 * This method is the initialiser for the narrative class
	 * @param  {Array<String>} narrative This method takes a scene and runs through it
	 */
	run(scene, sceneName){
		this._narrativeView.scene = sceneName;
		this.narrative = scene;
		this._go();
	}

	moveScene(scene){
		var nextScene = require("../scenes/" + scene);
		this._progress = 0;
		this.run(nextScene, scene);
	}

	/**
	 * This is a scene progress count used in the `_go()` method
	 * @param  {integer} incAmount This is the amount to progress the narrative, default is 1
	 */
	_incrementProgress(incAmount=1){
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
	_textLengthOffset(narrative){
		if( typeof narrative === 'string' || narrative instanceof String ){
			return narrative.length * 50;
		}else{
			return 0;
		}
	}


	_type(utterance){
		var utteranceType = typeof utterance;
		return utteranceType;
	}

	/**
	 * This method is the main scene parser, it iterates through the scene and outputs the narrative into the NarrativeView
	 */
	_go(){

		// grab the current progress
		var i = this._progress;

		// get the scene narrative
		var narrative = this.narrative;

		// initialise some vars
		var utterance, utteranceType;
		
		// if we're still in a narrative
		if( i < narrative.length ){

			utterance = narrative[i];

			// get the `type` of object in the scene array
			utteranceType = this._type(utterance);

			// decide which method to run on the scene utterance
			switch(utteranceType) {
				case "string":
					// if the array element is a string pass it to the say method
					this.say(utterance);

					// increment the progress
					this._incrementProgress();
					
					// repeat
					this._go();
				break;
				case "number":
					// if the array element is an integer, pass the int and the array index to the wait method
					this.wait(utterance, i);
				break;
				case "object":

					if (utterance.is === "decision") {
						this.decide(utterance);					
					}else if (utterance.is === "ui") {
						this.ui(utterance);

						// increment the progress
						this._incrementProgress();
						
						// repeat
						this._go();
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

	}

	ui(ui){

		var uiEffect = ui.effect.split(" ");
		var effect = uiEffect[0].trim().toLowerCase();
		
		if(effect === "disable"){
			effect = false;
		}else if(effect === "enable"){
			effect = true;
		}

		this._uiBySection[uiEffect[1]].state = effect;
	}

	decide(decision){

		this._decision = new Decision({
			choices: decision.choices,
			infrastructure: this._infrastructureByName,
			resources: this._resourcesByName,
			narrative: this,
		});

	}

	wait(waitTime, i){
		var previousNarrative = this.narrative[i-1];
		var time = waitTime * 1000 + this._textLengthOffset(previousNarrative);
		time = time/this._speed;
		this._waitTimer = setTimeout(() => {
			this._incrementProgress();
			this._go();
		}, time);
	}

	/**
	 * Skips to the next utterance (used in development)
	 * @private
	 */
	_skip() {
		if (this._waitTimer) {
			clearTimeout(this._waitTimer);
		}
		this._incrementProgress();
		this._go();
	}

	/**
	 * Sets up any development features that have been requested
	 * @private
	 * @param {object} options hash of options passed to view
	 */
	_setupDev(options) {
		// Set up utterance skipping
		if (options.allowSkip) {
			document.body.addEventListener('keydown', (e) => {
				var keyCode = e.keyCode || e.which;
				if (keyCode === 190) { // '.' to skip
					this._skip();
				}
			});
		}
	}
}