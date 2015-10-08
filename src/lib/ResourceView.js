export default class ResourceView {

	render(data){

		var template = ` 
			<p class="resources">
				${ data.name }: ${ data.level }
			</p>
		`;

		document.getElementById("menu").innerHTML += template;

		return true;
	}
}