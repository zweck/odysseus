(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// grab the config
"use strict";

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _odesseusfile = require('./odesseusfile');

var _odesseusfile2 = _interopRequireDefault(_odesseusfile);

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
var characters = _odesseusfile2["default"].characters.map(function (character) {
	return new _libCharacter2["default"](character);
});

var resources = _odesseusfile2["default"].resources.map(function (resource) {
	return new _libResources2["default"](resource);
});

var infrastructure = _odesseusfile2["default"].infrastructure.map(function (infrastructure) {
	return new _libInfrastructure2["default"](infrastructure);
});

var ui = _odesseusfile2["default"]._ui.map(function (ui) {
	return new _libViewsUIView2["default"](ui);
});

// load the narrative
var narrative = new _libNarrative2["default"]({
	speed: _odesseusfile2["default"].speed,
	perspective: _odesseusfile2["default"].perspective,
	resources: resources,
	characters: characters,
	infrastructure: infrastructure,
	ui: ui
});

// entry point
narrative.run(intro, "intro");

},{"./lib/Character":2,"./lib/Infrastructure":4,"./lib/Narrative":5,"./lib/Resources":6,"./lib/Views/UIView":11,"./odesseusfile":12,"./scenes/intro":14}],2:[function(require,module,exports){
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

			var template = " \n\t\t\t<p class=\"output\">\n\t\t\t\t" + data.character.name + ": " + data.utterance + "\n\t\t\t</p>\n\t\t";

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
			document.getElementById("narrative").innerHTML += "<div id=\"" + scene + "\"></div>";
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

	speed: 100,

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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvaG9tZS9waGF1c2VyL0RldmVsb3BtZW50L29keXNzZXVzL3NyYy9hcHAuanMiLCIvaG9tZS9waGF1c2VyL0RldmVsb3BtZW50L29keXNzZXVzL3NyYy9saWIvQ2hhcmFjdGVyLmpzIiwiL2hvbWUvcGhhdXNlci9EZXZlbG9wbWVudC9vZHlzc2V1cy9zcmMvbGliL0RlY2lzaW9uLmpzIiwiL2hvbWUvcGhhdXNlci9EZXZlbG9wbWVudC9vZHlzc2V1cy9zcmMvbGliL0luZnJhc3RydWN0dXJlLmpzIiwiL2hvbWUvcGhhdXNlci9EZXZlbG9wbWVudC9vZHlzc2V1cy9zcmMvbGliL05hcnJhdGl2ZS5qcyIsIi9ob21lL3BoYXVzZXIvRGV2ZWxvcG1lbnQvb2R5c3NldXMvc3JjL2xpYi9SZXNvdXJjZXMuanMiLCIvaG9tZS9waGF1c2VyL0RldmVsb3BtZW50L29keXNzZXVzL3NyYy9saWIvVmlld3MvRGVjaXNpb25WaWV3LmpzIiwiL2hvbWUvcGhhdXNlci9EZXZlbG9wbWVudC9vZHlzc2V1cy9zcmMvbGliL1ZpZXdzL0luZnJhc3RydWN0dXJlVmlldy5qcyIsIi9ob21lL3BoYXVzZXIvRGV2ZWxvcG1lbnQvb2R5c3NldXMvc3JjL2xpYi9WaWV3cy9OYXJyYXRpdmVWaWV3LmpzIiwiL2hvbWUvcGhhdXNlci9EZXZlbG9wbWVudC9vZHlzc2V1cy9zcmMvbGliL1ZpZXdzL1Jlc291cmNlVmlldy5qcyIsIi9ob21lL3BoYXVzZXIvRGV2ZWxvcG1lbnQvb2R5c3NldXMvc3JjL2xpYi9WaWV3cy9VSVZpZXcuanMiLCIvaG9tZS9waGF1c2VyL0RldmVsb3BtZW50L29keXNzZXVzL3NyYy9vZGVzc2V1c2ZpbGUuanMiLCIvaG9tZS9waGF1c2VyL0RldmVsb3BtZW50L29keXNzZXVzL3NyYy9zY2VuZXMvZmluZC1kcm9uZS5qcyIsIi9ob21lL3BoYXVzZXIv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Q0MsTUFBSSxFQUFFLDBCQUEwQjtBQUNoQyxTQUFPLEVBQUU7QUFDUixXQUFRLEVBQUUsZUFBZTtHQUN6QjtBQUNELE1BQUksRUFBRSxZQUFZO0VBQ2xCLENBQ0Q7Q0FDRCxDQUNELENBQUE7O0FBRUQsTUFBTSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLy8gZ3JhYiB0aGUgY29uZmlnXG5pbXBvcnQgY29uZmlnIGZyb20gJy4vb2Rlc3NldXNmaWxlJztcblxuLy8gaW1wb3J0IHRoZSBnYW1lIGNsYXNzZXNcbmltcG9ydCBDaGFyYWN0ZXIgZnJvbSBcIi4vbGliL0NoYXJhY3RlclwiO1xuaW1wb3J0IE5hcnJhdGl2ZSBmcm9tIFwiLi9saWIvTmFycmF0aXZlXCI7XG5pbXBvcnQgUmVzb3VyY2VzIGZyb20gXCIuL2xpYi9SZXNvdXJjZXNcIjtcbmltcG9ydCBJbmZyYXN0cnVjdHVyZSBmcm9tIFwiLi9saWIvSW5mcmFzdHJ1Y3R1cmVcIjtcblxuLy8gaW1wb3J0IHRoZSBWaXN1YWxzIFZpZXcgY2xhc3MgdG8gaW5pdGlhbGl6ZSBzb21lIG9mIHRoZSB1aSBwcm9wZXJ0aWVzXG5pbXBvcnQgVUlWaWV3IGZyb20gXCIuL2xpYi9WaWV3cy9VSVZpZXdcIjtcblxuLy8gaW1wb3J0IHRoZSBzY2VuZXNcbnZhciBpbnRybyA9IHJlcXVpcmUoXCIuL3NjZW5lcy9pbnRyb1wiKTtcblxuLy8gaW5pdGlhbGlzZSB0aGUgZ2FtZSByZXNvdXJjZXNcbmxldCBjaGFyYWN0ZXJzID0gY29uZmlnLmNoYXJhY3RlcnMubWFwKGZ1bmN0aW9uIChjaGFyYWN0ZXIpIHtcblx0cmV0dXJuIG5ldyBDaGFyYWN0ZXIoY2hhcmFjdGVyKTtcbn0pO1xuXG5sZXQgcmVzb3VyY2VzID0gY29uZmlnLnJlc291cmNlcy5tYXAoZnVuY3Rpb24ocmVzb3VyY2Upe1xuXHRyZXR1cm4gbmV3IFJlc291cmNlcyhyZXNvdXJjZSk7XG59KTtcblxubGV0IGluZnJhc3RydWN0dXJlID0gY29uZmlnLmluZnJhc3RydWN0dXJlLm1hcChmdW5jdGlvbihpbmZyYXN0cnVjdHVyZSl7XG5cdHJldHVybiBuZXcgSW5mcmFzdHJ1Y3R1cmUoaW5mcmFzdHJ1Y3R1cmUpO1xufSk7XG5cbmxldCB1aSA9IGNvbmZpZy5fdWkubWFwKGZ1bmN0aW9uKHVpKXtcblx0cmV0dXJuIG5ldyBVSVZpZXcodWkpO1xufSk7XG5cblxuLy8gbG9hZCB0aGUgbmFycmF0aXZlXG5sZXQgbmFycmF0aXZlID0gbmV3IE5hcnJhdGl2ZSh7XG5cdHNwZWVkOiBjb25maWcuc3BlZWQsXG5cdHBlcnNwZWN0aXZlOiBjb25maWcucGVyc3BlY3RpdmUsXG5cdHJlc291cmNlczogcmVzb3VyY2VzLFxuXHRjaGFyYWN0ZXJzOiBjaGFyYWN0ZXJzLFxuXHRpbmZyYXN0cnVjdHVyZTogaW5mcmFzdHJ1Y3R1cmUsXG5cdHVpOiB1aSxcbn0pO1xuXG4vLyBlbnRyeSBwb2ludFxubmFycmF0aXZlLnJ1bihpbnRybywgXCJpbnRyb1wiKTsiLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBDaGFyYWN0ZXIge1xuXHRjb25zdHJ1Y3RvcihuYW1lKXtcblx0XHR0aGlzLm5hbWUgPSBuYW1lO1xuXHR9XG5cblx0c2F5KCl7XG5cdFx0XG5cdH1cbn0iLCJpbXBvcnQgRGVjaXNpb25WaWV3IGZyb20gJy4vVmlld3MvRGVjaXNpb25WaWV3JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGVjaXNpb24ge1xuXHRjb25zdHJ1Y3RvcihvcHRpb25zKXtcblx0XHR0aGlzLl9jaG9pY2VzID0gb3B0aW9ucy5jaG9pY2VzO1xuXHRcdHRoaXMuX3Jlc291cmNlcyA9IG9wdGlvbnMucmVzb3VyY2VzO1xuXHRcdHRoaXMuX2luZnJhc3RydWN0dXJlID0gb3B0aW9ucy5pbmZyYXN0cnVjdHVyZTtcblx0XHR0aGlzLl9kZWNpc2lvblZpZXcgPSBuZXcgRGVjaXNpb25WaWV3KHRoaXMpO1xuXHRcdHRoaXMuX25hcnJhdGl2ZSA9IG9wdGlvbnMubmFycmF0aXZlO1xuXG5cdFx0dGhpcy5pbml0KCk7XG5cdH1cblxuXHRpbml0KCl7XG5cdFx0dGhpcy5fZGVjaXNpb25WaWV3LnJlbmRlcih0aGlzLl9jaG9pY2VzKTtcblx0fVxuXG5cdGdldCBkZWNpc2lvbkV2ZW50KCl7XG5cdFx0cmV0dXJuIHRoaXMuX2RlY2lzaW9uRXZlbnQ7XG5cdH1cblxuXHRzZXQgZGVjaXNpb25FdmVudChldnQpe1xuXHRcdHRoaXMuX2RlY2lzaW9uRXZlbnQgPSBldnQ7XG5cdFx0dGhpcy5jb25jZXF1ZW5jZXMoKTtcblx0fVxuXG5cdGNvbmNlcXVlbmNlcygpe1xuXHRcdHZhciBhdHRyaWJ1dGVzID0gdGhpcy5kZWNpc2lvbkV2ZW50LnNyY0VsZW1lbnQuZGF0YXNldDtcblx0XHRcblx0XHRmb3IodmFyIGsgaW4gYXR0cmlidXRlcykge1xuXG5cdFx0XHRzd2l0Y2goaykge1xuXHRcdFx0XHRjYXNlIFwicmVzb3VyY2VcIjpcblx0XHRcdFx0XHR2YXIgcmVzb3VyY2VFZmZlY3QgPSBhdHRyaWJ1dGVzW2tdLnNwbGl0KFwiIFwiKTtcblx0XHRcdFx0XHR2YXIgZWZmZWN0ID0gcGFyc2VJbnQocmVzb3VyY2VFZmZlY3RbMF0pO1xuXHRcdFx0XHRcdHZhciByZXNvdXJjZSA9IHJlc291cmNlRWZmZWN0WzFdO1xuXHRcdFx0XHRcdHRoaXMuX3Jlc291cmNlc1tyZXNvdXJjZV0ubGV2ZWwgPSBlZmZlY3Q7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlIFwiaW5mcmFzdHJ1Y3R1cmVcIjpcblx0XHRcdFx0XHR2YXIgaW5mcmFzdHJ1Y3R1cmVFZmZlY3QgPSBhdHRyaWJ1dGVzW2tdLnNwbGl0KFwiIFwiKTtcblx0XHRcdFx0XHR2YXIgZWZmZWN0ID0gaW5mcmFzdHJ1Y3R1cmVFZmZlY3RbMF0udHJpbSgpLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHRcdFx0aWYoZWZmZWN0ID09PSBcImRpc2FibGVcIil7XG5cdFx0XHRcdFx0XHRlZmZlY3QgPSBmYWxzZTtcblx0XHRcdFx0XHR9ZWxzZSBpZihlZmZlY3QgPT09IFwiZW5hYmxlXCIpe1xuXHRcdFx0XHRcdFx0ZWZmZWN0ID0gdHJ1ZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0dmFyIGluZnJhc3RydWN0dXJlID0gaW5mcmFzdHJ1Y3R1cmVFZmZlY3RbMV07XG5cdFx0XHRcdFx0dGhpcy5faW5mcmFzdHJ1Y3R1cmVbaW5mcmFzdHJ1Y3R1cmVdLnN0YXR1cyA9IGVmZmVjdDtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0Y29uc29sZS5sb2coYXR0cmlidXRlc1trXSk7XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdHRoaXMuX25hcnJhdGl2ZS5tb3ZlU2NlbmUoYXR0cmlidXRlc1tcImdvdG9cIl0pO1xuXHR9XG59IiwiaW1wb3J0IEluZnJhc3RydWN0dXJlVmlldyBmcm9tICcuL1ZpZXdzL0luZnJhc3RydWN0dXJlVmlldyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZnJhc3RydWN0dXJlIHtcblxuXHRjb25zdHJ1Y3RvcihvcHRpb25zKXtcblx0XHR0aGlzLm5hbWUgPSBvcHRpb25zLm5hbWU7XG5cdFx0dGhpcy5fc3RhdHVzID0gb3B0aW9ucy5zdGF0dXM7XG5cblx0XHR0aGlzLl9pbmZyYXN0cnVjdHVyZVZpZXcgPSBuZXcgSW5mcmFzdHJ1Y3R1cmVWaWV3KCk7XG5cdFx0dGhpcy5faW5mcmFzdHJ1Y3R1cmVWaWV3LnJlbmRlcigge25hbWU6IHRoaXMubmFtZSwgc3RhdHVzOiB0aGlzLnN0YXR1c30gKTtcblx0fVxuXG5cdGdldCBzdGF0dXMoKXtcblx0XHRyZXR1cm4gdGhpcy5fc3RhdHVzO1xuXHR9XG5cblx0c2V0IHN0YXR1cyhzdGF0dXMpe1xuXHRcdHRoaXMuX3N0YXR1cyA9IHN0YXR1cztcblx0XHR0aGlzLl9pbmZyYXN0cnVjdHVyZVZpZXcucmVuZGVyKCB7bmFtZTogdGhpcy5uYW1lLCBzdGF0dXM6IHRoaXMuc3RhdHVzfSApO1xuXHR9XG59IiwiaW1wb3J0IE5hcnJhdGl2ZVZpZXcgZnJvbSAnLi9WaWV3cy9OYXJyYXRpdmVWaWV3JztcbmltcG9ydCBVSVZpZXcgZnJvbSAnLi9WaWV3cy9VSVZpZXcnO1xuaW1wb3J0IERlY2lzaW9uIGZyb20gJy4vRGVjaXNpb24nO1xuXG4vLyBtYXAgdGhlIHNjZW5lcyBmb3IgcmVxdWlyZSwgdGhpcyBjdXJyZW50bHkgbmVlZHMgdG8gXG4vLyBiZSBkb25lIG1hbnVhbGx5IHVudGlsIEkgZmluZCBhIHdheSBvZiBkeW5hbWljYWxseSBsb2FkaW5nIG1vZHVsZXNcbmxldCBGaW5kRHJvbmVTY2VuZSA9IHJlcXVpcmUoJy4uL3NjZW5lcy9maW5kLWRyb25lJyk7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE5hcnJhdGl2ZSB7XG5cdGNvbnN0cnVjdG9yKG9wdGlvbnMpe1xuXG5cdFx0dGhpcy5fbmFycmF0aXZlVmlldyA9IG5ldyBOYXJyYXRpdmVWaWV3KCk7XG5cblx0XHQvLyBzZXR1cCBzb21lIHB1YmxpYyBwcm9wZXJ0aWVzXG5cdFx0dGhpcy5fc3BlZWQgPSBvcHRpb25zLnNwZWVkIHx8IDE7XG5cdFx0dGhpcy5fcGVyc3BlY3RpdmUgPSBvcHRpb25zLnBlcnNwZWN0aXZlO1xuXHRcdHRoaXMuX3Byb2dyZXNzID0gMDtcblx0XHR0aGlzLl9jaGFyYWN0ZXJzID0gb3B0aW9ucy5jaGFyYWN0ZXJzO1xuXHRcdHRoaXMuX3Jlc291cmNlcyA9IG9wdGlvbnMucmVzb3VyY2VzO1xuXHRcdHRoaXMuX2luZnJhc3RydWN0dXJlID0gb3B0aW9ucy5pbmZyYXN0cnVjdHVyZTtcblx0XHR0aGlzLl91aSA9IG9wdGlvbnMudWk7XG5cblx0XHQvLyBjcmVhdGUgYW4gb2JqZWN0IG9mIGNoYXJhY3RlcnMgbWFwcGluZyBuYW1lcyBhZ2FpbnN0IHRoZWlyIFxuXHRcdC8vIGNoYXJhY3RlciBjbGFzcyBpbnN0YW5jZVxuXHRcdHRoaXMuX2NoYXJhY3RlcnNCeU5hbWUgPSB7fTtcblx0XHR0aGlzLl9jaGFyYWN0ZXJzLmZvckVhY2goKGNoYXJhY3RlcikgPT4ge1xuXHRcdFx0dGhpcy5fY2hhcmFjdGVyc0J5TmFtZVtjaGFyYWN0ZXIubmFtZV0gPSBjaGFyYWN0ZXI7XG5cdFx0fSk7XG5cblx0XHQvLyBjcmVhdGUgYW4gb2JqZWN0IG9mIHJlc291cmNlcyBtYXBwaW5nIG5hbWVzIGFnYWluc3QgdGhlaXIgXG5cdFx0Ly8gcmVzb3VyY2UgY2xhc3MgaW5zdGFuY2Vcblx0XHR0aGlzLl9yZXNvdXJjZXNCeU5hbWUgPSB7fTtcblx0XHR0aGlzLl9yZXNvdXJjZXMuZm9yRWFjaCgocmVzb3VyY2UpID0+IHtcblx0XHRcdHRoaXMuX3Jlc291cmNlc0J5TmFtZVtyZXNvdXJjZS5uYW1lXSA9IHJlc291cmNlO1xuXHRcdH0pO1x0XHRcblxuXG5cdFx0Ly8gY3JlYXRlIGFuIG9iamVjdCBvZiBpbmZyYXN0cnVjdHVyZSBtYXBwaW5nIG5hbWVzIGFnYWluc3QgdGhlaXIgXG5cdFx0Ly8gcmVzb3VyY2UgY2xhc3MgaW5zdGFuY2Vcblx0XHR0aGlzLl9pbmZyYXN0cnVjdHVyZUJ5TmFtZSA9IHt9O1xuXHRcdHRoaXMuX2luZnJhc3RydWN0dXJlLmZvckVhY2goKGluZnJhc3RydWN0dXJlKSA9PiB7XG5cdFx0XHR0aGlzLl9pbmZyYXN0cnVjdHVyZUJ5TmFtZVtpbmZyYXN0cnVjdHVyZS5uYW1lXSA9IGluZnJhc3RydWN0dXJlO1xuXHRcdH0pO1x0XG5cblxuXHRcdC8vIGNyZWF0ZSBhbiBvYmplY3Qgb2YgdWl2aWV3IG1hcHBpbmcgc2VjdGlvbnMgYWdhaW5zdCB0aGVpciBcblx0XHQvLyByZXNvdXJjZSBjbGFzcyBpbnN0YW5jZVxuXHRcdHRoaXMuX3VpQnlTZWN0aW9uID0ge307XG5cdFx0dGhpcy5fdWkuZm9yRWFjaCgodWkpID0+IHtcblx0XHRcdHRoaXMuX3VpQnlTZWN0aW9uW3VpLnNlY3Rpb25dID0gdWk7XG5cdFx0fSk7XHRcblx0fVxuXG5cdHNldCBuYXJyYXRpdmUoc2NlbmUpe1xuXHRcdHRoaXMuX25hcnJhdGl2ZSA9IHNjZW5lO1xuXHR9XG5cblx0Z2V0IG5hcnJhdGl2ZSgpe1xuXHRcdHJldHVybiB0aGlzLl9uYXJyYXRpdmU7XG5cdH1cblxuXHQvKipcblx0ICogVGhpcyBtZXRob2QgaXMgdGhlIGluaXRpYWxpc2VyIGZvciB0aGUgbmFycmF0aXZlIGNsYXNzXG5cdCAqIEBwYXJhbSAge0FycmF5PFN0cmluZz59IG5hcnJhdGl2ZSBUaGlzIG1ldGhvZCB0YWtlcyBhIHNjZW5lIGFuZCBydW5zIHRocm91Z2ggaXRcblx0ICovXG5cdHJ1bihzY2VuZSwgc2NlbmVOYW1lKXtcblx0XHR0aGlzLl9uYXJyYXRpdmVWaWV3LnNjZW5lID0gc2NlbmVOYW1lO1xuXHRcdHRoaXMubmFycmF0aXZlID0gc2NlbmU7XG5cdFx0dGhpcy5nbygpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFRoaXMgaXMgYSBzY2VuZSBwcm9ncmVzcyBjb3VudCB1c2VkIGluIHRoZSBgZ28oKWAgbWV0aG9kXG5cdCAqIEBwYXJhbSAge2ludGVnZXJ9IGluY0Ftb3VudCBUaGlzIGlzIHRoZSBhbW91bnQgdG8gcHJvZ3Jlc3MgdGhlIG5hcnJhdGl2ZSwgZGVmYXVsdCBpcyAxXG5cdCAqL1xuXHRpbmNyZW1lbnRQcm9ncmVzcyhpbmNBbW91bnQ9MSl7XG5cdFx0dmFyIGluY0Ftb3VudCA9IGluY0Ftb3VudDtcblx0XHR0aGlzLl9wcm9ncmVzcyA9IHRoaXMuX3Byb2dyZXNzICsgaW5jQW1vdW50O1xuXHR9XG5cblx0LyoqXG5cdCAqIFRoaXMgbWV0aG9kIHBhcnNlcyBvdXQgdGhlIGNoYXJhY3RlciBhdCB0aGUgc3RhcnQgb2YgdGhlIHV0dGVyYW5jZSBhbmQgY2hlY2tzIHRoYXQgdGhleSBleGlzdCBpbiB0aGUgY2hhcmFjdGVyIGNsYXNzXG5cdCAqIEBwYXJhbSAge3N0cmluZ30gbmFycmF0aXZlIFRoZSB1dHRlcmFuY2UgZnJvbSB0aGUgc2NlbmUgYXJyYXlcblx0ICogQHJldHVybiB7c3RyaW5nfSBjaGFyYWN0ZXIgVGhlIGNoYXJhY3RlciBuYW1lIGZyb20gdGhlIHV0dGVyYW5jZVxuXHQgKi9cblx0Z2V0Q2hhcmFjdGVyc0Zvck5hcnJhdGl2ZShuYXJyYXRpdmUpe1xuXHRcdHZhciBuYW1lID0gbmFycmF0aXZlLnNwbGl0KFwiOlwiKVswXS50cmltKCk7XG5cdFx0cmV0dXJuIHRoaXMuX2NoYXJhY3RlcnNCeU5hbWVbbmFtZV0gfHwgZmFsc2U7XG5cdH1cblxuXHQvKipcblx0ICogVGhpcyBtZXRob2Qgb2Zmc2V0cyB0aGUgd2FpdCB0aW1lIGJ5IHRoZSBhbW91bnQgb2YgY2hhcmFjdGVycyBpbiB0aGUgdXR0ZXJhbmNlXG5cdCAqIEBwYXJhbSAge3N0cmluZ30gbmFycmF0aXZlIFRoZSB1dHRlcmFuY2UgZnJvbSB0aGUgc2NlbmUgYXJyYXlcblx0ICogQHJldHVybiB7bnVtYmVyfSAgICAgICAgICAgVGhlIGFtb3VudCBvZiBjaGFyYWN0ZXJzICogMTAwbXNcblx0ICovXG5cdHRleHRMZW5ndGhPZmZzZXQobmFycmF0aXZlKXtcblx0XHRyZXR1cm4gbmFycmF0aXZlLmxlbmd0aCAqIDEwMDtcblx0fVxuXG5cblx0dHlwZSh1dHRlcmFuY2Upe1xuXHRcdHZhciB1dHRlcmFuY2VUeXBlID0gdHlwZW9mIHV0dGVyYW5jZTtcblx0XHRyZXR1cm4gdXR0ZXJhbmNlVHlwZTtcblx0fVxuXG5cdG1vdmVTY2VuZShzY2VuZSl7XG5cdFx0dmFyIG5leHRTY2VuZSA9IHJlcXVpcmUoXCIuLi9zY2VuZXMvXCIgKyBzY2VuZSk7XG5cdFx0dGhpcy5fcHJvZ3Jlc3MgPSAwO1xuXHRcdHRoaXMucnVuKG5leHRTY2VuZSwgc2NlbmUpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFRoaXMgbWV0aG9kIGlzIHRoZSBtYWluIHNjZW5lIHBhcnNlciwgaXQgaXRlcmF0ZXMgdGhyb3VnaCB0aGUgc2NlbmUgYW5kIG91dHB1dHMgdGhlIG5hcnJhdGl2ZSBpbnRvIHRoZSBOYXJyYXRpdmVWaWV3XG5cdCAqL1xuXHRnbygpe1xuXG5cdFx0Ly8gZ3JhYiB0aGUgY3VycmVudCBwcm9ncmVzc1xuXHRcdHZhciBpID0gdGhpcy5fcHJvZ3Jlc3M7XG5cblx0XHQvLyBnZXQgdGhlIHNjZW5lIG5hcnJhdGl2ZVxuXHRcdHZhciBuYXJyYXRpdmUgPSB0aGlzLm5hcnJhdGl2ZTtcblxuXHRcdC8vIGluaXRpYWxpc2Ugc29tZSB2YXJzXG5cdFx0dmFyIHV0dGVyYW5jZSwgdXR0ZXJhbmNlVHlwZTtcblx0XHRcblx0XHQvLyBpZiB3ZSdyZSBzdGlsbCBpbiBhIG5hcnJhdGl2ZVxuXHRcdGlmKCBpIDwgbmFycmF0aXZlLmxlbmd0aCApe1xuXG5cdFx0XHR1dHRlcmFuY2UgPSBuYXJyYXRpdmVbaV07XG5cblx0XHRcdC8vIGdldCB0aGUgYHR5cGVgIG9mIG9iamVjdCBpbiB0aGUgc2NlbmUgYXJyYXlcblx0XHRcdHV0dGVyYW5jZVR5cGUgPSB0aGlzLnR5cGUodXR0ZXJhbmNlKTtcblxuXHRcdFx0Ly8gZGVjaWRlIHdoaWNoIG1ldGhvZCB0byBydW4gb24gdGhlIHNjZW5lIHV0dGVyYW5jZVxuXHRcdFx0c3dpdGNoKHV0dGVyYW5jZVR5cGUpIHtcblx0XHRcdFx0Y2FzZSBcInN0cmluZ1wiOlxuXHRcdFx0XHRcdC8vIGlmIHRoZSBhcnJheSBlbGVtZW50IGlzIGEgc3RyaW5nIHBhc3MgaXQgdG8gdGhlIHNheSBtZXRob2Rcblx0XHRcdFx0XHR0aGlzLnNheSh1dHRlcmFuY2UpO1xuXG5cdFx0XHRcdFx0Ly8gaW5jcmVtZW50IHRoZSBwcm9ncmVzc1xuXHRcdFx0XHRcdHRoaXMuaW5jcmVtZW50UHJvZ3Jlc3MoKTtcblx0XHRcdFx0XHRcblx0XHRcdFx0XHQvLyByZXBlYXRcblx0XHRcdFx0XHR0aGlzLmdvKCk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlIFwibnVtYmVyXCI6XG5cdFx0XHRcdFx0Ly8gaWYgdGhlIGFycmF5IGVsZW1lbnQgaXMgYW4gaW50ZWdlciwgcGFzcyB0aGUgaW50IGFuZCB0aGUgYXJyYXkgaW5kZXggdG8gdGhlIHdhaXQgbWV0aG9kXG5cdFx0XHRcdFx0dGhpcy53YWl0KHV0dGVyYW5jZSwgaSk7XG5cdFx0XHRcdGNhc2UgXCJvYmplY3RcIjpcblxuXHRcdFx0XHRcdGlmICh1dHRlcmFuY2UuaXMgPT09IFwiZGVjaXNpb25cIikge1xuXHRcdFx0XHRcdFx0dGhpcy5kZWNpZGUodXR0ZXJhbmNlKTtcdFx0XHRcdFx0XG5cdFx0XHRcdFx0fWVsc2UgaWYgKHV0dGVyYW5jZS5pcyA9PT0gXCJ1aVwiKSB7XG5cdFx0XHRcdFx0XHR0aGlzLnVpKHV0dGVyYW5jZSk7XG5cblx0XHRcdFx0XHRcdC8vIGluY3JlbWVudCB0aGUgcHJvZ3Jlc3Ncblx0XHRcdFx0XHRcdHRoaXMuaW5jcmVtZW50UHJvZ3Jlc3MoKTtcblx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0Ly8gcmVwZWF0XG5cdFx0XHRcdFx0XHR0aGlzLmdvKCk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdHRoaXMuc2F5KHV0dGVyYW5jZSk7XG5cdFx0XHR9XG5cblx0XHR9XG5cblx0fVxuXG5cdHNheSh1dHRlcmFuY2Upe1xuXG5cdFx0dmFyIGNoYXJhY3Rlcjtcblx0XHRcblx0XHQvLyBnZXQgYSB0aGUgY2hhcmFjdGVyIGZyb20gdGhlIGZyb250IG9mIHRoZSBzY2VuZSB0ZXh0IHN0cmluZ1xuXHRcdGNoYXJhY3RlciA9IHRoaXMuZ2V0Q2hhcmFjdGVyc0Zvck5hcnJhdGl2ZSh1dHRlcmFuY2UpO1xuXG5cdFx0Ly8gaWYgdGhlIGNoYXJhY3RlciBpbiB0aGUgbmFycmF0aXZlIGlzbid0IGluIHRoZSBjaGFyYWN0ZXJzIHNldHVwXG5cdFx0Ly8gYXNzdW1lIHRoYXQgaXRzIHRoZSBwcm90YWdhbmlzdFxuXHRcdGlmKCFjaGFyYWN0ZXIpe1xuXG5cdFx0XHRjaGFyYWN0ZXIgPSB7bmFtZTogdGhpcy5fcGVyc3BlY3RpdmV9O1xuXHRcdFx0XG5cdFx0fWVsc2V7XG5cblx0XHRcdC8vIHJlbW92ZSB0aGUgY2hhcmFjdGVyIGZyb20gdGhlIHRleHQgc3RyaW5nXG5cdFx0XHR1dHRlcmFuY2UgPSB1dHRlcmFuY2UucmVwbGFjZShjaGFyYWN0ZXIubmFtZSArIFwiOlwiLCBcIlwiKTtcblx0XHR9XG5cblx0XHQvLyBwYXNzIHRoZSBjaGFyYWN0ZXIgYW5kIHRoZSB0ZXh0IHRvIHRoZSBuYXJyYXRpdmUgdmlld1xuXHRcdHRoaXMuX25hcnJhdGl2ZVZpZXcucmVuZGVyKHt1dHRlcmFuY2U6IHV0dGVyYW5jZSwgY2hhcmFjdGVyOiBjaGFyYWN0ZXJ9KTtcblxuXHR9XG5cblx0dWkodWkpe1xuXG5cdFx0dmFyIHVpRWZmZWN0ID0gdWkuZWZmZWN0LnNwbGl0KFwiIFwiKTtcblx0XHR2YXIgZWZmZWN0ID0gdWlFZmZlY3RbMF0udHJpbSgpLnRvTG93ZXJDYXNlKCk7XG5cdFx0XG5cdFx0aWYoZWZmZWN0ID09PSBcImRpc2FibGVcIil7XG5cdFx0XHRlZmZlY3QgPSBmYWxzZTtcblx0XHR9ZWxzZSBpZihlZmZlY3QgPT09IFwiZW5hYmxlXCIpe1xuXHRcdFx0ZWZmZWN0ID0gdHJ1ZTtcblx0XHR9XG5cblx0XHR0aGlzLl91aUJ5U2VjdGlvblt1aUVmZmVjdFsxXV0uc3RhdGUgPSBlZmZlY3Q7XG5cdH1cblxuXHRkZWNpZGUoZGVjaXNpb24pe1xuXG5cdFx0dGhpcy5fZGVjaXNpb24gPSBuZXcgRGVjaXNpb24oe1xuXHRcdFx0Y2hvaWNlczogZGVjaXNpb24uY2hvaWNlcyxcblx0XHRcdGluZnJhc3RydWN0dXJlOiB0aGlzLl9pbmZyYXN0cnVjdHVyZUJ5TmFtZSxcblx0XHRcdHJlc291cmNlczogdGhpcy5fcmVzb3VyY2VzQnlOYW1lLFxuXHRcdFx0bmFycmF0aXZlOiB0aGlzLFxuXHRcdH0pO1xuXG5cdH1cblxuXHR3YWl0KHdhaXRUaW1lLCBpKXtcblx0XHR2YXIgcHJldmlvdXNOYXJyYXRpdmUgPSB0aGlzLm5hcnJhdGl2ZVtpLTFdO1xuXHRcdHZhciB0aW1lID0gd2FpdFRpbWUgKiAxMDAwICsgdGhpcy50ZXh0TGVuZ3RoT2Zmc2V0KHByZXZpb3VzTmFycmF0aXZlKTtcblx0XHR0aW1lID0gdGltZS90aGlzLl9zcGVlZDtcblx0XHRzZXRUaW1lb3V0KCgpID0+IHtcblx0XHRcdHRoaXMuaW5jcmVtZW50UHJvZ3Jlc3MoKTtcblx0XHRcdHRoaXMuZ28oKTtcblx0XHR9LCB0aW1lKTtcblx0fVxufSIsImltcG9ydCBSZXNvdXJjZVZpZXcgZnJvbSAnLi9WaWV3cy9SZXNvdXJjZVZpZXcnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZXNvdXJjZXMge1xuXG5cdGNvbnN0cnVjdG9yKG9wdGlvbnMpe1xuXHRcdHRoaXMubmFtZSA9IG9wdGlvbnMubmFtZTtcblx0XHR0aGlzLl9sZXZlbCA9IG9wdGlvbnMuaW5pdGlhbDtcblx0XHR0aGlzLl9yZXNvdXJjZVZpZXcgPSBuZXcgUmVzb3VyY2VWaWV3KCk7XG5cdFx0dGhpcy5fcmVzb3VyY2VWaWV3LnJlbmRlcigge25hbWU6IHRoaXMubmFtZSwgbGV2ZWw6IHRoaXMubGV2ZWx9ICk7XG5cdH1cblxuXHRnZXQgbGV2ZWwoKXtcblx0XHRyZXR1cm4gdGhpcy5fbGV2ZWw7XG5cdH1cblxuXHRzZXQgbGV2ZWwobGV2ZWxBZGp1c3Qpe1xuXHRcdHRoaXMuX2xldmVsID0gdGhpcy5fbGV2ZWwgKyBsZXZlbEFkanVzdDtcblx0XHR0aGlzLl9yZXNvdXJjZVZpZXcucmVuZGVyKCB7bmFtZTogdGhpcy5uYW1lLCBsZXZlbDogdGhpcy5sZXZlbH0gKTtcblx0fVxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIERlY2lzaW9uVmlldyB7XG5cblx0Y29uc3RydWN0b3IoZGVjaXNpb25JbnN0YW5jZSl7XG5cdFx0dGhpcy5kZWNpc2lvbkluc3RhbmNlID0gZGVjaXNpb25JbnN0YW5jZTtcblx0fVxuXG5cdHJlbmRlcihjaG9pY2VzKXtcblxuXHRcdHZhciB0ZW1wbGF0ZSA9IFwiXCI7XG5cblx0XHRmb3IobGV0IGkgaW4gY2hvaWNlcykgeyBcblx0XHRcdHZhciBjaG9pY2UgPSBjaG9pY2VzW2ldO1xuXG5cdFx0XHR2YXIgZWZmZWN0cyA9IG5ldyBTdHJpbmc7XG5cblx0XHRcdC8vIGFkZCB0aGUgZWZmZWN0cyB0byB0aGUgYnV0dG9uIHRlbXBsYXRlLiBUaGlzIGlzIHdlYWsgYW5kIFxuXHRcdFx0Ly8gbmVlZHMgdG8gYmUgYWJzdHJhY3RlZCBhbmQgaW1wb3J2ZWRcblx0XHRcdGZvcih2YXIgayBpbiBjaG9pY2UuZWZmZWN0cyl7XG5cdFx0XHRcdGVmZmVjdHMgPSBlZmZlY3RzICsgXCJkYXRhLVwiICsgayArIFwiPVwiICsgSlNPTi5zdHJpbmdpZnkoY2hvaWNlLmVmZmVjdHNba10pICsgXCIgXCI7XG5cdFx0XHR9XG5cblx0XHRcdGVmZmVjdHMgPSBlZmZlY3RzICsgXCJkYXRhLWdvdG89XCIgKyBKU09OLnN0cmluZ2lmeShjaG9pY2UuZ290byk7XG5cblx0XHRcdHRlbXBsYXRlKz0gYCBcblx0XHRcdFx0PHNwYW4gY2xhc3M9XCJhbnN3ZXItZ3JvdXBcIj5cblx0XHRcdFx0XHQ8YnV0dG9uICR7IGVmZmVjdHMgfSA+JHsgY2hvaWNlLnRleHQgfTwvYnV0dG9uPlxuXHRcdFx0XHQ8L3NwYW4+XG5cdFx0XHRgO1xuXHRcdH0gXG5cblx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm5hcnJhdGl2ZVwiKS5pbm5lckhUTUwgKz0gdGVtcGxhdGU7XG5cblx0XHR0aGlzLmJpbmRFdmVudHMoKTtcblxuXHRcdHJldHVybiB0cnVlO1xuXHR9XG5cblx0ZGVjaWRlKGV2dCl7XG5cdFx0Zm9yICh2YXIgaSA9IHRoaXMuZGVjaWNpb25CdXR0b25zLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG5cdFx0XHR0aGlzLmRlY2ljaW9uQnV0dG9uc1tpXS5kaXNhYmxlZCA9IFwidHJ1ZVwiO1xuXHRcdH07XG5cblx0XHR0aGlzLmRlY2lzaW9uSW5zdGFuY2UuZGVjaXNpb25FdmVudCA9IGV2dDtcblx0fVxuXG5cdGJpbmRFdmVudHMoKXtcblx0XHR0aGlzLmRlY2ljaW9uQnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuYW5zd2VyLWdyb3VwIGJ1dHRvblwiKTtcblx0XHRmb3IgKHZhciBpID0gdGhpcy5kZWNpY2lvbkJ1dHRvbnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcblx0XHRcdHZhciBidXR0b24gPSB0aGlzLmRlY2ljaW9uQnV0dG9uc1tpXTtcblx0XHRcdGlmKCFidXR0b24uZGlzYWJsZWQpe1xuXHRcdFx0XHRidXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGV2dCA9PiB0aGlzLmRlY2lkZShldnQpLGZhbHNlKTtcblx0XHRcdH1cblx0XHR9O1xuXHR9XG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5mcmFzdHJ1Y3R1cmVWaWV3IHtcblxuXHRyZW5kZXIoZGF0YSl7XG5cblx0XHR2YXIgaW5mcmFzdHJ1Y3R1cmVWaWV3V3JhcHBlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW5mcmFzdHJ1Y3R1cmVcIik7XG5cdFx0dmFyIGluZnJhc3RydWN0dXJlTWVudUl0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5pbmZyYXN0cnVjdHVyZVwiKTtcblx0XHR2YXIgcmVwbGFjZUluZnJhc3RydWN0dXJlID0gZmFsc2U7XG5cdFx0dmFyIGlubmVyVGVtcGxhdGUgPSBgJHsgZGF0YS5uYW1lIH06ICR7IGRhdGEuc3RhdHVzIH1gO1xuXG5cdFx0dmFyIHRlbXBsYXRlID0gYCBcblx0XHRcdDxwIGNsYXNzPVwiaW5mcmFzdHJ1Y3R1cmVcIiBkYXRhLXR5cGU9XCIkeyBkYXRhLm5hbWUgfVwiPlxuXHRcdFx0XHQkeyBpbm5lclRlbXBsYXRlIH1cblx0XHRcdDwvcD5cblx0XHRgO1xuXG5cdFx0aWYoaW5mcmFzdHJ1Y3R1cmVNZW51SXRlbXMubGVuZ3RoID4gMCl7XG5cdFx0XHRmb3IgKHZhciBpID0gaW5mcmFzdHJ1Y3R1cmVNZW51SXRlbXMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcblx0XHRcdFx0dmFyIGluZnJhc3RydWN0dXJlTWVudUl0ZW0gPSBpbmZyYXN0cnVjdHVyZU1lbnVJdGVtc1tpXTtcblx0XHRcdFx0aWYoaW5mcmFzdHJ1Y3R1cmVNZW51SXRlbS5hdHRyaWJ1dGVzW1wiZGF0YS10eXBlXCJdLnZhbHVlID09PSBkYXRhLm5hbWUpe1xuXHRcdFx0XHRcdHJlcGxhY2VJbmZyYXN0cnVjdHVyZSA9IHRydWU7XG5cdFx0XHRcdFx0aW5mcmFzdHJ1Y3R1cmVNZW51SXRlbS5pbm5lckhUTUwgPSBpbm5lclRlbXBsYXRlO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdH1cblxuXHRcdGlmKCFyZXBsYWNlSW5mcmFzdHJ1Y3R1cmUpe1xuXHRcdFx0aW5mcmFzdHJ1Y3R1cmVWaWV3V3JhcHBlci5pbm5lckhUTUwgKz0gdGVtcGxhdGU7XG5cdFx0fVxuXHRcblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIE5hcnJhdGl2ZVZpZXcge1xuXG5cdGNvbnN0cnVjdG9yKCl7XG5cdFx0dGhpcy5fc2NlbmU7XG5cdH1cblxuXHRnZXQgc2NlbmUoKXtcblx0XHRyZXR1cm4gdGhpcy5fc2NlbmVcblx0fVxuXG5cdHNldCBzY2VuZShzY2VuZSl7XG5cdFx0dGhpcy5fc2NlbmUgPSBzY2VuZTtcblx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm5hcnJhdGl2ZVwiKS5pbm5lckhUTUwgKz0gYDxkaXYgaWQ9XCIke3NjZW5lfVwiPjwvZGl2PmA7XG5cdH1cblxuXHRyZW5kZXIoZGF0YSl7XG5cblx0XHR2YXIgdGVtcGxhdGUgPSBgIFxuXHRcdFx0PHAgY2xhc3M9XCJvdXRwdXRcIj5cblx0XHRcdFx0JHsgZGF0YS5jaGFyYWN0ZXIubmFtZSB9OiAkeyBkYXRhLnV0dGVyYW5jZSB9XG5cdFx0XHQ8L3A+XG5cdFx0YDtcblxuXHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuc2NlbmUpLmlubmVySFRNTCArPSB0ZW1wbGF0ZTtcblx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm5hcnJhdGl2ZVwiKS5zY3JvbGxUb3AgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm5hcnJhdGl2ZVwiKS5zY3JvbGxIZWlnaHRcblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlc291cmNlVmlldyB7XG5cblx0cmVuZGVyKGRhdGEpe1xuXG5cdFx0dmFyIHJlc291cmNlVmlld1dyYXBwZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJlc291cmNlc1wiKTtcblx0XHR2YXIgcmVzb3VyY2VNZW51SXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnJlc291cmNlXCIpO1xuXHRcdHZhciByZXBsYWNlUmVzb3VyY2UgPSBmYWxzZTtcblx0XHR2YXIgaW5uZXJUZW1wbGF0ZSA9IGAkeyBkYXRhLm5hbWUgfTogJHsgZGF0YS5sZXZlbCB9YDtcblxuXHRcdHZhciB0ZW1wbGF0ZSA9IGAgXG5cdFx0XHQ8cCBjbGFzcz1cInJlc291cmNlXCIgZGF0YS10eXBlPVwiJHsgZGF0YS5uYW1lIH1cIj5cblx0XHRcdFx0JHsgaW5uZXJUZW1wbGF0ZSB9XG5cdFx0XHQ8L3A+XG5cdFx0YDtcblxuXHRcdGlmKHJlc291cmNlTWVudUl0ZW1zLmxlbmd0aCA+IDApe1xuXHRcdFx0Zm9yICh2YXIgaSA9IHJlc291cmNlTWVudUl0ZW1zLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG5cdFx0XHRcdHZhciByZXNvdXJjZU1lbnVJdGVtID0gcmVzb3VyY2VNZW51SXRlbXNbaV07XG5cdFx0XHRcdGlmKHJlc291cmNlTWVudUl0ZW0uYXR0cmlidXRlc1tcImRhdGEtdHlwZVwiXS52YWx1ZSA9PT0gZGF0YS5uYW1lKXtcblx0XHRcdFx0XHRyZXBsYWNlUmVzb3VyY2UgPSB0cnVlO1xuXHRcdFx0XHRcdHJlc291cmNlTWVudUl0ZW0uaW5uZXJIVE1MID0gaW5uZXJUZW1wbGF0ZTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHR9XG5cblx0XHRpZighcmVwbGFjZVJlc291cmNlKXtcblx0XHRcdHJlc291cmNlVmlld1dyYXBwZXIuaW5uZXJIVE1MICs9IHRlbXBsYXRlO1xuXHRcdH1cblx0XG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBVSVZpZXcge1xuXG5cdGNvbnN0cnVjdG9yKG9wdGlvbnMpe1xuXHRcdHRoaXMuX3NlY3Rpb24gPSBvcHRpb25zLnNlY3Rpb247XG5cdFx0dGhpcy5fc2VsZXRvciA9IG9wdGlvbnMuc2VsZWN0b3I7XG5cdFx0dGhpcy5zdGF0ZSA9IG9wdGlvbnMuc3RhdGUgfHwgZmFsc2U7XG5cdH1cblxuXHRnZXQgc2VsZXRvcigpe1xuXHRcdHJldHVybiB0aGlzLl9zZWxldG9yO1xuXHR9XG5cblx0Z2V0IHNlY3Rpb24oKXtcblx0XHRyZXR1cm4gdGhpcy5fc2VjdGlvbjtcblx0fVxuXG5cdGdldCBzdGF0ZSgpe1xuXHRcdHJldHVybiB0aGlzLl9zdGF0ZTtcblx0fVxuXG5cdHNldCBzdGF0ZShzdGF0ZSl7XG5cdFx0dGhpcy5fc3RhdGUgPSBzdGF0ZTtcblx0XHR2YXIgZG9tTm9kZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHRoaXMuc2VsZXRvcik7XG5cdFx0XG5cdFx0aWYodGhpcy5fc3RhdGUpe1xuXHRcdFx0XG5cdFx0XHRmb3IgKHZhciBpID0gZG9tTm9kZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcblx0XHRcdFx0ZG9tTm9kZXNbaV0uY2xhc3NMaXN0LmFkZCgnc2hvdycpO1xuXHRcdFx0fTtcblxuXHRcdH1lbHNle1xuXG5cdFx0XHRmb3IgKHZhciBpID0gZG9tTm9kZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcblx0XHRcdFx0ZG9tTm9kZXNbaV0uY2xhc3NMaXN0LnJlbW92ZSgnc2hvdycpO1xuXHRcdFx0fTtcblxuXHRcdH1cblx0fVxuXG5cdHJlbmRlcihkYXRhKXtcblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxuXG5cdHRvZ2dsZSh2aXN1YWwpe1xuXG5cdH1cbn0iLCJsZXQgY29uZmlnID0ge1xuXG5cdC8vIFRoZXNlIGFyZSBwcml2YXRlIHByb3BlcnRpZXMgdGhhdCBcblx0Ly8gYmluZCB0byB1aSBlbGVtZW50c1xuXHRfdWk6IFtcblx0XHR7c2VjdGlvbjogXCJtZW51XCIsIHN0YXRlOiBmYWxzZSwgc2VsZWN0b3I6IFwiI21lbnVcIn0sXG5cdF0sXG5cblx0c3BlZWQ6IDEwMCxcblxuXHRwZXJzcGVjdGl2ZTogXCJNZVwiLFxuXG5cdHJlc291cmNlczogW1xuXHRcdHtuYW1lOiBcIktpbGxvd2F0dHNcIiwgaW5pdGlhbDogMTB9LCBcblx0XHR7bmFtZTogXCJPeHlnZW5cIixcdCBpbml0aWFsOiAxMH0sXG5cdFx0e25hbWU6IFwiRHJvbmVcIixcdFx0IGluaXRpYWw6IDF9LFxuXHRcdHtuYW1lOiBcIldhdGVyXCIsXHRcdCBpbml0aWFsOiAxMH0sXG5cdF0sXG5cblx0aW5mcmFzdHJ1Y3R1cmU6IFtcblx0XHR7bmFtZTogXCJCcmlkZ2VcIiwgXHRcdHN0YXR1czogdHJ1ZX0sIFxuXHRcdHtuYW1lOiBcIkVuZ2luZWVyaW5nXCIsIFx0c3RhdHVzOiB0cnVlfSxcblx0XHR7bmFtZTogXCJNZWQgQmF5XCIsIFx0XHRzdGF0dXM6IGZhbHNlfSxcblx0XHR7bmFtZTogXCJTY2llbmNlIExhYlwiLCBcdHN0YXR1czogZmFsc2V9LFxuXHRdLFxuXG5cdGNoYXJhY3RlcnM6IFtcIkNFQlNcIl0sXG5cblx0ZW5kR2FtZTogW1xuXHRcdHtpbmZyYXN0cnVjdHVyZTogXCJCcmlkZ2VcIixcdHZhbHVlOiBmYWxzZX0sXG5cdFx0e3Jlc291cmNlczogXCJLaWxsb3dhdHRzXCIsXHR2YWx1ZTogMH0sXG5cdF0sXG59O1xuXG5cbmV4cG9ydCBkZWZhdWx0IGNvbmZpZzsiLCJsZXQgc2NlbmUgPSBbXG5cdFwiQ0VCUzogT2sgZW5naW5lZXJpbmcgaXMgc2VhbGVkLiBMZXRzIHNlZSBpZiBJIGNhbiBnZXQgdGhlIHNoaXBzIHN0YXR1cyBvbnNjcmVlbi5cIixcblx0XCJBcmUgdGhlIG8yIGxldmVscyBzdGFibGU/XCIsXG5cdDYsXG5cdFwiSGVsbG8/IENFQlM/XCIsXG5cdDUsXG5cdFwiRGFtbiBpdCwgSSBqdXN0IGNhbid0IHNlZSBhIGJsb29keSB0aGluZyEgTWF5YmUgSSdsbCB0cnkgbW92ZSBteSBhcm1zLlwiLFxuXHQ1LFxuXHR7XG5cdFx0aXM6IFwidWlcIixcblx0XHRlZmZlY3Q6IFwiRW5hYmxlIG1lbnVcIlxuXHR9LFxuXHQ1LFxuXHR7XG5cdFx0aXM6IFwidWlcIixcblx0XHRlZmZlY3Q6IFwiRGlzYWJsZSBtZW51XCJcblx0fSxcblx0NSxcblx0XCJDRUJTOiBIZXksIGNhbG0gZG93bi4gSSB3YXMgdHJ5aW5nIHRvIGdldCB0aGUgZGlzcGxheSB1cC4gQ2FuIHlvdSBzZWUgaXQ/XCIsXG5cdDcsXG5cdFwiWWVoLCBzb21ldGhpbmcgZmxhc2hlZCBpbiBteSB2aXNpb24gYW5kIHRoZW4gd2VudCBhZ2Fpbi5cIixcblx0NSxcblx0XCJDRUJTOiBPaywgbGV0IG1lIHRyeSBzb21ldGhpbmcgZGlmZmVyZW50XCIsXG5cdFwiV2FpdCwgZG9uJ3QgZ28uIENFQlM/IVwiLFxuXHQxLFxuXHRcIkNFQlM6IDEgc2VjLi4uIEkgdGhpbmsgSSd2ZSBnb3QgaXQuXCIsXG5cdDMsXG5cdHtcblx0XHRpczogXCJ1aVwiLFxuXHRcdGVmZmVjdDogXCJFbmFibGUgbWVudVwiXG5cdH0sXG5cdDUsXG5dXG5cbm1vZHVsZS5leHBvcnRzID0gc2NlbmU7IiwibGV0IHNjZW5lID0gW1xuXHRcIkNFQlM6IEhlbGxvLi4uXCIsIFxuXHQzLFxuXHRcIkNFQlM6IEdsYWQgdG8gc2VlIHlvdSdyZSBmaW5hbGx5IGF3YWtlXCIsXG5cdDUsXG5cdFwiV2hhdHMgZ29pbmcgb24/IEkgY2FuJ3Qgc2VlIGFueXRoaW5nIVwiLFxuXHQzLFxuXHRcIkkgY2FuJ3QgbW92ZSEgSGVscCBtZSFcIixcblx0Mixcblx0XCJDRUJTOiBEb24ndCB3b3JyeSB0aGUgcmVzY3VlIHBhcnR5IHdpbGwgYmUgaGVyZSBzb29uLCBhIGJlYWNvbiB3ZW50IHVwIGEgZmV3IGhvdXJzIGFnby4gUmlnaHQgbm93IHdlJ3ZlIGdvdCBiaWdnZXIgcHJvYmxlbXMuIFRoZSBzaGlwcyBnb3Qgc2V2ZXJhbCBodWxsIGJyZWFjaGVzIGFuZCB3ZSBuZWVkIHRvIGZvY3VzIHdoYXQgbGl0dGxlIGVuZXJneSB3ZSBoYXZlLlwiLFxuXHQyLFxuXHRcIkNFQlM6IExpZmUgc3VwcG9ydCBzeXN0ZW1zIGFyZSBiYWNrIG9ubGluZSBidXQgd2UncmUgcnVubmluZyBvbiByZXNlcnZlIHBvd2VyLiBUaGVyZSdhIGFuIE8yIGxlYWsgaW4gZW5naW5lZXJpbmcgdG9vLlwiLFxuXHQyLFxuXHRcIkNFQlM6IFdoYXQgZG8geW91IHdhbnQgdG8gZG8/XCIsXG5cdHtcblx0XHRpczogXCJkZWNpc2lvblwiLFxuXHRcdGNob2ljZXM6IFtcblx0XHRcdHtcblx0XHRcdFx0dGV4dDogXCJTZWFsIGVuZ2luZWVyaW5nXCIsXG5cdFx0XHRcdGVmZmVjdHM6IHtcblx0XHRcdFx0XHRyZXNvdXJjZTogXCItNSBLaWxsb3dhdHRzXCIsXG5cdFx0XHRcdFx0aW5mcmFzdHJ1Y3R1cmU6IFwiRGlzYWJsZSBFbmdpbmVlcmluZ1wiXG5cdFx0XHRcdH0sXG5cdFx0XHRcdGdvdG86IFwiZmluZC1kcm9uZVwiLFxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0dGV4dDogXCJGaXggdGhlIGJhY2t1cCBnZW5lcmF0b3JcIixcblx0XHRcdFx0ZWZmZWN0czoge1xuXHRcdFx0XHRcdHJlc291cmNlOiBcIi03IEtpbGxvd2F0dHNcIlxuXHRcdFx0XHR9LFxuXHRcdFx0XHRnb3RvOiBcIm8yLWxlYWtpbmdcIixcblx0XHRcdH1cblx0XHRdXG5cdH1cbl1cblxubW9kdWxlLmV4cG9ydHMgPSBzY2VuZTsiXX0=
