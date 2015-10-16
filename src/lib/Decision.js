import DecisionView from './Views/DecisionView';

/**
 * @class
 */
class Decision {
	constructor(options){
		this._choices = options.choices;
		this._resources = options.resources;
		this._infrastructure = options.infrastructure;
		this._decisionView = new DecisionView(this);
		this._narrative = options.narrative;

		this.init();
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
	selectChoice(choiceIndex) {
		// Get choice and its effects
		var choice = this._choices[choiceIndex],
			effects = choice.effects;

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

		// Goto next scene as directed
		this._narrative.moveScene(choice.goto);
	}

	/**
	 * Parses and executes a resource effect
	 * @param {string} phrase the text from the effect
	 */
	executeResourceEffect(phrase) {
		let phraseParts = phrase.split(" ");
		let effect = parseInt(phraseParts[0]);
		let resource = phraseParts[1];
		this._resources[resource].level = effect;
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