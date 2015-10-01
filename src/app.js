// grab the config
import config from './odesseusfile';

// import the game classes
import Character from "./lib/Character";
import Narrative from "./lib/Narrative";
import Resources from "./lib/Resources";

// import the scenes
import intro from "./scenes/intro";

// initialise the game
let narrative = new Narrative({
	printOutput: "output"
});
let character = new Character("Phil");
let resources = new Resources(config.resources);


narrative.run(intro);