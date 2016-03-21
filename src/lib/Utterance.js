/**
 * @class
 */
class Utterance {

	constructor(entry) {
		this._entry = entry;
	}

	/**
	 * Get a string representation of the utterance (i.e. the original line from the scene)
	 * @return {string}
	 */
	toString() {
		return this._entry;
	}

	/**
	 * @return {string} the type of
	 */

	/**
	 * @return {string|null} the name of the character by whom this utterance is spoken (null if character name absent, i.e. protagonist's line)
	 */
	get characterName() {
		if (!this._characterName) {
			let sections = this._entry.split(":");
			this._characterName = sections.length > 1 ? sections[0].trim() : null;
		}

		return this._characterName;
	}

	/**
	 * @return {string} the utterance without the character name (the entire utterance if protagonist's line)
	 */
	get text() {
		if (!this._text) {
			this._text = this.characterName ? this._entry.split(":").slice(1).join(":").trim() : this._entry;
		}
		return this._text;
	}

}

export default Utterance;
