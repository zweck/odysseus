import Character from './Character';

export default class CharacterManager {

	constructor(characters){
		this.characters = characters;
		this.charactersByName = {};

		this.characters.forEach((character) => {
			this.character = character;
		});
	}

	set character(character){
		var character = new Character(character);
		this.charactersByName[character.name] = character;
	}
}