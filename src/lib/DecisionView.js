export default class DecisionView {

	render(choices){

		var template = "";

		for(let i in choices) { 
			var choice = choices[i].text;
			template+= ` \
				<span class="answer">\
					<button>${ choice }</button>\
				</span>\
			`;
		} 

		document.body.innerHTML += template;

		return true;
	}
}