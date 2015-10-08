import DecisionView from './DecisionView';

export default class Decision {
	constructor(options){
		this._choices = options.choices;
		this._resources = options.resources;
		this._decisionView = new DecisionView(this);

		this.init();
	}

	init(){
		this._decisionView.render(this._choices);
	}

	get decisionEvent(){
		return this._decisionEvent;
	}

	set decisionEvent(evt){
		this._decisionEvent = evt;
		this.concequences();
	}

	concequences(){
		var attributes = this.decisionEvent.srcElement.dataset;
		
		for(var k in attributes) {

			switch(k) {
				case "resource":
					var resourceEffect = attributes[k].split(" ");
					var effect = parseInt(resourceEffect[0]);
					var resource = resourceEffect[1];
					this._resources[resource].level = effect;
				break;
				case "infrastructure":
					console.log(attributes[k]);
				break;
				default:
					console.log(attributes[k]);
			}
		};
	}
}