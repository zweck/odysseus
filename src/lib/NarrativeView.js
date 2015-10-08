export default class NarrativeView {

	render(data){

		var template = ` 
			<p class="output">
				${ data.character.name }: ${ data.utterance }
			</p>
		`;

		document.body.innerHTML += template;

		return true;
	}
}