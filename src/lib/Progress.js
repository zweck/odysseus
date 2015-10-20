/**
 * @class
 */
class Progress {

	constructor(options){

		// setup some private classes
		this._resources = options.resources;
		this._infrastructure = options.infrastructure;
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

		for(var resource in this._resources.resourcesByName){
			this._resources.on("change:resource:" + resource, function(data){ self.resourcesChanged(data) });
		}

	}

	/**
	 * Called once a resource has been changed, it creates a flattened js object to put into localstorage
	 */
	resourcesChanged(){
		var strippedResources = {};

		for(var resourceObject in this._resources.resourcesByName){
			strippedResources[resourceObject] = this._resources.resourcesByName[resourceObject].level;
		}

		this.resourceProgress = strippedResources;
	}

	get resourceProgress(){
		var progressJSON = localStorage.getItem("resourcesProgress");
		return progressJSON;
	}

	set resourceProgress(resourceObject){
		var resourceJSON = JSON.stringify(resourceObject);
		localStorage.setItem("resourcesProgress", resourceJSON);
	}



	/**
	 * Called whenever the narrative advances and saves the progress into localstorage
	 */
	set narrativeProgress(data){
		var narrativeJSON = JSON.stringify(data);
		localStorage.setItem("narrativeProgress", narrativeJSON);
	}

	get narrativeProgress(){
		return JSON.parse(localStorage.getItem("narrativeProgress"));
	}


	/**
	 * The load method loads all the various saved states
	 * @method
	 */
	load(){

		// load the resources
		var resourceProgressObject = JSON.parse(this.resourceProgress);
		if(resourceProgressObject){
			for(var resourceObject in this._resources.resourcesByName){
				this._resources.resourcesByName[resourceObject].overrideLevel(resourceProgressObject[resourceObject]);
			}
		}

		// load the narrative
		var scene = "intro", progress = 0;
		if(this.narrativeProgress){
			progress = this.narrativeProgress.progress;
			if(progress < 0){ progress = progress - 1 }
			scene = this.narrativeProgress.scene;
		}

		this._narrative.moveScene(scene, progress);		

	}

	/**
	 * Purge localstorage
	 * @method
	 */
	reset(){
		localStorage.removeItem("resourcesProgress");
	}
}

export default Progress;