let scene = [
	"CEBS: Hello...", 
	3,
	"CEBS: Glad to see you're finally awake",
	5,
	"Whats going on? I can't see anything!",
	3,
	"I can't move! Help me!",
	2,
	"CEBS: Don't worry the rescue party will be here soon, a beacon went up a few hours ago. Right now we've got bigger problems. The ships got several hull breaches and we need to focus what little energy we have.",
	3,
	"CEBS: Life support systems are back online but we're running on reserve power. There'a an O2 leak in engineering too.",
	2,
	"CEBS: What do you want to do?",
	{
		is: "decision",
		choices: [
			{
				text: "Seal engineering",
				effects: {
					resource: "-5 Killowatts",
					infrastructure: "Disable Engineering"
				},
				goto: "find-drone",
			},
			{
				text: "Fix the backup generator",
				effects: {
					resource: "-7 Killowatts"
				},
				goto: "o2-leaking",
			}
		]
	}
]

module.exports = scene;