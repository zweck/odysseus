/**
 * @class
 */
class Progress {

	constructor(options){

		// setup some private classes
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
	}

	set decision(decisionObject){

	}

	get decision(){

	}


	/**
	 * Called whenever the narrative advances and saves the progress into localstorage
	 */
	set narrativeProgress(data){
		var narrativeProgress = this.narrativeProgress;
		var newScene = true;

		// loop through the narrative progress object from local storage
		for (var i = narrativeProgress.length - 1; i >= 0; i--) {
		
			// if you are in the same scene as the current narrative
			if(narrativeProgress[i].scene === data.scene){
			
				// then set the progress for that item to the current progress point
				narrativeProgress[i].progress = data.progress;
				newScene = false;
			}
		};

		// if you have entered a new scene then save the whole event data
		if(newScene){
			narrativeProgress.push(data);
		}
		
		// save the progress object to localStorage
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

		// load the narrative by looping through the narrative
		// progress and jumping through each stage
		var scene, progress;
		if(this.narrativeProgress.length > 0){

			// loop though the saved scenes
			for (var i = 0; i < this.narrativeProgress.length; i++) {
				
				// grab the progress data from them
				progress = this.narrativeProgress[i].progress;
				scene = this.narrativeProgress[i].scene;
				
				// if there is no progress for a saved scene set it to 1 
				if(progress === 0){ progress = 1 }

				// load the scene at the progress point
				this._narrative.loadAtPoint(scene, progress);		
			};

		// if there is no saved state, then just start from the begining
		}else{
			this._narrative.run(require("../scenes/" + this._narrative.initialScene), this._narrative.initialScene);
		}

	}

	/**
	 * Purge localstorage
	 * @method
	 */
	reset(){
		localStorage.removeItem("decisionProgress");
		localStorage.removeItem("narrativeProgress");
	}
}

export default Progress;