// grab the config
import config from './odysseusfile';

// import the game classes
import Narrative from "./lib/Narrative";
import Progress from './lib/Progress';

// import the asset manager classes
import InfrastructureManager from "./lib/InfrastructureManager";
import ResourceManager from "./lib/ResourceManager";
import CharacterManager from "./lib/CharacterManager";
import DecisionManager from "./lib/DecisionManager";

// import the Visuals View class to initialize some of the ui properties
import UIView from "./lib/Views/UIView";

let ui = config.ui.map(function(ui){
	return new UIView(ui);
});

// init the asset managers
let resources = new ResourceManager(config.resources);
let infrastructure = new InfrastructureManager(config.infrastructure);
let characters = new CharacterManager(config.characters);

// pull any dev overrides from querystring
// @todo use something like @link https://www.npmjs.com/package/nconf for hierarchical, environment-based configs, instead of querystring
// @todo figure out a cleaner strategy for using common-js requires alongside es6 (too lazy to google just now)
let queryString = require('querystring').parse(window.location.toString().split('?').pop()), ignoreSave;
if (Object.keys(queryString).indexOf('dev') !== -1) {
	config.environment = 'development';
}
if(Object.keys(queryString).indexOf('ignoreSave') !== -1){
	ignoreSave = true;
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
	initialScene: config.initialScene,
});

let progress = new Progress({
	narrative: narrative,
});

let decision = new DecisionManager({
	narrative: narrative,
});

// if the loadSave param is passed then... load the save
if(ignoreSave){
	progress.reset();
	narrative.init();
}else{
	progress.load();
}


