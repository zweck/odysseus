let config = {

	speed: 100,

	perspective: "Me",

	resources: [
		{name: "Killowatts", initial: 10}, 
		{name: "Oxygen",	 initial: 10},
		{name: "Drone",		 initial: 1},
		{name: "Water",		 initial: 10},
	],

	infrastructure: [
		{name: "Bridge", 		status: true}, 
		{name: "Engineering", 	status: true},
		{name: "Med Bay", 		status: false},
		{name: "Science Lab", 	status: false},
	],

	characters: ["CEBS"],

	endGame: [
		{infrastructure: "Bridge", value: false},
		{resources: "Killowatts", value: 0},
	],
};


export default config;