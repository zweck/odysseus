import NarrativeView from './Views/NarrativeView';
import UIView from './Views/UIView';
import Decision from './Decision';
import Utterance from './Utterance';
import Evented from './Evented';

// map the scenes for require, this currently needs to
// be done manually until I find a way of dynamically loading modules
let IntroScene = require('../scenes/intro');
let FindDroneScene = require('../scenes/find-drone');

/**
 * @class
 */
class Narrative extends Evented {
	constructor(options){
		super();

		this.narrativeView = new NarrativeView();

		// setup some public properties
		this._speed = options.speed || 1;
		this._progress = 0;
		this._characters = options.characters;
		this._resources = options.resources;
		this._infrastructure = options.infrastructure;
		this._ui = options.ui;
		this._initialScene = options.initialScene;

		// enable any dev features requested
		this.setupDev(options);

		// create an object of uiview mapping sections against their
		// resource class instance
		this._uiBySection = {};
		this._ui.forEach((ui) => {
			this._uiBySection[ui.section] = ui;
		});

		this.on("decision:made", (data)=>{
			if(!data.isLoading) this.moveScene(data.choice.goto);
		});
	}

	init(){
		var initialScene = require('../scenes/' + this._initialScene);
		this.run(initialScene, this._initialScene);
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
		this.narrativeView.scene = sceneName;
		this.narrative = scene;
		this.go();
	}

	/**
	 * This method loops through the scene until the saved progress of the current scene is reached
	 * @param  {string} scene 		This parameter should contain the scene name saved progress level to skip though
	 * @param  {number} progress 	This parameter should contain point in the scene to skip to
	 */
	loadAtPoint(scene, progress){
		this.narrativeView.scene = scene;
		this.narrative = require("../scenes/" + scene);

		for(var i = 0; i < progress; i++) {
			this._progress = i;
			if (this._waitTimer) {
				clearTimeout(this._waitTimer);
			}
			this.go();
		};
	}

	/**
	 * This method loads the next scene
	 * @param  {string} scene This parameter should contain the scene name for the next scene to load
	 */
	moveScene(scene){
		var nextScene = require("../scenes/" + scene);
		this._progress = 0;
		this.run(nextScene, scene);
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
		return this._characters.charactersByName[name] || false;
	}

	/**
	 * This method offsets the wait time by the amount of characters in the utterance
	 * @param  {string} narrative The utterance from the scene array
	 * @return {number}           The amount of characters * 100ms
	 */
	textLengthOffset(narrative){
		if( typeof narrative === 'string' || narrative instanceof String ){
			return narrative.length * 50;
		}else{
			return 0;
		}
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
		var narrative = this.narrative;

		// if we're still in a narrative
		if( i < narrative.length ){

			// trigger a progress event for the narrative
			this.trigger("progress:narrative", {class: this, narrativeView: this.narrativeView, progress: i});

			let entry = narrative[i];
			// get the `type` of object in the scene array
			let entryType = typeof entry;

			// decide which method to run on the scene utterance
			switch(entryType) {
				case "string":
					// if the array element is a string pass it to the say method
					let utterance = new Utterance(entry),
						characterName = utterance.characterName || this._characters.perspective,
						character = this._characters.charactersByName[characterName];

					character.trigger("character:say", {
						utterance: utterance,
						narrativeView: this.narrativeView
					});

					// increment the progress
					this.incrementProgress();

					// repeat
					this.go();
				break;
				case "number":
					// if the array element is an integer, pass the int and the array index to the wait method
					this.wait(entry, i);
				break;
				case "object":
					if (entry.is === "decision") {
						this.decide(entry);
					}else if (entry.is === "ui") {
						this.ui(entry);

						// increment the progress
						this.incrementProgress();

						// repeat
						this.go();
					}

				break;
				default:
					this.say(utterance);
			}

		}

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
		// trigger the need for a decision to be handled.
		this.trigger("decision:required", {
			decision: decision,
			scene: this.narrativeView.scene,
			progress: this._progress,
			options: {
				choices: decision.choices,
				infrastructure: this._infrastructure.infrastructureByName,
				resources: this._resources.resourcesByName,
				narrative: this
			}
		});
	}

	wait(waitTime, i){
		var previousNarrative = this.narrative[i-1];
		var time = waitTime * 1000 + this.textLengthOffset(previousNarrative);
		time = time/this._speed;
		this._waitTimer = setTimeout(() => {
			this.incrementProgress();
			this.go();
		}, time);
	}

	/**
	 * Skips to the next utterance (used in development)
	 * @private
	 */
	skip() {
		if (this._waitTimer) {
			clearTimeout(this._waitTimer);
		}
		this.incrementProgress();
		this.go();
	}

	/**
	 * Sets up any development features that have been requested
	 * @private
	 * @param {object} options hash of options passed to view
	 */
	setupDev(options) {
		// Set up utterance skipping
		if (options.allowSkip) {
			document.body.addEventListener('keydown', (e) => {
				var keyCode = e.keyCode || e.which;
				if (keyCode === 190) { // '.' to skip
					this.skip();
				}
			});

			document.body.addEventListener('touchend', (e) => {
				this.skip();
			});

			document.body.addEventListener('mousedown', (e) => {
				this.skip();
			});
		}
	}
}

export default Narrative;
