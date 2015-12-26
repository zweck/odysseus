/**
 * @class
 */
class Progress {

	constructor(options){

		// setup some private classes
		this._narrative = options.narrative;

		// bind to events for progress saving
		this.bindEvents();
	}

	/**
	 * This method binds our events for tracking progress
	 */
	bindEvents(){
		var self = this;
		this._narrative.on("progress:narrative", (data)=>{ 
			this.progress = data 
		});
		this._narrative.on("decision:made", (data)=>{ 
			this.progress = data;
		});
	}
	
	type(instance){
		return instance.constructor.name;
	}

	set loading(state){
		this._loading = state ? true : false;
	}

	get loading(){
		return this._loading || false;
	}

	/**
	 * Called whenever the narrative advances and saves the progress into localstorage
	 */
	set progress(advancement){
	
		if(!this.loading){

			var eventType = this.type(advancement.class),
				progress = this.progress,
				adv = advancement;
				
			// replace the class object with the type
			delete adv.class
			adv.type = eventType;
		
			switch(eventType) {
				case "Decision":
					// if a decision event has occured, save the choice
					progress.push(adv);
				break;
				case "Narrative":
					var newScene = true;
			
					// loop through the narrative progress object from local storage
					for (var i = progress.length - 1; i >= 0; i--) {
					
						// if you are in the same scene as the current narrative
						if(progress[i].scene === adv.scene){
						
							// then set the progress for that item to the current progress point
							progress[i].progress = adv.progress;
							newScene = false;
						}
					};
			
					// if you have entered a new scene then save the whole event data
					if(newScene){
						progress.push(adv);
					}
					
				break;
				default:

			}
			
			// save the progress object to localStorage
			var progressJSON = JSON.stringify(progress);
			localStorage.setItem("progress", progressJSON);
		}
	}

	get progress(){
		var progress = JSON.parse(localStorage.getItem("progress"));
		return progress || [];
	}


	/**
	 * The load method loads all the various saved states
	 * @method
	 */
	load(){
	
		// load the narrative by looping through the narrative
		// progress and jumping through each stage
		var scene, progress;

		this.loading = true;
		
		if(this.progress.length > 0){

			// loop though the saved scenes
			for (var i = 0; i < this.progress.length; i++) {
				
				
				switch(this.progress[i].type) {
					case "Decision":
						this._narrative.trigger("decision:made", {choice: this.progress[i].choice});
					break;
					case "Narrative":
						
						// grab the progress data from them
						progress = this.progress[i].progress;
						scene = this.progress[i].scene;
						
						// if there is no progress for a saved scene set it to 1 
						if(progress === 0){ progress = 1 }
		
						// load the scene at the progress point
						this._narrative.loadAtPoint(scene, progress);
						
					break;
					default:
		
				}
						
			};

		// if there is no saved state, then just start from the begining
		}else{
			this._narrative.run(require("../scenes/" + this._narrative.initialScene), this._narrative.initialScene);
		}

		this.loading = false;

	}

	/**
	 * Purge localstorage
	 * @method
	 */
	reset(){
		localStorage.removeItem("progress");
	}
}

export default Progress;