export default class DecisionView {

	constructor(options){
		this.decisionInstance = optionsdecisionInstance;
		this._narrative = options.narrative;
	}

	render(){

		var template = '<span class="answer-group">',
			choices = this.decisionInstance.choices;

		for(let i in choices) { 
			var choice = choices[i];
			template+= ` 
				<button>${ choice.text }</button>
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
		var btn = evt.target || evt.srcElement;
		// Get index of selected button
		var idx = 0,
			el = btn;
		while (el.previousSibling) {
			el = el.previousSibling;
			if (el.nodeType == 1) {
				idx ++;
			}
		}
		
		// trigger a decision made event
		this._narrative.trigger("decision:made", {choice: this.decisionInstance.choices[idx]});
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