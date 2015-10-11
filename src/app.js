// grab the config
import config from './odesseusfile';

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

// pull any dev overrides from querystring
// @todo use something like @link https://www.npmjs.com/package/nconf for hierarchical, environment-based configs, instead of querystring
// @todo figure out a cleaner strategy for using common-js requires alongside es6 (too lazy to google just now)
let queryString = require('querystring').parse(window.location.toString().split('?').pop());
if (Object.keys(queryString).indexOf('dev') !== -1) {
	config.environment = 'development';
}

// load the narrative
let narrative = new Narrative({
	allowSkip: config.environment === 'development',
	speed: config.speed,
	perspective: config.perspective,
	resources: resources,
	characters: characters,
	infrastructure: infrastructure,
	ui: ui,
});

// entry point
narrative.run(intro, "intro");