import DecisionView from './Views/DecisionView';

export default class Decision {
	constructor(options){
		this._choices = options.choices;
		this._resources = options.resources;
		this._infrastructure = options.infrastructure;
		this._decisionView = new DecisionView(this);
		this._narrative = options.narrative;
		this._globalProgress = options.globalProgress;

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
			switch(k) {
				case "resource":
					var resourceEffect = effects[k].split(" ");
					var effect = parseInt(resourceEffect[0]);
					var resource = resourceEffect[1];
					this._resources[resource].level = effect;
				break;
				case "infrastructure":
					var infrastructureEffect = effects[k].split(" ");
					var effect = infrastructureEffect[0].trim().toLowerCase();
					if(effect === "disable"){
						effect = false;
					}else if(effect === "enable"){
						effect = true;
					}
					var infrastructure = infrastructureEffect[1];
					this._infrastructure[infrastructure].status = effect;
				break;
				default:
					console.log(effects[k]);
			}
		});

		this._globalProgress.decisions = choice;

		// Goto next scene as directed
		this._narrative.moveScene(choice.goto);
	}
}