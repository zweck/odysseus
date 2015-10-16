/**
 * @class
 */
class Progress {

	get progress(){

		localStorage.getItem("progress");

		return this._progress;
	}

	set progress(progress){
		this._progress = progress;
	}
}

export default Progress;