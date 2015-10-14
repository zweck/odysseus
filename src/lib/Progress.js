export default class Progress {

	constructor(options){
		this._resources = options.resources;
		this._infrastructure = options.infrastructure;
		this._narrative;
	}

	get narrative(){
		var progressJSON = localStorage.getItem("narrativeProgress");
		return progressJSON;
	}

	set narrative(progressObject){
		var storedProgressJSON = localStorage.getItem("narrativeProgress");

		if(storedProgressJSON){
			storedProgressJSON = JSON.parse(storedProgressJSON);

			var progressObjectKeys = Object.keys(progressObject);

			for (var i = progressObjectKeys.length - 1; i >= 0; i--) {
				storedProgressJSON[progressObjectKeys[i]] = progressObject[progressObjectKeys[i]];
			};			
		}else{
			storedProgressJSON = progressObject;
		}


		localStorage.setItem("narrativeProgress", JSON.stringify(storedProgressJSON));
	}

	get infrastructure(){
		var progressJSON = localStorage.getItem("infrastructureProgress");
		return progressJSON;
	}

	set infrastructure(progressObject){

	}

	get resources(){
		var progressJSON = localStorage.getItem("resourcesProgress");
		return progressJSON;
	}

	set resources(progressObject){

	}
}