// grab the config
import config from './odysseusfile';

// import the game classes
import Character from "./lib/Character";
import Narrative from "./lib/Narrative";
import Resources from "./lib/Resources";
import Infrastructure from "./lib/Infrastructure";

// import the Visuals View class to initialize some of the ui properties
import UIView from "./lib/Views/UIView";

// import the scenes
var intro = require("./scenes/intro");

// initialise the game resources
let characters = config.characters.map(function (character) {
	return new Character(character);
});

let resources = config.resources.map(function(resource){
	return new Resources(resource);
});

let infrastructure = config.infrastructure.map(function(infrastructure){
	return new Infrastructure(infrastructure);
});

let ui = config._ui.map(function(ui){
	return new UIView(ui);
});


// load the narrative
let narrative = new Narrative({
	speed: config.speed,
	perspective: config.perspective,
	resources: resources,
	characters: characters,
	infrastructure: infrastructure,
	ui: ui,
});

// entry point
narrative.run(intro, "intro");