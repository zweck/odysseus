// grab the config
import config from './odesseusfile';

// import the game classes
import Character from "./lib/Character";
import Narrative from "./lib/Narrative";
import Resources from "./lib/Resources";

// import the scenes
var intro = require("./scenes/intro");

// initialise the game resources
let characters = new Character(config.characters);
let resources = new Resources(config.resources);

// load the narrative
let narrative = new Narrative({
	speed: config.speed,
	characters: characters,
	perspective: config.perspective,
});

// entry point
narrative.run(intro);