let config = {

	speed: 5,

	perspective: 1,

	resources: [
		{name: "Killowatts", initial: 10}, 
		{name: "Oxygen",	 initial: 10},
		{name: "Drone",		 initial: 1},
		{name: "Water",		 initial: 10},
	],

	infrastructure: ["Bridge", "Engineering", "Med Bay", "Science Lab"],

	characters: ["CEBS"],

	endGame: [
		{infrastructure: "Bridge", value: false},
		{resources: "Killowatts", value: 0},
	],
};


export default config;