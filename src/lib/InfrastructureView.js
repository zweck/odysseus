export default class InfrastructureView {

	render(data){

		var infrastructureViewWrapper = document.getElementById("infrastructure");
		var infrastructureMenuItems = document.querySelectorAll(".infrastructure");
		var replaceInfrastructure = false;
		var innerTemplate = `${ data.name }: ${ data.status }`;

		var template = ` 
			<p class="infrastructure" data-type="${ data.name }">
				${ innerTemplate }
			</p>
		`;

		if(infrastructureMenuItems.length > 0){
			for (var i = infrastructureMenuItems.length - 1; i >= 0; i--) {
				var infrastructureMenuItem = infrastructureMenuItems[i];
				if(infrastructureMenuItem.attributes["data-type"].value === data.name){
					replaceInfrastructure = true;
					infrastructureMenuItem.innerHTML = innerTemplate;
				}
			};
		}

		if(!replaceInfrastructure){
			infrastructureViewWrapper.innerHTML += template;
		}
	
		return true;
	}
}