export default class NarrativeView {

	render(data){

		var template = ` 
			<p class="output">
				${ data.character.name }: ${ data.utterance }
			</p>
		`;

		document.getElementById("narrative").innerHTML += template;

		return true;
	}
}