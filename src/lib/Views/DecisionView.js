export default class DecisionView {

	constructor(decisionInstance){
		this.decisionInstance = decisionInstance;
	}

	render(){

		var template = '<span class="answer-group">',
			choices = this.decisionInstance.choices;

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
				
					<button ${ effects } >${ choice.text }</button>
			`;
		}
		template += "</span>";

		document.getElementById("narrative").innerHTML += template;
		document.getElementById("narrative").scrollTop = document.getElementById("narrative").scrollHeight

		this.bindEvents();

		return true;
	}

	decide(evt){
		// Disable buttons
		for (var i = this.decicionButtons.length - 1; i >= 0; i--) {
			this.decicionButtons[i].disabled = "true";
		};
		// Get selected button
		var btn = evt.target || event.srcElement;
		// Get index of selected button
		var idx = 0,
			el = btn;
		while (el.previousSibling) {
			el = el.previousSibling;
			console.log(el)
			if (el.nodeType == 1) {
				idx ++;
			}
		}
		this.decisionInstance.selectChoice(idx);
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