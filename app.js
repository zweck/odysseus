(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// grab the config
"use strict";

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _odysseusfile = require('./odysseusfile');

var _odysseusfile2 = _interopRequireDefault(_odysseusfile);

// import the game classes

var _libCharacter = require("./lib/Character");

var _libCharacter2 = _interopRequireDefault(_libCharacter);

var _libNarrative = require("./lib/Narrative");

var _libNarrative2 = _interopRequireDefault(_libNarrative);

var _libResources = require("./lib/Resources");

var _libResources2 = _interopRequireDefault(_libResources);

var _libInfrastructure = require("./lib/Infrastructure");

var _libInfrastructure2 = _interopRequireDefault(_libInfrastructure);

// import the Visuals View class to initialize some of the ui properties

var _libViewsUIView = require("./lib/Views/UIView");

var _libViewsUIView2 = _interopRequireDefault(_libViewsUIView);

// import the scenes
var intro = require("./scenes/intro");

// initialise the game resources
var characters = _odysseusfile2["default"].characters.map(function (character) {
	return new _libCharacter2["default"](character);
});

var resources = _odysseusfile2["default"].resources.map(function (resource) {
	return new _libResources2["default"](resource);
});

var infrastructure = _odysseusfile2["default"].infrastructure.map(function (infrastructure) {
	return new _libInfrastructure2["default"](infrastructure);
});

var ui = _odysseusfile2["default"]._ui.map(function (ui) {
	return new _libViewsUIView2["default"](ui);
});

// load the narrative
var narrative = new _libNarrative2["default"]({
	speed: _odysseusfile2["default"].speed,
	perspective: _odysseusfile2["default"].perspective,
	resources: resources,
	characters: characters,
	infrastructure: infrastructure,
	ui: ui
});

// entry point
narrative.run(intro, "intro");

},{"./lib/Character":2,"./lib/Infrastructure":4,"./lib/Narrative":5,"./lib/Resources":6,"./lib/Views/UIView":11,"./odysseusfile":12,"./scenes/intro":14}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Character = (function () {
	function Character(name) {
		_classCallCheck(this, Character);

		this.name = name;
	}

	_createClass(Character, [{
		key: "say",
		value: function say() {}
	}]);

	return Character;
})();

exports["default"] = Character;
module.exports = exports["default"];

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _ViewsDecisionView = require('./Views/DecisionView');

var _ViewsDecisionView2 = _interopRequireDefault(_ViewsDecisionView);

var Decision = (function () {
	function Decision(options) {
		_classCallCheck(this, Decision);

		this._choices = options.choices;
		this._resources = options.resources;
		this._infrastructure = options.infrastructure;
		this._decisionView = new _ViewsDecisionView2["default"](this);
		this._narrative = options.narrative;

		this.init();
	}

	_createClass(Decision, [{
		key: "init",
		value: function init() {
			this._decisionView.render(this._choices);
		}
	}, {
		key: "concequences",
		value: function concequences() {
			var attributes = this.decisionEvent.srcElement.dataset;

			for (var k in attributes) {

				switch (k) {
					case "resource":
						var resourceEffect = attributes[k].split(" ");
						var effect = parseInt(resourceEffect[0]);
						var resource = resourceEffect[1];
						this._resources[resource].level = effect;
						break;
					case "infrastructure":
						var infrastructureEffect = attributes[k].split(" ");
						var effect = infrastructureEffect[0].trim().toLowerCase();
						if (effect === "disable") {
							effect = false;
						} else if (effect === "enable") {
							effect = true;
						}
						var infrastructure = infrastructureEffect[1];
						this._infrastructure[infrastructure].status = effect;
						break;
					default:
						console.log(attributes[k]);
				}
			};

			this._narrative.moveScene(attributes["goto"]);
		}
	}, {
		key: "decisionEvent",
		get: function get() {
			return this._decisionEvent;
		},
		set: function set(evt) {
			this._decisionEvent = evt;
			this.concequences();
		}
	}]);

	return Decision;
})();

exports["default"] = Decision;
module.exports = exports["default"];

},{"./Views/DecisionView":7}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _ViewsInfrastructureView = require('./Views/InfrastructureView');

var _ViewsInfrastructureView2 = _interopRequireDefault(_ViewsInfrastructureView);

var Infrastructure = (function () {
	function Infrastructure(options) {
		_classCallCheck(this, Infrastructure);

		this.name = options.name;
		this._status = options.status;

		this._infrastructureView = new _ViewsInfrastructureView2['default']();
		this._infrastructureView.render({ name: this.name, status: this.status });
	}

	_createClass(Infrastructure, [{
		key: 'status',
		get: function get() {
			return this._status;
		},
		set: function set(status) {
			this._status = status;
			this._infrastructureView.render({ name: this.name, status: this.status });
		}
	}]);

	return Infrastructure;
})();

exports['default'] = Infrastructure;
module.exports = exports['default'];

},{"./Views/InfrastructureView":8}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _ViewsNarrativeView = require('./Views/NarrativeView');

var _ViewsNarrativeView2 = _interopRequireDefault(_ViewsNarrativeView);

var _ViewsUIView = require('./Views/UIView');

var _ViewsUIView2 = _interopRequireDefault(_ViewsUIView);

var _Decision = require('./Decision');

var _Decision2 = _interopRequireDefault(_Decision);

// map the scenes for require, this currently needs to
// be done manually until I find a way of dynamically loading modules
var FindDroneScene = require('../scenes/find-drone');

var Narrative = (function () {
	function Narrative(options) {
		var _this = this;

		_classCallCheck(this, Narrative);

		this._narrativeView = new _ViewsNarrativeView2['default']();

		// setup some public properties
		this._speed = options.speed || 1;
		this._perspective = options.perspective;
		this._progress = 0;
		this._characters = options.characters;
		this._resources = options.resources;
		this._infrastructure = options.infrastructure;
		this._ui = options.ui;

		// create an object of characters mapping names against their
		// character class instance
		this._charactersByName = {};
		this._characters.forEach(function (character) {
			_this._charactersByName[character.name] = character;
		});

		// create an object of resources mapping names against their
		// resource class instance
		this._resourcesByName = {};
		this._resources.forEach(function (resource) {
			_this._resourcesByName[resource.name] = resource;
		});

		// create an object of infrastructure mapping names against their
		// resource class instance
		this._infrastructureByName = {};
		this._infrastructure.forEach(function (infrastructure) {
			_this._infrastructureByName[infrastructure.name] = infrastructure;
		});

		// create an object of uiview mapping sections against their
		// resource class instance
		this._uiBySection = {};
		this._ui.forEach(function (ui) {
			_this._uiBySection[ui.section] = ui;
		});
	}

	_createClass(Narrative, [{
		key: 'run',

		/**
   * This method is the initialiser for the narrative class
   * @param  {Array<String>} narrative This method takes a scene and runs through it
   */
		value: function run(scene, sceneName) {
			this._narrativeView.scene = sceneName;
			this.narrative = scene;
			this.go();
		}

		/**
   * This is a scene progress count used in the `go()` method
   * @param  {integer} incAmount This is the amount to progress the narrative, default is 1
   */
	}, {
		key: 'incrementProgress',
		value: function incrementProgress() {
			var incAmount = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];

			var incAmount = incAmount;
			this._progress = this._progress + incAmount;
		}

		/**
   * This method parses out the character at the start of the utterance and checks that they exist in the character class
   * @param  {string} narrative The utterance from the scene array
   * @return {string} character The character name from the utterance
   */
	}, {
		key: 'getCharactersForNarrative',
		value: function getCharactersForNarrative(narrative) {
			var name = narrative.split(":")[0].trim();
			return this._charactersByName[name] || false;
		}

		/**
   * This method offsets the wait time by the amount of characters in the utterance
   * @param  {string} narrative The utterance from the scene array
   * @return {number}           The amount of characters * 100ms
   */
	}, {
		key: 'textLengthOffset',
		value: function textLengthOffset(narrative) {
			return narrative.length * 100;
		}
	}, {
		key: 'type',
		value: function type(utterance) {
			var utteranceType = typeof utterance;
			return utteranceType;
		}
	}, {
		key: 'moveScene',
		value: function moveScene(scene) {
			var nextScene = require("../scenes/" + scene);
			this._progress = 0;
			this.run(nextScene, scene);
		}

		/**
   * This method is the main scene parser, it iterates through the scene and outputs the narrative into the NarrativeView
   */
	}, {
		key: 'go',
		value: function go() {

			// grab the current progress
			var i = this._progress;

			// get the scene narrative
			var narrative = this.narrative;

			// initialise some vars
			var utterance, utteranceType;

			// if we're still in a narrative
			if (i < narrative.length) {

				utterance = narrative[i];

				// get the `type` of object in the scene array
				utteranceType = this.type(utterance);

				// decide which method to run on the scene utterance
				switch (utteranceType) {
					case "string":
						// if the array element is a string pass it to the say method
						this.say(utterance);

						// increment the progress
						this.incrementProgress();

						// repeat
						this.go();
						break;
					case "number":
						// if the array element is an integer, pass the int and the array index to the wait method
						this.wait(utterance, i);
						break;
					case "object":

						if (utterance.is === "decision") {
							this.decide(utterance);
						} else if (utterance.is === "ui") {
							this.ui(utterance);

							// increment the progress
							this.incrementProgress();

							// repeat
							this.go();
						}

						break;
					default:
						this.say(utterance);
				}
			}
		}
	}, {
		key: 'say',
		value: function say(utterance) {

			var character;

			// get a the character from the front of the scene text string
			character = this.getCharactersForNarrative(utterance);

			// if the character in the narrative isn't in the characters setup
			// assume that its the protaganist
			if (!character) {

				character = { name: this._perspective };
			} else {

				// remove the character from the text string
				utterance = utterance.replace(character.name + ":", "");
			}

			// pass the character and the text to the narrative view
			this._narrativeView.render({ utterance: utterance, character: character });
		}
	}, {
		key: 'ui',
		value: function ui(_ui) {

			var uiEffect = _ui.effect.split(" ");
			var effect = uiEffect[0].trim().toLowerCase();

			if (effect === "disable") {
				effect = false;
			} else if (effect === "enable") {
				effect = true;
			}

			this._uiBySection[uiEffect[1]].state = effect;
		}
	}, {
		key: 'decide',
		value: function decide(decision) {

			this._decision = new _Decision2['default']({
				choices: decision.choices,
				infrastructure: this._infrastructureByName,
				resources: this._resourcesByName,
				narrative: this
			});
		}
	}, {
		key: 'wait',
		value: function wait(waitTime, i) {
			var _this2 = this;

			var previousNarrative = this.narrative[i - 1];
			var time = waitTime * 1000 + this.textLengthOffset(previousNarrative);
			time = time / this._speed;
			setTimeout(function () {
				_this2.incrementProgress();
				_this2.go();
			}, time);
		}
	}, {
		key: 'narrative',
		set: function set(scene) {
			this._narrative = scene;
		},
		get: function get() {
			return this._narrative;
		}
	}]);

	return Narrative;
})();

exports['default'] = Narrative;
module.exports = exports['default'];

},{"../scenes/find-drone":13,"./Decision":3,"./Views/NarrativeView":9,"./Views/UIView":11}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _ViewsResourceView = require('./Views/ResourceView');

var _ViewsResourceView2 = _interopRequireDefault(_ViewsResourceView);

var Resources = (function () {
	function Resources(options) {
		_classCallCheck(this, Resources);

		this.name = options.name;
		this._level = options.initial;
		this._resourceView = new _ViewsResourceView2['default']();
		this._resourceView.render({ name: this.name, level: this.level });
	}

	_createClass(Resources, [{
		key: 'level',
		get: function get() {
			return this._level;
		},
		set: function set(levelAdjust) {
			this._level = this._level + levelAdjust;
			this._resourceView.render({ name: this.name, level: this.level });
		}
	}]);

	return Resources;
})();

exports['default'] = Resources;
module.exports = exports['default'];

},{"./Views/ResourceView":10}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DecisionView = (function () {
	function DecisionView(decisionInstance) {
		_classCallCheck(this, DecisionView);

		this.decisionInstance = decisionInstance;
	}

	_createClass(DecisionView, [{
		key: "render",
		value: function render(choices) {

			var template = "";

			for (var i in choices) {
				var choice = choices[i];

				var effects = new String();

				// add the effects to the button template. This is weak and
				// needs to be abstracted and imporved
				for (var k in choice.effects) {
					effects = effects + "data-" + k + "=" + JSON.stringify(choice.effects[k]) + " ";
				}

				effects = effects + "data-goto=" + JSON.stringify(choice.goto);

				template += " \n\t\t\t\t<span class=\"answer-group\">\n\t\t\t\t\t<button " + effects + " >" + choice.text + "</button>\n\t\t\t\t</span>\n\t\t\t";
			}

			document.getElementById("narrative").innerHTML += template;
			document.getElementById("narrative").scrollTop = document.getElementById("narrative").scrollHeight;

			this.bindEvents();

			return true;
		}
	}, {
		key: "decide",
		value: function decide(evt) {
			for (var i = this.decicionButtons.length - 1; i >= 0; i--) {
				this.decicionButtons[i].disabled = "true";
			};

			this.decisionInstance.decisionEvent = evt;
		}
	}, {
		key: "bindEvents",
		value: function bindEvents() {
			var _this = this;

			this.decicionButtons = document.querySelectorAll(".answer-group button");
			for (var i = this.decicionButtons.length - 1; i >= 0; i--) {
				var button = this.decicionButtons[i];
				if (!button.disabled) {
					button.addEventListener("click", function (evt) {
						return _this.decide(evt);
					}, false);
				}
			};
		}
	}]);

	return DecisionView;
})();

exports["default"] = DecisionView;
module.exports = exports["default"];

},{}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var InfrastructureView = (function () {
	function InfrastructureView() {
		_classCallCheck(this, InfrastructureView);
	}

	_createClass(InfrastructureView, [{
		key: "render",
		value: function render(data) {

			var infrastructureViewWrapper = document.getElementById("infrastructure");
			var infrastructureMenuItems = document.querySelectorAll(".infrastructure");
			var replaceInfrastructure = false;
			var innerTemplate = data.name + ": " + data.status;

			var template = " \n\t\t\t<p class=\"infrastructure\" data-type=\"" + data.name + "\">\n\t\t\t\t" + innerTemplate + "\n\t\t\t</p>\n\t\t";

			if (infrastructureMenuItems.length > 0) {
				for (var i = infrastructureMenuItems.length - 1; i >= 0; i--) {
					var infrastructureMenuItem = infrastructureMenuItems[i];
					if (infrastructureMenuItem.attributes["data-type"].value === data.name) {
						replaceInfrastructure = true;
						infrastructureMenuItem.innerHTML = innerTemplate;
					}
				};
			}

			if (!replaceInfrastructure) {
				infrastructureViewWrapper.innerHTML += template;
			}

			return true;
		}
	}]);

	return InfrastructureView;
})();

exports["default"] = InfrastructureView;
module.exports = exports["default"];

},{}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NarrativeView = (function () {
	function NarrativeView() {
		_classCallCheck(this, NarrativeView);

		this._scene;
	}

	_createClass(NarrativeView, [{
		key: "render",
		value: function render(data) {

			var template = " \n\t\t\t<p class=\"output " + data.character.name + "\">\n\t\t\t\t" + data.character.name + ": <span class=\"utterance\">" + data.utterance + "</span>\n\t\t\t</p>";

			document.getElementById(this.scene).innerHTML += template;
			document.getElementById("narrative").scrollTop = document.getElementById("narrative").scrollHeight;
			return true;
		}
	}, {
		key: "scene",
		get: function get() {
			return this._scene;
		},
		set: function set(scene) {
			this._scene = scene;
			document.getElementById("narrative").innerHTML += "<div class=\"output-wrapper\" id=\"" + scene + "\"></div>";
		}
	}]);

	return NarrativeView;
})();

exports["default"] = NarrativeView;
module.exports = exports["default"];

},{}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ResourceView = (function () {
	function ResourceView() {
		_classCallCheck(this, ResourceView);
	}

	_createClass(ResourceView, [{
		key: "render",
		value: function render(data) {

			var resourceViewWrapper = document.getElementById("resources");
			var resourceMenuItems = document.querySelectorAll(".resource");
			var replaceResource = false;
			var innerTemplate = data.name + ": " + data.level;

			var template = " \n\t\t\t<p class=\"resource\" data-type=\"" + data.name + "\">\n\t\t\t\t" + innerTemplate + "\n\t\t\t</p>\n\t\t";

			if (resourceMenuItems.length > 0) {
				for (var i = resourceMenuItems.length - 1; i >= 0; i--) {
					var resourceMenuItem = resourceMenuItems[i];
					if (resourceMenuItem.attributes["data-type"].value === data.name) {
						replaceResource = true;
						resourceMenuItem.innerHTML = innerTemplate;
					}
				};
			}

			if (!replaceResource) {
				resourceViewWrapper.innerHTML += template;
			}

			return true;
		}
	}]);

	return ResourceView;
})();

exports["default"] = ResourceView;
module.exports = exports["default"];

},{}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var UIView = (function () {
	function UIView(options) {
		_classCallCheck(this, UIView);

		this._section = options.section;
		this._seletor = options.selector;
		this.state = options.state || false;
	}

	_createClass(UIView, [{
		key: 'render',
		value: function render(data) {
			return true;
		}
	}, {
		key: 'toggle',
		value: function toggle(visual) {}
	}, {
		key: 'seletor',
		get: function get() {
			return this._seletor;
		}
	}, {
		key: 'section',
		get: function get() {
			return this._section;
		}
	}, {
		key: 'state',
		get: function get() {
			return this._state;
		},
		set: function set(state) {
			this._state = state;
			var domNodes = document.querySelectorAll(this.seletor);

			if (this._state) {

				for (var i = domNodes.length - 1; i >= 0; i--) {
					domNodes[i].classList.add('show');
				};
			} else {

				for (var i = domNodes.length - 1; i >= 0; i--) {
					domNodes[i].classList.remove('show');
				};
			}
		}
	}]);

	return UIView;
})();

exports['default'] = UIView;
module.exports = exports['default'];

},{}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
var config = {

	// These are private properties that
	// bind to ui elements
	_ui: [{ section: "menu", state: false, selector: "#menu" }],

	speed: 1,

	perspective: "Me",

	resources: [{ name: "Killowatts", initial: 10 }, { name: "Oxygen", initial: 10 }, { name: "Drone", initial: 1 }, { name: "Water", initial: 10 }],

	infrastructure: [{ name: "Bridge", status: true }, { name: "Engineering", status: true }, { name: "Med Bay", status: false }, { name: "Science Lab", status: false }],

	characters: ["CEBS"],

	endGame: [{ infrastructure: "Bridge", value: false }, { resources: "Killowatts", value: 0 }]
};

exports["default"] = config;
module.exports = exports["default"];

},{}],13:[function(require,module,exports){
"use strict";

var scene = ["CEBS: Ok engineering is sealed. Lets see if I can get the ships status onscreen.", "Are the o2 levels stable?", 6, "Hello? CEBS?", 5, "Damn it, I just can't see a bloody thing! Maybe I'll try move my arms.", 5, {
	is: "ui",
	effect: "Enable menu"
}, 5, {
	is: "ui",
	effect: "Disable menu"
}, 5, "CEBS: Hey, calm down. I was trying to get the display up. Can you see it?", 7, "Yeh, something flashed in my vision and then went again.", 5, "CEBS: Ok, let me try something different", "Wait, don't go. CEBS?!", 1, "CEBS: 1 sec... I think I've got it.", 3, {
	is: "ui",
	effect: "Enable menu"
}, 5];

module.exports = scene;

},{}],14:[function(require,module,exports){
"use strict";

var scene = ["CEBS: Hello...", 3, "CEBS: Glad to see you're finally awake", 5, "Whats going on? I can't see anything!", 3, "I can't move! Help me!", 2, "CEBS: Don't worry the rescue party will be here soon, a beacon went up a few hours ago. Right now we've got bigger problems. The ships got several hull breaches and we need to focus what little energy we have.", 2, "CEBS: Life support systems are back online but we're running on reserve power. There'a an O2 leak in engineering too.", 2, "CEBS: What do you want to do?", {
	is: "decision",
	choices: [{
		text: "Seal engineering",
		effects: {
			resource: "-5 Killowatts",
			infrastructure: "Disable Engineering"
		},
		goto: "find-drone"
	}, {
		text: "Fix the backup generator",
		effects: {
			resource: "-7 Killowatts"
		},
		goto: "o2-leaking"
	}]
}];

module.exports = scene;

},{}]},{},[1,13])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvaG9tZS9waGF1c2VyL0RldmVsb3BtZW50L29keXNzZXVzL3NyYy9hcHAuanMiLCIvaG9tZS9waGF1c2VyL0RldmVsb3BtZW50L29keXNzZXVzL3NyYy9saWIvQ2hhcmFjdGVyLmpzIiwiL2hvbWUvcGhhdXNlci9EZXZlbG9wbWVudC9vZHlzc2V1cy9zcmMvbGliL0RlY2lzaW9uLmpzIiwiL2hvbWUvcGhhdXNlci9EZXZlbG9wbWVudC9vZHlzc2V1cy9zcmMvbGliL0luZnJhc3RydWN0dXJlLmpzIiwiL2hvbWUvcGhhdXNlci9EZXZlbG9wbWVudC9vZHlzc2V1cy9zcmMvbGliL05hcnJhdGl2ZS5qcyIsIi9ob21lL3BoYXVzZXIvRGV2ZWxvcG1lbnQvb2R5c3NldXMvc3JjL2xpYi9SZXNvdXJjZXMuanMiLCIvaG9tZS9waGF1c2VyL0RldmVsb3BtZW50L29keXNzZXVzL3NyYy9saWIvVmlld3MvRGVjaXNpb25WaWV3LmpzIiwiL2hvbWUvcGhhdXNlci9EZXZlbG9wbWVudC9vZHlzc2V1cy9zcmMvbGliL1ZpZXdzL0luZnJhc3RydWN0dXJlVmlldy5qcyIsIi9ob21lL3BoYXVzZXIvRGV2ZWxvcG1lbnQvb2R5c3NldXMvc3JjL2xpYi9WaWV3cy9OYXJyYXRpdmVWaWV3LmpzIiwiL2hvbWUvcGhhdXNlci9EZXZlbG9wbWVudC9vZHlzc2V1cy9zcmMvbGliL1ZpZXdzL1Jlc291cmNlVmlldy5qcyIsIi9ob21lL3BoYXVzZXIvRGV2ZWxvcG1lbnQvb2R5c3NldXMvc3JjL2xpYi9WaWV3cy9VSVZpZXcuanMiLCIvaG9tZS9waGF1c2VyL0RldmVsb3BtZW50L29keXNzZXVzL3NyYy9vZHlzc2V1c2ZpbGUuanMiLCIvaG9tZS9waGF1c2VyL0RldmVsb3BtZW50L29keXNzZXVzL3NyYy9zY2VuZXMvZmluZC1kcm9uZS5qcyIsIi9ob21lL3BoYXVzZXIv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QUNkLFFBQU8sRUFBRSxDQUNSO0FBQ0MsTUFBSSxFQUFFLGtCQUFrQjtBQUN4QixTQUFPLEVBQUU7QUFDUixXQUFRLEVBQUUsZUFBZTtBQUN6QixpQkFBYyxFQUFFLHFCQUFxQjtHQUNyQztBQUNELE1BQUksRUFBRSxZQUFZO0VBQ2xCLEVBQ0Q7QUFDQyxNQUFJLEVBQUUsMEJBQTBCO0FBQ2hDLFNBQU8sRUFBRTtBQUNSLFdBQVEsRUFBRSxlQUFlO0dBQ3pCO0FBQ0QsTUFBSSxFQUFFLFlBQVk7RUFDbEIsQ0FDRDtDQUNELENBQ0QsQ0FBQTs7QUFFRCxNQUFNLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvLyBncmFiIHRoZSBjb25maWdcbmltcG9ydCBjb25maWcgZnJvbSAnLi9vZHlzc2V1c2ZpbGUnO1xuXG4vLyBpbXBvcnQgdGhlIGdhbWUgY2xhc3Nlc1xuaW1wb3J0IENoYXJhY3RlciBmcm9tIFwiLi9saWIvQ2hhcmFjdGVyXCI7XG5pbXBvcnQgTmFycmF0aXZlIGZyb20gXCIuL2xpYi9OYXJyYXRpdmVcIjtcbmltcG9ydCBSZXNvdXJjZXMgZnJvbSBcIi4vbGliL1Jlc291cmNlc1wiO1xuaW1wb3J0IEluZnJhc3RydWN0dXJlIGZyb20gXCIuL2xpYi9JbmZyYXN0cnVjdHVyZVwiO1xuXG4vLyBpbXBvcnQgdGhlIFZpc3VhbHMgVmlldyBjbGFzcyB0byBpbml0aWFsaXplIHNvbWUgb2YgdGhlIHVpIHByb3BlcnRpZXNcbmltcG9ydCBVSVZpZXcgZnJvbSBcIi4vbGliL1ZpZXdzL1VJVmlld1wiO1xuXG4vLyBpbXBvcnQgdGhlIHNjZW5lc1xudmFyIGludHJvID0gcmVxdWlyZShcIi4vc2NlbmVzL2ludHJvXCIpO1xuXG4vLyBpbml0aWFsaXNlIHRoZSBnYW1lIHJlc291cmNlc1xubGV0IGNoYXJhY3RlcnMgPSBjb25maWcuY2hhcmFjdGVycy5tYXAoZnVuY3Rpb24gKGNoYXJhY3Rlcikge1xuXHRyZXR1cm4gbmV3IENoYXJhY3RlcihjaGFyYWN0ZXIpO1xufSk7XG5cbmxldCByZXNvdXJjZXMgPSBjb25maWcucmVzb3VyY2VzLm1hcChmdW5jdGlvbihyZXNvdXJjZSl7XG5cdHJldHVybiBuZXcgUmVzb3VyY2VzKHJlc291cmNlKTtcbn0pO1xuXG5sZXQgaW5mcmFzdHJ1Y3R1cmUgPSBjb25maWcuaW5mcmFzdHJ1Y3R1cmUubWFwKGZ1bmN0aW9uKGluZnJhc3RydWN0dXJlKXtcblx0cmV0dXJuIG5ldyBJbmZyYXN0cnVjdHVyZShpbmZyYXN0cnVjdHVyZSk7XG59KTtcblxubGV0IHVpID0gY29uZmlnLl91aS5tYXAoZnVuY3Rpb24odWkpe1xuXHRyZXR1cm4gbmV3IFVJVmlldyh1aSk7XG59KTtcblxuXG4vLyBsb2FkIHRoZSBuYXJyYXRpdmVcbmxldCBuYXJyYXRpdmUgPSBuZXcgTmFycmF0aXZlKHtcblx0c3BlZWQ6IGNvbmZpZy5zcGVlZCxcblx0cGVyc3BlY3RpdmU6IGNvbmZpZy5wZXJzcGVjdGl2ZSxcblx0cmVzb3VyY2VzOiByZXNvdXJjZXMsXG5cdGNoYXJhY3RlcnM6IGNoYXJhY3RlcnMsXG5cdGluZnJhc3RydWN0dXJlOiBpbmZyYXN0cnVjdHVyZSxcblx0dWk6IHVpLFxufSk7XG5cbi8vIGVudHJ5IHBvaW50XG5uYXJyYXRpdmUucnVuKGludHJvLCBcImludHJvXCIpOyIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIENoYXJhY3RlciB7XG5cdGNvbnN0cnVjdG9yKG5hbWUpe1xuXHRcdHRoaXMubmFtZSA9IG5hbWU7XG5cdH1cblxuXHRzYXkoKXtcblx0XHRcblx0fVxufSIsImltcG9ydCBEZWNpc2lvblZpZXcgZnJvbSAnLi9WaWV3cy9EZWNpc2lvblZpZXcnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEZWNpc2lvbiB7XG5cdGNvbnN0cnVjdG9yKG9wdGlvbnMpe1xuXHRcdHRoaXMuX2Nob2ljZXMgPSBvcHRpb25zLmNob2ljZXM7XG5cdFx0dGhpcy5fcmVzb3VyY2VzID0gb3B0aW9ucy5yZXNvdXJjZXM7XG5cdFx0dGhpcy5faW5mcmFzdHJ1Y3R1cmUgPSBvcHRpb25zLmluZnJhc3RydWN0dXJlO1xuXHRcdHRoaXMuX2RlY2lzaW9uVmlldyA9IG5ldyBEZWNpc2lvblZpZXcodGhpcyk7XG5cdFx0dGhpcy5fbmFycmF0aXZlID0gb3B0aW9ucy5uYXJyYXRpdmU7XG5cblx0XHR0aGlzLmluaXQoKTtcblx0fVxuXG5cdGluaXQoKXtcblx0XHR0aGlzLl9kZWNpc2lvblZpZXcucmVuZGVyKHRoaXMuX2Nob2ljZXMpO1xuXHR9XG5cblx0Z2V0IGRlY2lzaW9uRXZlbnQoKXtcblx0XHRyZXR1cm4gdGhpcy5fZGVjaXNpb25FdmVudDtcblx0fVxuXG5cdHNldCBkZWNpc2lvbkV2ZW50KGV2dCl7XG5cdFx0dGhpcy5fZGVjaXNpb25FdmVudCA9IGV2dDtcblx0XHR0aGlzLmNvbmNlcXVlbmNlcygpO1xuXHR9XG5cblx0Y29uY2VxdWVuY2VzKCl7XG5cdFx0dmFyIGF0dHJpYnV0ZXMgPSB0aGlzLmRlY2lzaW9uRXZlbnQuc3JjRWxlbWVudC5kYXRhc2V0O1xuXHRcdFxuXHRcdGZvcih2YXIgayBpbiBhdHRyaWJ1dGVzKSB7XG5cblx0XHRcdHN3aXRjaChrKSB7XG5cdFx0XHRcdGNhc2UgXCJyZXNvdXJjZVwiOlxuXHRcdFx0XHRcdHZhciByZXNvdXJjZUVmZmVjdCA9IGF0dHJpYnV0ZXNba10uc3BsaXQoXCIgXCIpO1xuXHRcdFx0XHRcdHZhciBlZmZlY3QgPSBwYXJzZUludChyZXNvdXJjZUVmZmVjdFswXSk7XG5cdFx0XHRcdFx0dmFyIHJlc291cmNlID0gcmVzb3VyY2VFZmZlY3RbMV07XG5cdFx0XHRcdFx0dGhpcy5fcmVzb3VyY2VzW3Jlc291cmNlXS5sZXZlbCA9IGVmZmVjdDtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgXCJpbmZyYXN0cnVjdHVyZVwiOlxuXHRcdFx0XHRcdHZhciBpbmZyYXN0cnVjdHVyZUVmZmVjdCA9IGF0dHJpYnV0ZXNba10uc3BsaXQoXCIgXCIpO1xuXHRcdFx0XHRcdHZhciBlZmZlY3QgPSBpbmZyYXN0cnVjdHVyZUVmZmVjdFswXS50cmltKCkudG9Mb3dlckNhc2UoKTtcblx0XHRcdFx0XHRpZihlZmZlY3QgPT09IFwiZGlzYWJsZVwiKXtcblx0XHRcdFx0XHRcdGVmZmVjdCA9IGZhbHNlO1xuXHRcdFx0XHRcdH1lbHNlIGlmKGVmZmVjdCA9PT0gXCJlbmFibGVcIil7XG5cdFx0XHRcdFx0XHRlZmZlY3QgPSB0cnVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHR2YXIgaW5mcmFzdHJ1Y3R1cmUgPSBpbmZyYXN0cnVjdHVyZUVmZmVjdFsxXTtcblx0XHRcdFx0XHR0aGlzLl9pbmZyYXN0cnVjdHVyZVtpbmZyYXN0cnVjdHVyZV0uc3RhdHVzID0gZWZmZWN0O1xuXHRcdFx0XHRicmVhaztcblx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRjb25zb2xlLmxvZyhhdHRyaWJ1dGVzW2tdKTtcblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0dGhpcy5fbmFycmF0aXZlLm1vdmVTY2VuZShhdHRyaWJ1dGVzW1wiZ290b1wiXSk7XG5cdH1cbn0iLCJpbXBvcnQgSW5mcmFzdHJ1Y3R1cmVWaWV3IGZyb20gJy4vVmlld3MvSW5mcmFzdHJ1Y3R1cmVWaWV3JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5mcmFzdHJ1Y3R1cmUge1xuXG5cdGNvbnN0cnVjdG9yKG9wdGlvbnMpe1xuXHRcdHRoaXMubmFtZSA9IG9wdGlvbnMubmFtZTtcblx0XHR0aGlzLl9zdGF0dXMgPSBvcHRpb25zLnN0YXR1cztcblxuXHRcdHRoaXMuX2luZnJhc3RydWN0dXJlVmlldyA9IG5ldyBJbmZyYXN0cnVjdHVyZVZpZXcoKTtcblx0XHR0aGlzLl9pbmZyYXN0cnVjdHVyZVZpZXcucmVuZGVyKCB7bmFtZTogdGhpcy5uYW1lLCBzdGF0dXM6IHRoaXMuc3RhdHVzfSApO1xuXHR9XG5cblx0Z2V0IHN0YXR1cygpe1xuXHRcdHJldHVybiB0aGlzLl9zdGF0dXM7XG5cdH1cblxuXHRzZXQgc3RhdHVzKHN0YXR1cyl7XG5cdFx0dGhpcy5fc3RhdHVzID0gc3RhdHVzO1xuXHRcdHRoaXMuX2luZnJhc3RydWN0dXJlVmlldy5yZW5kZXIoIHtuYW1lOiB0aGlzLm5hbWUsIHN0YXR1czogdGhpcy5zdGF0dXN9ICk7XG5cdH1cbn0iLCJpbXBvcnQgTmFycmF0aXZlVmlldyBmcm9tICcuL1ZpZXdzL05hcnJhdGl2ZVZpZXcnO1xuaW1wb3J0IFVJVmlldyBmcm9tICcuL1ZpZXdzL1VJVmlldyc7XG5pbXBvcnQgRGVjaXNpb24gZnJvbSAnLi9EZWNpc2lvbic7XG5cbi8vIG1hcCB0aGUgc2NlbmVzIGZvciByZXF1aXJlLCB0aGlzIGN1cnJlbnRseSBuZWVkcyB0byBcbi8vIGJlIGRvbmUgbWFudWFsbHkgdW50aWwgSSBmaW5kIGEgd2F5IG9mIGR5bmFtaWNhbGx5IGxvYWRpbmcgbW9kdWxlc1xubGV0IEZpbmREcm9uZVNjZW5lID0gcmVxdWlyZSgnLi4vc2NlbmVzL2ZpbmQtZHJvbmUnKTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTmFycmF0aXZlIHtcblx0Y29uc3RydWN0b3Iob3B0aW9ucyl7XG5cblx0XHR0aGlzLl9uYXJyYXRpdmVWaWV3ID0gbmV3IE5hcnJhdGl2ZVZpZXcoKTtcblxuXHRcdC8vIHNldHVwIHNvbWUgcHVibGljIHByb3BlcnRpZXNcblx0XHR0aGlzLl9zcGVlZCA9IG9wdGlvbnMuc3BlZWQgfHwgMTtcblx0XHR0aGlzLl9wZXJzcGVjdGl2ZSA9IG9wdGlvbnMucGVyc3BlY3RpdmU7XG5cdFx0dGhpcy5fcHJvZ3Jlc3MgPSAwO1xuXHRcdHRoaXMuX2NoYXJhY3RlcnMgPSBvcHRpb25zLmNoYXJhY3RlcnM7XG5cdFx0dGhpcy5fcmVzb3VyY2VzID0gb3B0aW9ucy5yZXNvdXJjZXM7XG5cdFx0dGhpcy5faW5mcmFzdHJ1Y3R1cmUgPSBvcHRpb25zLmluZnJhc3RydWN0dXJlO1xuXHRcdHRoaXMuX3VpID0gb3B0aW9ucy51aTtcblxuXHRcdC8vIGNyZWF0ZSBhbiBvYmplY3Qgb2YgY2hhcmFjdGVycyBtYXBwaW5nIG5hbWVzIGFnYWluc3QgdGhlaXIgXG5cdFx0Ly8gY2hhcmFjdGVyIGNsYXNzIGluc3RhbmNlXG5cdFx0dGhpcy5fY2hhcmFjdGVyc0J5TmFtZSA9IHt9O1xuXHRcdHRoaXMuX2NoYXJhY3RlcnMuZm9yRWFjaCgoY2hhcmFjdGVyKSA9PiB7XG5cdFx0XHR0aGlzLl9jaGFyYWN0ZXJzQnlOYW1lW2NoYXJhY3Rlci5uYW1lXSA9IGNoYXJhY3Rlcjtcblx0XHR9KTtcblxuXHRcdC8vIGNyZWF0ZSBhbiBvYmplY3Qgb2YgcmVzb3VyY2VzIG1hcHBpbmcgbmFtZXMgYWdhaW5zdCB0aGVpciBcblx0XHQvLyByZXNvdXJjZSBjbGFzcyBpbnN0YW5jZVxuXHRcdHRoaXMuX3Jlc291cmNlc0J5TmFtZSA9IHt9O1xuXHRcdHRoaXMuX3Jlc291cmNlcy5mb3JFYWNoKChyZXNvdXJjZSkgPT4ge1xuXHRcdFx0dGhpcy5fcmVzb3VyY2VzQnlOYW1lW3Jlc291cmNlLm5hbWVdID0gcmVzb3VyY2U7XG5cdFx0fSk7XHRcdFxuXG5cblx0XHQvLyBjcmVhdGUgYW4gb2JqZWN0IG9mIGluZnJhc3RydWN0dXJlIG1hcHBpbmcgbmFtZXMgYWdhaW5zdCB0aGVpciBcblx0XHQvLyByZXNvdXJjZSBjbGFzcyBpbnN0YW5jZVxuXHRcdHRoaXMuX2luZnJhc3RydWN0dXJlQnlOYW1lID0ge307XG5cdFx0dGhpcy5faW5mcmFzdHJ1Y3R1cmUuZm9yRWFjaCgoaW5mcmFzdHJ1Y3R1cmUpID0+IHtcblx0XHRcdHRoaXMuX2luZnJhc3RydWN0dXJlQnlOYW1lW2luZnJhc3RydWN0dXJlLm5hbWVdID0gaW5mcmFzdHJ1Y3R1cmU7XG5cdFx0fSk7XHRcblxuXG5cdFx0Ly8gY3JlYXRlIGFuIG9iamVjdCBvZiB1aXZpZXcgbWFwcGluZyBzZWN0aW9ucyBhZ2FpbnN0IHRoZWlyIFxuXHRcdC8vIHJlc291cmNlIGNsYXNzIGluc3RhbmNlXG5cdFx0dGhpcy5fdWlCeVNlY3Rpb24gPSB7fTtcblx0XHR0aGlzLl91aS5mb3JFYWNoKCh1aSkgPT4ge1xuXHRcdFx0dGhpcy5fdWlCeVNlY3Rpb25bdWkuc2VjdGlvbl0gPSB1aTtcblx0XHR9KTtcdFxuXHR9XG5cblx0c2V0IG5hcnJhdGl2ZShzY2VuZSl7XG5cdFx0dGhpcy5fbmFycmF0aXZlID0gc2NlbmU7XG5cdH1cblxuXHRnZXQgbmFycmF0aXZlKCl7XG5cdFx0cmV0dXJuIHRoaXMuX25hcnJhdGl2ZTtcblx0fVxuXG5cdC8qKlxuXHQgKiBUaGlzIG1ldGhvZCBpcyB0aGUgaW5pdGlhbGlzZXIgZm9yIHRoZSBuYXJyYXRpdmUgY2xhc3Ncblx0ICogQHBhcmFtICB7QXJyYXk8U3RyaW5nPn0gbmFycmF0aXZlIFRoaXMgbWV0aG9kIHRha2VzIGEgc2NlbmUgYW5kIHJ1bnMgdGhyb3VnaCBpdFxuXHQgKi9cblx0cnVuKHNjZW5lLCBzY2VuZU5hbWUpe1xuXHRcdHRoaXMuX25hcnJhdGl2ZVZpZXcuc2NlbmUgPSBzY2VuZU5hbWU7XG5cdFx0dGhpcy5uYXJyYXRpdmUgPSBzY2VuZTtcblx0XHR0aGlzLmdvKCk7XG5cdH1cblxuXHQvKipcblx0ICogVGhpcyBpcyBhIHNjZW5lIHByb2dyZXNzIGNvdW50IHVzZWQgaW4gdGhlIGBnbygpYCBtZXRob2Rcblx0ICogQHBhcmFtICB7aW50ZWdlcn0gaW5jQW1vdW50IFRoaXMgaXMgdGhlIGFtb3VudCB0byBwcm9ncmVzcyB0aGUgbmFycmF0aXZlLCBkZWZhdWx0IGlzIDFcblx0ICovXG5cdGluY3JlbWVudFByb2dyZXNzKGluY0Ftb3VudD0xKXtcblx0XHR2YXIgaW5jQW1vdW50ID0gaW5jQW1vdW50O1xuXHRcdHRoaXMuX3Byb2dyZXNzID0gdGhpcy5fcHJvZ3Jlc3MgKyBpbmNBbW91bnQ7XG5cdH1cblxuXHQvKipcblx0ICogVGhpcyBtZXRob2QgcGFyc2VzIG91dCB0aGUgY2hhcmFjdGVyIGF0IHRoZSBzdGFydCBvZiB0aGUgdXR0ZXJhbmNlIGFuZCBjaGVja3MgdGhhdCB0aGV5IGV4aXN0IGluIHRoZSBjaGFyYWN0ZXIgY2xhc3Ncblx0ICogQHBhcmFtICB7c3RyaW5nfSBuYXJyYXRpdmUgVGhlIHV0dGVyYW5jZSBmcm9tIHRoZSBzY2VuZSBhcnJheVxuXHQgKiBAcmV0dXJuIHtzdHJpbmd9IGNoYXJhY3RlciBUaGUgY2hhcmFjdGVyIG5hbWUgZnJvbSB0aGUgdXR0ZXJhbmNlXG5cdCAqL1xuXHRnZXRDaGFyYWN0ZXJzRm9yTmFycmF0aXZlKG5hcnJhdGl2ZSl7XG5cdFx0dmFyIG5hbWUgPSBuYXJyYXRpdmUuc3BsaXQoXCI6XCIpWzBdLnRyaW0oKTtcblx0XHRyZXR1cm4gdGhpcy5fY2hhcmFjdGVyc0J5TmFtZVtuYW1lXSB8fCBmYWxzZTtcblx0fVxuXG5cdC8qKlxuXHQgKiBUaGlzIG1ldGhvZCBvZmZzZXRzIHRoZSB3YWl0IHRpbWUgYnkgdGhlIGFtb3VudCBvZiBjaGFyYWN0ZXJzIGluIHRoZSB1dHRlcmFuY2Vcblx0ICogQHBhcmFtICB7c3RyaW5nfSBuYXJyYXRpdmUgVGhlIHV0dGVyYW5jZSBmcm9tIHRoZSBzY2VuZSBhcnJheVxuXHQgKiBAcmV0dXJuIHtudW1iZXJ9ICAgICAgICAgICBUaGUgYW1vdW50IG9mIGNoYXJhY3RlcnMgKiAxMDBtc1xuXHQgKi9cblx0dGV4dExlbmd0aE9mZnNldChuYXJyYXRpdmUpe1xuXHRcdHJldHVybiBuYXJyYXRpdmUubGVuZ3RoICogMTAwO1xuXHR9XG5cblxuXHR0eXBlKHV0dGVyYW5jZSl7XG5cdFx0dmFyIHV0dGVyYW5jZVR5cGUgPSB0eXBlb2YgdXR0ZXJhbmNlO1xuXHRcdHJldHVybiB1dHRlcmFuY2VUeXBlO1xuXHR9XG5cblx0bW92ZVNjZW5lKHNjZW5lKXtcblx0XHR2YXIgbmV4dFNjZW5lID0gcmVxdWlyZShcIi4uL3NjZW5lcy9cIiArIHNjZW5lKTtcblx0XHR0aGlzLl9wcm9ncmVzcyA9IDA7XG5cdFx0dGhpcy5ydW4obmV4dFNjZW5lLCBzY2VuZSk7XG5cdH1cblxuXHQvKipcblx0ICogVGhpcyBtZXRob2QgaXMgdGhlIG1haW4gc2NlbmUgcGFyc2VyLCBpdCBpdGVyYXRlcyB0aHJvdWdoIHRoZSBzY2VuZSBhbmQgb3V0cHV0cyB0aGUgbmFycmF0aXZlIGludG8gdGhlIE5hcnJhdGl2ZVZpZXdcblx0ICovXG5cdGdvKCl7XG5cblx0XHQvLyBncmFiIHRoZSBjdXJyZW50IHByb2dyZXNzXG5cdFx0dmFyIGkgPSB0aGlzLl9wcm9ncmVzcztcblxuXHRcdC8vIGdldCB0aGUgc2NlbmUgbmFycmF0aXZlXG5cdFx0dmFyIG5hcnJhdGl2ZSA9IHRoaXMubmFycmF0aXZlO1xuXG5cdFx0Ly8gaW5pdGlhbGlzZSBzb21lIHZhcnNcblx0XHR2YXIgdXR0ZXJhbmNlLCB1dHRlcmFuY2VUeXBlO1xuXHRcdFxuXHRcdC8vIGlmIHdlJ3JlIHN0aWxsIGluIGEgbmFycmF0aXZlXG5cdFx0aWYoIGkgPCBuYXJyYXRpdmUubGVuZ3RoICl7XG5cblx0XHRcdHV0dGVyYW5jZSA9IG5hcnJhdGl2ZVtpXTtcblxuXHRcdFx0Ly8gZ2V0IHRoZSBgdHlwZWAgb2Ygb2JqZWN0IGluIHRoZSBzY2VuZSBhcnJheVxuXHRcdFx0dXR0ZXJhbmNlVHlwZSA9IHRoaXMudHlwZSh1dHRlcmFuY2UpO1xuXG5cdFx0XHQvLyBkZWNpZGUgd2hpY2ggbWV0aG9kIHRvIHJ1biBvbiB0aGUgc2NlbmUgdXR0ZXJhbmNlXG5cdFx0XHRzd2l0Y2godXR0ZXJhbmNlVHlwZSkge1xuXHRcdFx0XHRjYXNlIFwic3RyaW5nXCI6XG5cdFx0XHRcdFx0Ly8gaWYgdGhlIGFycmF5IGVsZW1lbnQgaXMgYSBzdHJpbmcgcGFzcyBpdCB0byB0aGUgc2F5IG1ldGhvZFxuXHRcdFx0XHRcdHRoaXMuc2F5KHV0dGVyYW5jZSk7XG5cblx0XHRcdFx0XHQvLyBpbmNyZW1lbnQgdGhlIHByb2dyZXNzXG5cdFx0XHRcdFx0dGhpcy5pbmNyZW1lbnRQcm9ncmVzcygpO1xuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdC8vIHJlcGVhdFxuXHRcdFx0XHRcdHRoaXMuZ28oKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgXCJudW1iZXJcIjpcblx0XHRcdFx0XHQvLyBpZiB0aGUgYXJyYXkgZWxlbWVudCBpcyBhbiBpbnRlZ2VyLCBwYXNzIHRoZSBpbnQgYW5kIHRoZSBhcnJheSBpbmRleCB0byB0aGUgd2FpdCBtZXRob2Rcblx0XHRcdFx0XHR0aGlzLndhaXQodXR0ZXJhbmNlLCBpKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgXCJvYmplY3RcIjpcblxuXHRcdFx0XHRcdGlmICh1dHRlcmFuY2UuaXMgPT09IFwiZGVjaXNpb25cIikge1xuXHRcdFx0XHRcdFx0dGhpcy5kZWNpZGUodXR0ZXJhbmNlKTtcdFx0XHRcdFx0XG5cdFx0XHRcdFx0fWVsc2UgaWYgKHV0dGVyYW5jZS5pcyA9PT0gXCJ1aVwiKSB7XG5cdFx0XHRcdFx0XHR0aGlzLnVpKHV0dGVyYW5jZSk7XG5cblx0XHRcdFx0XHRcdC8vIGluY3JlbWVudCB0aGUgcHJvZ3Jlc3Ncblx0XHRcdFx0XHRcdHRoaXMuaW5jcmVtZW50UHJvZ3Jlc3MoKTtcblx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0Ly8gcmVwZWF0XG5cdFx0XHRcdFx0XHR0aGlzLmdvKCk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdHRoaXMuc2F5KHV0dGVyYW5jZSk7XG5cdFx0XHR9XG5cblx0XHR9XG5cblx0fVxuXG5cdHNheSh1dHRlcmFuY2Upe1xuXG5cdFx0dmFyIGNoYXJhY3Rlcjtcblx0XHRcblx0XHQvLyBnZXQgYSB0aGUgY2hhcmFjdGVyIGZyb20gdGhlIGZyb250IG9mIHRoZSBzY2VuZSB0ZXh0IHN0cmluZ1xuXHRcdGNoYXJhY3RlciA9IHRoaXMuZ2V0Q2hhcmFjdGVyc0Zvck5hcnJhdGl2ZSh1dHRlcmFuY2UpO1xuXG5cdFx0Ly8gaWYgdGhlIGNoYXJhY3RlciBpbiB0aGUgbmFycmF0aXZlIGlzbid0IGluIHRoZSBjaGFyYWN0ZXJzIHNldHVwXG5cdFx0Ly8gYXNzdW1lIHRoYXQgaXRzIHRoZSBwcm90YWdhbmlzdFxuXHRcdGlmKCFjaGFyYWN0ZXIpe1xuXG5cdFx0XHRjaGFyYWN0ZXIgPSB7bmFtZTogdGhpcy5fcGVyc3BlY3RpdmV9O1xuXHRcdFx0XG5cdFx0fWVsc2V7XG5cblx0XHRcdC8vIHJlbW92ZSB0aGUgY2hhcmFjdGVyIGZyb20gdGhlIHRleHQgc3RyaW5nXG5cdFx0XHR1dHRlcmFuY2UgPSB1dHRlcmFuY2UucmVwbGFjZShjaGFyYWN0ZXIubmFtZSArIFwiOlwiLCBcIlwiKTtcblx0XHR9XG5cblx0XHQvLyBwYXNzIHRoZSBjaGFyYWN0ZXIgYW5kIHRoZSB0ZXh0IHRvIHRoZSBuYXJyYXRpdmUgdmlld1xuXHRcdHRoaXMuX25hcnJhdGl2ZVZpZXcucmVuZGVyKHt1dHRlcmFuY2U6IHV0dGVyYW5jZSwgY2hhcmFjdGVyOiBjaGFyYWN0ZXJ9KTtcblxuXHR9XG5cblx0dWkodWkpe1xuXG5cdFx0dmFyIHVpRWZmZWN0ID0gdWkuZWZmZWN0LnNwbGl0KFwiIFwiKTtcblx0XHR2YXIgZWZmZWN0ID0gdWlFZmZlY3RbMF0udHJpbSgpLnRvTG93ZXJDYXNlKCk7XG5cdFx0XG5cdFx0aWYoZWZmZWN0ID09PSBcImRpc2FibGVcIil7XG5cdFx0XHRlZmZlY3QgPSBmYWxzZTtcblx0XHR9ZWxzZSBpZihlZmZlY3QgPT09IFwiZW5hYmxlXCIpe1xuXHRcdFx0ZWZmZWN0ID0gdHJ1ZTtcblx0XHR9XG5cblx0XHR0aGlzLl91aUJ5U2VjdGlvblt1aUVmZmVjdFsxXV0uc3RhdGUgPSBlZmZlY3Q7XG5cdH1cblxuXHRkZWNpZGUoZGVjaXNpb24pe1xuXG5cdFx0dGhpcy5fZGVjaXNpb24gPSBuZXcgRGVjaXNpb24oe1xuXHRcdFx0Y2hvaWNlczogZGVjaXNpb24uY2hvaWNlcyxcblx0XHRcdGluZnJhc3RydWN0dXJlOiB0aGlzLl9pbmZyYXN0cnVjdHVyZUJ5TmFtZSxcblx0XHRcdHJlc291cmNlczogdGhpcy5fcmVzb3VyY2VzQnlOYW1lLFxuXHRcdFx0bmFycmF0aXZlOiB0aGlzLFxuXHRcdH0pO1xuXG5cdH1cblxuXHR3YWl0KHdhaXRUaW1lLCBpKXtcblx0XHR2YXIgcHJldmlvdXNOYXJyYXRpdmUgPSB0aGlzLm5hcnJhdGl2ZVtpLTFdO1xuXHRcdHZhciB0aW1lID0gd2FpdFRpbWUgKiAxMDAwICsgdGhpcy50ZXh0TGVuZ3RoT2Zmc2V0KHByZXZpb3VzTmFycmF0aXZlKTtcblx0XHR0aW1lID0gdGltZS90aGlzLl9zcGVlZDtcblx0XHRzZXRUaW1lb3V0KCgpID0+IHtcblx0XHRcdHRoaXMuaW5jcmVtZW50UHJvZ3Jlc3MoKTtcblx0XHRcdHRoaXMuZ28oKTtcblx0XHR9LCB0aW1lKTtcblx0fVxufSIsImltcG9ydCBSZXNvdXJjZVZpZXcgZnJvbSAnLi9WaWV3cy9SZXNvdXJjZVZpZXcnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZXNvdXJjZXMge1xuXG5cdGNvbnN0cnVjdG9yKG9wdGlvbnMpe1xuXHRcdHRoaXMubmFtZSA9IG9wdGlvbnMubmFtZTtcblx0XHR0aGlzLl9sZXZlbCA9IG9wdGlvbnMuaW5pdGlhbDtcblx0XHR0aGlzLl9yZXNvdXJjZVZpZXcgPSBuZXcgUmVzb3VyY2VWaWV3KCk7XG5cdFx0dGhpcy5fcmVzb3VyY2VWaWV3LnJlbmRlcigge25hbWU6IHRoaXMubmFtZSwgbGV2ZWw6IHRoaXMubGV2ZWx9ICk7XG5cdH1cblxuXHRnZXQgbGV2ZWwoKXtcblx0XHRyZXR1cm4gdGhpcy5fbGV2ZWw7XG5cdH1cblxuXHRzZXQgbGV2ZWwobGV2ZWxBZGp1c3Qpe1xuXHRcdHRoaXMuX2xldmVsID0gdGhpcy5fbGV2ZWwgKyBsZXZlbEFkanVzdDtcblx0XHR0aGlzLl9yZXNvdXJjZVZpZXcucmVuZGVyKCB7bmFtZTogdGhpcy5uYW1lLCBsZXZlbDogdGhpcy5sZXZlbH0gKTtcblx0fVxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIERlY2lzaW9uVmlldyB7XG5cblx0Y29uc3RydWN0b3IoZGVjaXNpb25JbnN0YW5jZSl7XG5cdFx0dGhpcy5kZWNpc2lvbkluc3RhbmNlID0gZGVjaXNpb25JbnN0YW5jZTtcblx0fVxuXG5cdHJlbmRlcihjaG9pY2VzKXtcblxuXHRcdHZhciB0ZW1wbGF0ZSA9IFwiXCI7XG5cblx0XHRmb3IobGV0IGkgaW4gY2hvaWNlcykgeyBcblx0XHRcdHZhciBjaG9pY2UgPSBjaG9pY2VzW2ldO1xuXG5cdFx0XHR2YXIgZWZmZWN0cyA9IG5ldyBTdHJpbmc7XG5cblx0XHRcdC8vIGFkZCB0aGUgZWZmZWN0cyB0byB0aGUgYnV0dG9uIHRlbXBsYXRlLiBUaGlzIGlzIHdlYWsgYW5kIFxuXHRcdFx0Ly8gbmVlZHMgdG8gYmUgYWJzdHJhY3RlZCBhbmQgaW1wb3J2ZWRcblx0XHRcdGZvcih2YXIgayBpbiBjaG9pY2UuZWZmZWN0cyl7XG5cdFx0XHRcdGVmZmVjdHMgPSBlZmZlY3RzICsgXCJkYXRhLVwiICsgayArIFwiPVwiICsgSlNPTi5zdHJpbmdpZnkoY2hvaWNlLmVmZmVjdHNba10pICsgXCIgXCI7XG5cdFx0XHR9XG5cblx0XHRcdGVmZmVjdHMgPSBlZmZlY3RzICsgXCJkYXRhLWdvdG89XCIgKyBKU09OLnN0cmluZ2lmeShjaG9pY2UuZ290byk7XG5cblx0XHRcdHRlbXBsYXRlKz0gYCBcblx0XHRcdFx0PHNwYW4gY2xhc3M9XCJhbnN3ZXItZ3JvdXBcIj5cblx0XHRcdFx0XHQ8YnV0dG9uICR7IGVmZmVjdHMgfSA+JHsgY2hvaWNlLnRleHQgfTwvYnV0dG9uPlxuXHRcdFx0XHQ8L3NwYW4+XG5cdFx0XHRgO1xuXHRcdH0gXG5cblx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm5hcnJhdGl2ZVwiKS5pbm5lckhUTUwgKz0gdGVtcGxhdGU7XG5cdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJuYXJyYXRpdmVcIikuc2Nyb2xsVG9wID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJuYXJyYXRpdmVcIikuc2Nyb2xsSGVpZ2h0XG5cblx0XHR0aGlzLmJpbmRFdmVudHMoKTtcblxuXHRcdHJldHVybiB0cnVlO1xuXHR9XG5cblx0ZGVjaWRlKGV2dCl7XG5cdFx0Zm9yICh2YXIgaSA9IHRoaXMuZGVjaWNpb25CdXR0b25zLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG5cdFx0XHR0aGlzLmRlY2ljaW9uQnV0dG9uc1tpXS5kaXNhYmxlZCA9IFwidHJ1ZVwiO1xuXHRcdH07XG5cblx0XHR0aGlzLmRlY2lzaW9uSW5zdGFuY2UuZGVjaXNpb25FdmVudCA9IGV2dDtcblx0fVxuXG5cdGJpbmRFdmVudHMoKXtcblx0XHR0aGlzLmRlY2ljaW9uQnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuYW5zd2VyLWdyb3VwIGJ1dHRvblwiKTtcblx0XHRmb3IgKHZhciBpID0gdGhpcy5kZWNpY2lvbkJ1dHRvbnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcblx0XHRcdHZhciBidXR0b24gPSB0aGlzLmRlY2ljaW9uQnV0dG9uc1tpXTtcblx0XHRcdGlmKCFidXR0b24uZGlzYWJsZWQpe1xuXHRcdFx0XHRidXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGV2dCA9PiB0aGlzLmRlY2lkZShldnQpLGZhbHNlKTtcblx0XHRcdH1cblx0XHR9O1xuXHR9XG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5mcmFzdHJ1Y3R1cmVWaWV3IHtcblxuXHRyZW5kZXIoZGF0YSl7XG5cblx0XHR2YXIgaW5mcmFzdHJ1Y3R1cmVWaWV3V3JhcHBlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW5mcmFzdHJ1Y3R1cmVcIik7XG5cdFx0dmFyIGluZnJhc3RydWN0dXJlTWVudUl0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5pbmZyYXN0cnVjdHVyZVwiKTtcblx0XHR2YXIgcmVwbGFjZUluZnJhc3RydWN0dXJlID0gZmFsc2U7XG5cdFx0dmFyIGlubmVyVGVtcGxhdGUgPSBgJHsgZGF0YS5uYW1lIH06ICR7IGRhdGEuc3RhdHVzIH1gO1xuXG5cdFx0dmFyIHRlbXBsYXRlID0gYCBcblx0XHRcdDxwIGNsYXNzPVwiaW5mcmFzdHJ1Y3R1cmVcIiBkYXRhLXR5cGU9XCIkeyBkYXRhLm5hbWUgfVwiPlxuXHRcdFx0XHQkeyBpbm5lclRlbXBsYXRlIH1cblx0XHRcdDwvcD5cblx0XHRgO1xuXG5cdFx0aWYoaW5mcmFzdHJ1Y3R1cmVNZW51SXRlbXMubGVuZ3RoID4gMCl7XG5cdFx0XHRmb3IgKHZhciBpID0gaW5mcmFzdHJ1Y3R1cmVNZW51SXRlbXMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcblx0XHRcdFx0dmFyIGluZnJhc3RydWN0dXJlTWVudUl0ZW0gPSBpbmZyYXN0cnVjdHVyZU1lbnVJdGVtc1tpXTtcblx0XHRcdFx0aWYoaW5mcmFzdHJ1Y3R1cmVNZW51SXRlbS5hdHRyaWJ1dGVzW1wiZGF0YS10eXBlXCJdLnZhbHVlID09PSBkYXRhLm5hbWUpe1xuXHRcdFx0XHRcdHJlcGxhY2VJbmZyYXN0cnVjdHVyZSA9IHRydWU7XG5cdFx0XHRcdFx0aW5mcmFzdHJ1Y3R1cmVNZW51SXRlbS5pbm5lckhUTUwgPSBpbm5lclRlbXBsYXRlO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdH1cblxuXHRcdGlmKCFyZXBsYWNlSW5mcmFzdHJ1Y3R1cmUpe1xuXHRcdFx0aW5mcmFzdHJ1Y3R1cmVWaWV3V3JhcHBlci5pbm5lckhUTUwgKz0gdGVtcGxhdGU7XG5cdFx0fVxuXHRcblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIE5hcnJhdGl2ZVZpZXcge1xuXG5cdGNvbnN0cnVjdG9yKCl7XG5cdFx0dGhpcy5fc2NlbmU7XG5cdH1cblxuXHRnZXQgc2NlbmUoKXtcblx0XHRyZXR1cm4gdGhpcy5fc2NlbmVcblx0fVxuXG5cdHNldCBzY2VuZShzY2VuZSl7XG5cdFx0dGhpcy5fc2NlbmUgPSBzY2VuZTtcblx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm5hcnJhdGl2ZVwiKS5pbm5lckhUTUwgKz0gYDxkaXYgY2xhc3M9XCJvdXRwdXQtd3JhcHBlclwiIGlkPVwiJHtzY2VuZX1cIj48L2Rpdj5gO1xuXHR9XG5cblx0cmVuZGVyKGRhdGEpe1xuXG5cdFx0dmFyIHRlbXBsYXRlID0gYCBcblx0XHRcdDxwIGNsYXNzPVwib3V0cHV0ICR7IGRhdGEuY2hhcmFjdGVyLm5hbWUgfVwiPlxuXHRcdFx0XHQkeyBkYXRhLmNoYXJhY3Rlci5uYW1lIH06IDxzcGFuIGNsYXNzPVwidXR0ZXJhbmNlXCI+JHsgZGF0YS51dHRlcmFuY2UgfTwvc3Bhbj5cblx0XHRcdDwvcD5gO1xuXG5cdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5zY2VuZSkuaW5uZXJIVE1MICs9IHRlbXBsYXRlO1xuXHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibmFycmF0aXZlXCIpLnNjcm9sbFRvcCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibmFycmF0aXZlXCIpLnNjcm9sbEhlaWdodFxuXHRcdHJldHVybiB0cnVlO1xuXHR9XG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVzb3VyY2VWaWV3IHtcblxuXHRyZW5kZXIoZGF0YSl7XG5cblx0XHR2YXIgcmVzb3VyY2VWaWV3V3JhcHBlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmVzb3VyY2VzXCIpO1xuXHRcdHZhciByZXNvdXJjZU1lbnVJdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucmVzb3VyY2VcIik7XG5cdFx0dmFyIHJlcGxhY2VSZXNvdXJjZSA9IGZhbHNlO1xuXHRcdHZhciBpbm5lclRlbXBsYXRlID0gYCR7IGRhdGEubmFtZSB9OiAkeyBkYXRhLmxldmVsIH1gO1xuXG5cdFx0dmFyIHRlbXBsYXRlID0gYCBcblx0XHRcdDxwIGNsYXNzPVwicmVzb3VyY2VcIiBkYXRhLXR5cGU9XCIkeyBkYXRhLm5hbWUgfVwiPlxuXHRcdFx0XHQkeyBpbm5lclRlbXBsYXRlIH1cblx0XHRcdDwvcD5cblx0XHRgO1xuXG5cdFx0aWYocmVzb3VyY2VNZW51SXRlbXMubGVuZ3RoID4gMCl7XG5cdFx0XHRmb3IgKHZhciBpID0gcmVzb3VyY2VNZW51SXRlbXMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcblx0XHRcdFx0dmFyIHJlc291cmNlTWVudUl0ZW0gPSByZXNvdXJjZU1lbnVJdGVtc1tpXTtcblx0XHRcdFx0aWYocmVzb3VyY2VNZW51SXRlbS5hdHRyaWJ1dGVzW1wiZGF0YS10eXBlXCJdLnZhbHVlID09PSBkYXRhLm5hbWUpe1xuXHRcdFx0XHRcdHJlcGxhY2VSZXNvdXJjZSA9IHRydWU7XG5cdFx0XHRcdFx0cmVzb3VyY2VNZW51SXRlbS5pbm5lckhUTUwgPSBpbm5lclRlbXBsYXRlO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdH1cblxuXHRcdGlmKCFyZXBsYWNlUmVzb3VyY2Upe1xuXHRcdFx0cmVzb3VyY2VWaWV3V3JhcHBlci5pbm5lckhUTUwgKz0gdGVtcGxhdGU7XG5cdFx0fVxuXHRcblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJVmlldyB7XG5cblx0Y29uc3RydWN0b3Iob3B0aW9ucyl7XG5cdFx0dGhpcy5fc2VjdGlvbiA9IG9wdGlvbnMuc2VjdGlvbjtcblx0XHR0aGlzLl9zZWxldG9yID0gb3B0aW9ucy5zZWxlY3Rvcjtcblx0XHR0aGlzLnN0YXRlID0gb3B0aW9ucy5zdGF0ZSB8fCBmYWxzZTtcblx0fVxuXG5cdGdldCBzZWxldG9yKCl7XG5cdFx0cmV0dXJuIHRoaXMuX3NlbGV0b3I7XG5cdH1cblxuXHRnZXQgc2VjdGlvbigpe1xuXHRcdHJldHVybiB0aGlzLl9zZWN0aW9uO1xuXHR9XG5cblx0Z2V0IHN0YXRlKCl7XG5cdFx0cmV0dXJuIHRoaXMuX3N0YXRlO1xuXHR9XG5cblx0c2V0IHN0YXRlKHN0YXRlKXtcblx0XHR0aGlzLl9zdGF0ZSA9IHN0YXRlO1xuXHRcdHZhciBkb21Ob2RlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwodGhpcy5zZWxldG9yKTtcblx0XHRcblx0XHRpZih0aGlzLl9zdGF0ZSl7XG5cdFx0XHRcblx0XHRcdGZvciAodmFyIGkgPSBkb21Ob2Rlcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuXHRcdFx0XHRkb21Ob2Rlc1tpXS5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7XG5cdFx0XHR9O1xuXG5cdFx0fWVsc2V7XG5cblx0XHRcdGZvciAodmFyIGkgPSBkb21Ob2Rlcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuXHRcdFx0XHRkb21Ob2Rlc1tpXS5jbGFzc0xpc3QucmVtb3ZlKCdzaG93Jyk7XG5cdFx0XHR9O1xuXG5cdFx0fVxuXHR9XG5cblx0cmVuZGVyKGRhdGEpe1xuXHRcdHJldHVybiB0cnVlO1xuXHR9XG5cblx0dG9nZ2xlKHZpc3VhbCl7XG5cblx0fVxufSIsImxldCBjb25maWcgPSB7XG5cblx0Ly8gVGhlc2UgYXJlIHByaXZhdGUgcHJvcGVydGllcyB0aGF0IFxuXHQvLyBiaW5kIHRvIHVpIGVsZW1lbnRzXG5cdF91aTogW1xuXHRcdHtzZWN0aW9uOiBcIm1lbnVcIiwgc3RhdGU6IGZhbHNlLCBzZWxlY3RvcjogXCIjbWVudVwifSxcblx0XSxcblxuXHRzcGVlZDogMSxcblxuXHRwZXJzcGVjdGl2ZTogXCJNZVwiLFxuXG5cdHJlc291cmNlczogW1xuXHRcdHtuYW1lOiBcIktpbGxvd2F0dHNcIiwgaW5pdGlhbDogMTB9LCBcblx0XHR7bmFtZTogXCJPeHlnZW5cIixcdCBpbml0aWFsOiAxMH0sXG5cdFx0e25hbWU6IFwiRHJvbmVcIixcdFx0IGluaXRpYWw6IDF9LFxuXHRcdHtuYW1lOiBcIldhdGVyXCIsXHRcdCBpbml0aWFsOiAxMH0sXG5cdF0sXG5cblx0aW5mcmFzdHJ1Y3R1cmU6IFtcblx0XHR7bmFtZTogXCJCcmlkZ2VcIiwgXHRcdHN0YXR1czogdHJ1ZX0sIFxuXHRcdHtuYW1lOiBcIkVuZ2luZWVyaW5nXCIsIFx0c3RhdHVzOiB0cnVlfSxcblx0XHR7bmFtZTogXCJNZWQgQmF5XCIsIFx0XHRzdGF0dXM6IGZhbHNlfSxcblx0XHR7bmFtZTogXCJTY2llbmNlIExhYlwiLCBcdHN0YXR1czogZmFsc2V9LFxuXHRdLFxuXG5cdGNoYXJhY3RlcnM6IFtcIkNFQlNcIl0sXG5cblx0ZW5kR2FtZTogW1xuXHRcdHtpbmZyYXN0cnVjdHVyZTogXCJCcmlkZ2VcIixcdHZhbHVlOiBmYWxzZX0sXG5cdFx0e3Jlc291cmNlczogXCJLaWxsb3dhdHRzXCIsXHR2YWx1ZTogMH0sXG5cdF0sXG59O1xuXG5cbmV4cG9ydCBkZWZhdWx0IGNvbmZpZzsiLCJsZXQgc2NlbmUgPSBbXG5cdFwiQ0VCUzogT2sgZW5naW5lZXJpbmcgaXMgc2VhbGVkLiBMZXRzIHNlZSBpZiBJIGNhbiBnZXQgdGhlIHNoaXBzIHN0YXR1cyBvbnNjcmVlbi5cIixcblx0XCJBcmUgdGhlIG8yIGxldmVscyBzdGFibGU/XCIsXG5cdDYsXG5cdFwiSGVsbG8/IENFQlM/XCIsXG5cdDUsXG5cdFwiRGFtbiBpdCwgSSBqdXN0IGNhbid0IHNlZSBhIGJsb29keSB0aGluZyEgTWF5YmUgSSdsbCB0cnkgbW92ZSBteSBhcm1zLlwiLFxuXHQ1LFxuXHR7XG5cdFx0aXM6IFwidWlcIixcblx0XHRlZmZlY3Q6IFwiRW5hYmxlIG1lbnVcIlxuXHR9LFxuXHQ1LFxuXHR7XG5cdFx0aXM6IFwidWlcIixcblx0XHRlZmZlY3Q6IFwiRGlzYWJsZSBtZW51XCJcblx0fSxcblx0NSxcblx0XCJDRUJTOiBIZXksIGNhbG0gZG93bi4gSSB3YXMgdHJ5aW5nIHRvIGdldCB0aGUgZGlzcGxheSB1cC4gQ2FuIHlvdSBzZWUgaXQ/XCIsXG5cdDcsXG5cdFwiWWVoLCBzb21ldGhpbmcgZmxhc2hlZCBpbiBteSB2aXNpb24gYW5kIHRoZW4gd2VudCBhZ2Fpbi5cIixcblx0NSxcblx0XCJDRUJTOiBPaywgbGV0IG1lIHRyeSBzb21ldGhpbmcgZGlmZmVyZW50XCIsXG5cdFwiV2FpdCwgZG9uJ3QgZ28uIENFQlM/IVwiLFxuXHQxLFxuXHRcIkNFQlM6IDEgc2VjLi4uIEkgdGhpbmsgSSd2ZSBnb3QgaXQuXCIsXG5cdDMsXG5cdHtcblx0XHRpczogXCJ1aVwiLFxuXHRcdGVmZmVjdDogXCJFbmFibGUgbWVudVwiXG5cdH0sXG5cdDUsXG5dXG5cbm1vZHVsZS5leHBvcnRzID0gc2NlbmU7IiwibGV0IHNjZW5lID0gW1xuXHRcIkNFQlM6IEhlbGxvLi4uXCIsIFxuXHQzLFxuXHRcIkNFQlM6IEdsYWQgdG8gc2VlIHlvdSdyZSBmaW5hbGx5IGF3YWtlXCIsXG5cdDUsXG5cdFwiV2hhdHMgZ29pbmcgb24/IEkgY2FuJ3Qgc2VlIGFueXRoaW5nIVwiLFxuXHQzLFxuXHRcIkkgY2FuJ3QgbW92ZSEgSGVscCBtZSFcIixcblx0Mixcblx0XCJDRUJTOiBEb24ndCB3b3JyeSB0aGUgcmVzY3VlIHBhcnR5IHdpbGwgYmUgaGVyZSBzb29uLCBhIGJlYWNvbiB3ZW50IHVwIGEgZmV3IGhvdXJzIGFnby4gUmlnaHQgbm93IHdlJ3ZlIGdvdCBiaWdnZXIgcHJvYmxlbXMuIFRoZSBzaGlwcyBnb3Qgc2V2ZXJhbCBodWxsIGJyZWFjaGVzIGFuZCB3ZSBuZWVkIHRvIGZvY3VzIHdoYXQgbGl0dGxlIGVuZXJneSB3ZSBoYXZlLlwiLFxuXHQyLFxuXHRcIkNFQlM6IExpZmUgc3VwcG9ydCBzeXN0ZW1zIGFyZSBiYWNrIG9ubGluZSBidXQgd2UncmUgcnVubmluZyBvbiByZXNlcnZlIHBvd2VyLiBUaGVyZSdhIGFuIE8yIGxlYWsgaW4gZW5naW5lZXJpbmcgdG9vLlwiLFxuXHQyLFxuXHRcIkNFQlM6IFdoYXQgZG8geW91IHdhbnQgdG8gZG8/XCIsXG5cdHtcblx0XHRpczogXCJkZWNpc2lvblwiLFxuXHRcdGNob2ljZXM6IFtcblx0XHRcdHtcblx0XHRcdFx0dGV4dDogXCJTZWFsIGVuZ2luZWVyaW5nXCIsXG5cdFx0XHRcdGVmZmVjdHM6IHtcblx0XHRcdFx0XHRyZXNvdXJjZTogXCItNSBLaWxsb3dhdHRzXCIsXG5cdFx0XHRcdFx0aW5mcmFzdHJ1Y3R1cmU6IFwiRGlzYWJsZSBFbmdpbmVlcmluZ1wiXG5cdFx0XHRcdH0sXG5cdFx0XHRcdGdvdG86IFwiZmluZC1kcm9uZVwiLFxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0dGV4dDogXCJGaXggdGhlIGJhY2t1cCBnZW5lcmF0b3JcIixcblx0XHRcdFx0ZWZmZWN0czoge1xuXHRcdFx0XHRcdHJlc291cmNlOiBcIi03IEtpbGxvd2F0dHNcIlxuXHRcdFx0XHR9LFxuXHRcdFx0XHRnb3RvOiBcIm8yLWxlYWtpbmdcIixcblx0XHRcdH1cblx0XHRdXG5cdH1cbl1cblxubW9kdWxlLmV4cG9ydHMgPSBzY2VuZTsiXX0=
