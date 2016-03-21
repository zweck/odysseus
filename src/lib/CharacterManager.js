import Character from './Character';
import Evented from './Evented';

/**
 * @class
 */
class CharacterManager extends Evented {

	/**
 	 * @description The classes constructure which calls the super() and sets up some properties as well as creating the events
	 * @param  {array<object>} characters An array of characters e.g [{name: Killowatts, initial: 10}, {name: o2, initial: 5}]
	 */
	constructor(options){
		super();

		/**
		 * @public
		 */
		this.charactersByName = {};
		this.characters = options.characters;
		this.perspective = options.perspective;

		// add a default player character
		this.characters.push("PLAYER");

		this.characters.forEach( (character) => {
			character = new Character({character: character, perspective: this.perspective});
			this.charactersByName[character.name] = character;
		});
	}
}

export default CharacterManager;
