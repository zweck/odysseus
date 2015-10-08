export default class ResourceView {

	render(data){

		var resourceViewWrapper = document.getElementById("resources");
		var resourceMenuItems = document.querySelectorAll(".resource");
		var replaceResource = false;
		var innerTemplate = `${ data.name }: ${ data.level }`;

		var template = ` 
			<p class="resource" data-type="${ data.name }">
				${ innerTemplate }
			</p>
		`;

		if(resourceMenuItems.length > 0){
			for (var i = resourceMenuItems.length - 1; i >= 0; i--) {
				var resourceMenuItem = resourceMenuItems[i];
				if(resourceMenuItem.attributes["data-type"].value === data.name){
					replaceResource = true;
					resourceMenuItem.innerHTML = innerTemplate;
				}
			};
		}

		if(!replaceResource){
			resourceViewWrapper.innerHTML += template;
		}
	
		return true;
	}
}