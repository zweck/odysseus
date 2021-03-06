import DecisionView from './Views/DecisionView';
import Evented from './Evented';

/**
 * @class
 */
class Decision extends Evented {
	constructor(options){
	
		// super call for Evented constructor
		super();
		
		this._choices = options.choices;
		this._resources = options.resources;
		this._infrastructure = options.infrastructure;
		this._narrative = options.narrative;
		
		this._decisionView = new DecisionView({decisionInstance: this, narrative: this._narrative});

		this.init();
		
		this._narrative.on("decision:made", (data)=>{
			this.selectChoice(data.choice);
		});
	}

	init(){
		this._decisionView.render();
	}

	get choices() {
		return this._choices;
	}

	/**
	 * Selects a choice
	 * @param  {Number} choiceIndex the, er, index of the choice
	 */
	selectChoice(choice) {
		
		// Get choice and its effects
		var effects = choice.effects;
		
		// Apply effects
		Object.keys(effects).forEach((k) => {
			let effect = effects[k];
			switch(k) {
				case "resource":
					this.executeResourceEffect(effect);
				break;
				case "infrastructure":
					this.executeInfrastructureEffect(effect);
				break;
				default:
					console.log(effect);
			}
		});
	}

	/**
	 * Parses and executes a resource effect
	 * @param {string} phrase the text from the effect
	 */
	executeResourceEffect(phrase) {
		let phraseParts = phrase.split(" ");
		let effect = parseInt(phraseParts[0]);
		let resource = phraseParts[1];
		this._resources[resource].incr(effect);
	}

	/**
	 * Parses and executes a resource effect
	 * @param {string} phrase the text from the effect
	 */
	executeInfrastructureEffect(phrase) {
		let phraseParts = phrase.split(" ");
		var effect = phraseParts[0].trim().toLowerCase();
		if(effect === "disable") {
			effect = false;
		} else if (effect === "enable") {
			effect = true;
		}
		let infrastructure = phraseParts[1];
		this._infrastructure[infrastructure].status = effect;
	}
}

export default Decision;