export default class DecisionView {

	constructor(decisionInstance){
		this.decisionInstance = decisionInstance;
	}

	render(choices){

		var template = "";

		for(let i in choices) { 
			var choice = choices[i];

			var effects = new String;

			// add the effects to the button template. This is weak and 
			// needs to be abstracted and imporved
			for(var k in choice.effects){
				effects = effects + "data-" + k + "=" + JSON.stringify(choice.effects[k]) + " ";
			}

			effects = effects + "data-goto=" + JSON.stringify(choice.goto);

			template+= ` 
				<span class="answer-group">
					<button ${ effects } >${ choice.text }</button>
				</span>
			`;
		} 

		document.getElementById("narrative").innerHTML += template;
		document.getElementById("narrative").scrollTop = document.getElementById("narrative").scrollHeight

		this.bindEvents();

		return true;
	}

	decide(evt){
		for (var i = this.decicionButtons.length - 1; i >= 0; i--) {
			this.decicionButtons[i].disabled = "true";
		};

		this.decisionInstance.decisionEvent = evt;
	}

	bindEvents(){
		this.decicionButtons = document.querySelectorAll(".answer-group button");
		for (var i = this.decicionButtons.length - 1; i >= 0; i--) {
			var button = this.decicionButtons[i];
			if(!button.disabled){
				button.addEventListener("click", evt => this.decide(evt),false);
			}
		};
	}
}