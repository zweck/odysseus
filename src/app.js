// grab the config
import config from './odesseusfile';

// import the game classes
import Character from "./lib/Character";
import Narrative from "./lib/Narrative";
import Resources from "./lib/Resources";

// import the scenes
var intro = require("./scenes/intro");

// initialise the game resources
let characters = config.characters.map(function (character) {
	return new Character(character);
});

let resources = config.resources.map(function(resource){
	return new Resources(resource);
});

// load the narrative
let narrative = new Narrative({
	speed: config.speed,
	perspective: config.perspective,
	resources: resources,
	characters: characters,
});

// entry point
narrative.run(intro);