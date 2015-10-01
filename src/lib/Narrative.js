export default class Narrative {
	constructor(options){
		this._narrative;
		this._progress = 0;
		this._output = options.printOutput;
		this._outputElm = document.getElementById(this._output);
	}

	incrementProgress(incAmount){
		var incAmount = incAmount || 1
		this._progress = this._progress + incAmount;
	}

	run(narrative){
		this._narrative = narrative;
		this.go();
	}

	go(){

		var i = this._progress;
		var narrative = this._narrative;

		if( i < narrative.length ){
		
			this._outputElm.innerHTML += narrative[i].say;

			if (narrative[i].wait) {
				this.wait(narrative[i]);
			}else{
				this.incrementProgress();
			}

		}

	}

	wait(narrative){
		var time = narrative.wait * 1000;
		setTimeout(() => {
			this.incrementProgress()
			this.go()
		}, time);
	}
}