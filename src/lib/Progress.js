/**
 * @class
 */
class Progress {

	constructor(options){

		// setup some private classes
		// this._resources = options.resources;
		// this._infrastructure = options.infrastructure;
		this._narrative = options.narrative;

		// bind to events for progress saving
		this.bindResourceChange();
	}

	/**
	 * This method binds our events for tracking progress
	 */
	bindResourceChange(){

		var self = this;

		this._narrative.on("progress:narrative", function(data){ self.narrativeProgress = data });

		// for(var resource in this._resources.resourcesByName){
		// 	this._resources.on("change:resource:" + resource, function(data){ self.resourcesChanged(data) });
		// }

	}

	set decision(decisionObject){

	}

	get decision(){

	}

	// /**
	//  * Called once a resource has been changed, it creates a flattened js object to put into localstorage
	//  */
	// resourcesChanged(){
	// 	var strippedResources = {};

	// 	for(var resourceObject in this._resources.resourcesByName){
	// 		strippedResources[resourceObject] = this._resources.resourcesByName[resourceObject].level;
	// 	}

	// 	this.resourceProgress = strippedResources;
	// }

	// get resourceProgress(){
	// 	var progressJSON = localStorage.getItem("resourcesProgress");
	// 	return progressJSON;
	// }

	// set resourceProgress(resourceObject){
	// 	var resourceJSON = JSON.stringify(resourceObject);
	// 	localStorage.setItem("resourcesProgress", resourceJSON);
	// }



	/**
	 * Called whenever the narrative advances and saves the progress into localstorage
	 */
	set narrativeProgress(data){
		var narrativeProgress = this.narrativeProgress;
		var newScene = true;

		for (var i = narrativeProgress.length - 1; i >= 0; i--) {
			if(narrativeProgress[i].scene == data.scene){
				narrativeProgress[i].progress = data.progress;
				newScene = false;
			}
		};

		if(newScene){
			narrativeProgress.push(data);
		}

		var narrativeJSON = JSON.stringify(narrativeProgress);
		localStorage.setItem("narrativeProgress", narrativeJSON);
	}

	get narrativeProgress(){
		var narrativeProgress = JSON.parse(localStorage.getItem("narrativeProgress"))
		return narrativeProgress || [];
	}


	/**
	 * The load method loads all the various saved states
	 * @method
	 */
	load(){

		// // load the resources
		// var resourceProgressObject = JSON.parse(this.resourceProgress);
		// if(resourceProgressObject){
		// 	for(var resourceObject in this._resources.resourcesByName){
		// 		this._resources.resourcesByName[resourceObject].overrideLevel(resourceProgressObject[resourceObject]);
		// 	}
		// }

		// load the narrative by looping through the narrative
		// progress and jumping through each stage
		var scene, progress;
		if(this.narrativeProgress.length > 0){

			for (var i = 0; i < this.narrativeProgress.length; i++) {
				progress = this.narrativeProgress[i].progress;
				scene = this.narrativeProgress[i].scene;

				if(progress === 0){ progress = 1 }
				this._narrative.loadAtPoint(scene, progress);		
			};

		}else{
			this._narrative.run(require("../scenes/intro"), "intro");
		}

	}

	/**
	 * Purge localstorage
	 * @method
	 */
	reset(){
		// localStorage.removeItem("resourcesProgress");
		localStorage.removeItem("narrativeProgress");
	}
}

export default Progress;