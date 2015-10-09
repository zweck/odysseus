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
						break;
					case "number":
						// if the array element is an integer, pass the int and the array index to the wait method
						this.wait(utterance, i);
					case "object":

						if (utterance.is === "decision") {
							this.decide(utterance);
						} else if (utterance.is === "ui") {
							this.ui(utterance);
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

			// increment the progress
			this.incrementProgress();

			// repeat
			this.go();
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

var scene = ["CEBS: Ok engineering is sealed. Lets see if I can get the ships status onscreen.", 3, "Are the o2 levels stable?", 6, "Hello? CEBS?", 5, "Damn it, I just can't see a bloody thing! Maybe I'll try move my arms.", 5, {
	is: "ui",
	effect: "Enable menu"
}, 5, "CEBS: Hey, calm down. I was trying to get the display up. Can you see it?", 7];

module.exports = scene;

},{}],14:[function(require,module,exports){
"use strict";

var scene = ["CEBS: Hello...", 3, "CEBS: Glad to see you're finally awake", 5, "Whats going on? I can't see anything!", 3, "I can't move! Help me!", 2, "CEBS: Don't worry the rescue party will be here soon, a beacon went up a few hours ago. Right now we've got bigger problems. The ships got several hull breaches and we need to focus what little energy we have.", 3, "CEBS: Life support systems are back online but we're running on reserve power. There'a an O2 leak in engineering too.", 2, "CEBS: What do you want to do?", {
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvaG9tZS9waGF1c2VyL0RldmVsb3BtZW50L29keXNzZXVzL3NyYy9hcHAuanMiLCIvaG9tZS9waGF1c2VyL0RldmVsb3BtZW50L29keXNzZXVzL3NyYy9saWIvQ2hhcmFjdGVyLmpzIiwiL2hvbWUvcGhhdXNlci9EZXZlbG9wbWVudC9vZHlzc2V1cy9zcmMvbGliL0RlY2lzaW9uLmpzIiwiL2hvbWUvcGhhdXNlci9EZXZlbG9wbWVudC9vZHlzc2V1cy9zcmMvbGliL0luZnJhc3RydWN0dXJlLmpzIiwiL2hvbWUvcGhhdXNlci9EZXZlbG9wbWVudC9vZHlzc2V1cy9zcmMvbGliL05hcnJhdGl2ZS5qcyIsIi9ob21lL3BoYXVzZXIvRGV2ZWxvcG1lbnQvb2R5c3NldXMvc3JjL2xpYi9SZXNvdXJjZXMuanMiLCIvaG9tZS9waGF1c2VyL0RldmVsb3BtZW50L29keXNzZXVzL3NyYy9saWIvVmlld3MvRGVjaXNpb25WaWV3LmpzIiwiL2hvbWUvcGhhdXNlci9EZXZlbG9wbWVudC9vZHlzc2V1cy9zcmMvbGliL1ZpZXdzL0luZnJhc3RydWN0dXJlVmlldy5qcyIsIi9ob21lL3BoYXVzZXIvRGV2ZWxvcG1lbnQvb2R5c3NldXMvc3JjL2xpYi9WaWV3cy9OYXJyYXRpdmVWaWV3LmpzIiwiL2hvbWUvcGhhdXNlci9EZXZlbG9wbWVudC9vZHlzc2V1cy9zcmMvbGliL1ZpZXdzL1Jlc291cmNlVmlldy5qcyIsIi9ob21lL3BoYXVzZXIvRGV2ZWxvcG1lbnQvb2R5c3NldXMvc3JjL2xpYi9WaWV3cy9VSVZpZXcuanMiLCIvaG9tZS9waGF1c2VyL0RldmVsb3BtZW50L29keXNzZXVzL3NyYy9vZGVzc2V1c2ZpbGUuanMiLCIvaG9tZS9waGF1c2VyL0RldmVsb3BtZW50L29keXNzZXVzL3NyYy9zY2VuZXMvZmluZC1kcm9uZS5qcyIsIi9ob21lL3BoYXVzZXIv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Q0FBQyxFQUNELDJCQUEyQixFQUMzQixDQUFDLEVBQ0QsY0FBYyxFQUNkLENBQUMsRUFDRCx3RUFBd0UsRUFDeEUsQ0FBQyxFQUNEO0FBQ0MsR0FBRSxFQUFFLElBQUk7QUFDUixPQUFNLEVBQUUsYUFBYTtDQUNyQixFQUNELENBQUMsRUFDRCwyRUFBMkUsRUFDM0UsQ0FBQyxDQUNELENBQUE7O0FBRUQsTUFBTSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7Ozs7O0FDbEJ2QixJQUFJLEtBQUssR0FBRyxDQUNYLGdCQUFnQixFQUNoQixDQUFDLEVBQ0Qsd0NBQXdDLEVBQ3hDLENBQUMsRUFDRCx1Q0FBdUMsRUFDdkMsQ0FBQyxFQUNELHdCQUF3QixFQUN4QixDQUFDLEVBQ0QsbU5BQW1OLEVBQ25OLENBQUMsRUFDRCx1SEFBdUgsRUFDdkgsQ0FBQyxFQUNELCtCQUErQixFQUMvQjtBQUNDLEdBQUUsRUFBRSxVQUFVO0FBQ2QsUUFBTyxFQUFFLENBQ1I7QUFDQyxNQUFJLEVBQUUsa0JBQWtCO0FBQ3hCLFNBQU8sRUFBRTtBQUNSLFdBQVEsRUFBRSxlQUFlO0FBQ3pCLGlCQUFjLEVBQUUscUJBQXFCO0dBQ3JDO0FBQ0QsTUFBSSxFQUFFLFlBQVk7RUFDbEIsRUFDRDtBQUNDLE1BQUksRUFBRSwwQkFBMEI7QUFDaEMsU0FBTyxFQUFFO0FBQ1IsV0FBUSxFQUFFLGVBQWU7R0FDekI7QUFDRCxNQUFJLEVBQUUsWUFBWTtFQUNsQixDQUNEO0NBQ0QsQ0FDRCxDQUFBOztBQUVELE1BQU0sQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8vIGdyYWIgdGhlIGNvbmZpZ1xuaW1wb3J0IGNvbmZpZyBmcm9tICcuL29kZXNzZXVzZmlsZSc7XG5cbi8vIGltcG9ydCB0aGUgZ2FtZSBjbGFzc2VzXG5pbXBvcnQgQ2hhcmFjdGVyIGZyb20gXCIuL2xpYi9DaGFyYWN0ZXJcIjtcbmltcG9ydCBOYXJyYXRpdmUgZnJvbSBcIi4vbGliL05hcnJhdGl2ZVwiO1xuaW1wb3J0IFJlc291cmNlcyBmcm9tIFwiLi9saWIvUmVzb3VyY2VzXCI7XG5pbXBvcnQgSW5mcmFzdHJ1Y3R1cmUgZnJvbSBcIi4vbGliL0luZnJhc3RydWN0dXJlXCI7XG5cbi8vIGltcG9ydCB0aGUgVmlzdWFscyBWaWV3IGNsYXNzIHRvIGluaXRpYWxpemUgc29tZSBvZiB0aGUgdWkgcHJvcGVydGllc1xuaW1wb3J0IFVJVmlldyBmcm9tIFwiLi9saWIvVmlld3MvVUlWaWV3XCI7XG5cbi8vIGltcG9ydCB0aGUgc2NlbmVzXG52YXIgaW50cm8gPSByZXF1aXJlKFwiLi9zY2VuZXMvaW50cm9cIik7XG5cbi8vIGluaXRpYWxpc2UgdGhlIGdhbWUgcmVzb3VyY2VzXG5sZXQgY2hhcmFjdGVycyA9IGNvbmZpZy5jaGFyYWN0ZXJzLm1hcChmdW5jdGlvbiAoY2hhcmFjdGVyKSB7XG5cdHJldHVybiBuZXcgQ2hhcmFjdGVyKGNoYXJhY3Rlcik7XG59KTtcblxubGV0IHJlc291cmNlcyA9IGNvbmZpZy5yZXNvdXJjZXMubWFwKGZ1bmN0aW9uKHJlc291cmNlKXtcblx0cmV0dXJuIG5ldyBSZXNvdXJjZXMocmVzb3VyY2UpO1xufSk7XG5cbmxldCBpbmZyYXN0cnVjdHVyZSA9IGNvbmZpZy5pbmZyYXN0cnVjdHVyZS5tYXAoZnVuY3Rpb24oaW5mcmFzdHJ1Y3R1cmUpe1xuXHRyZXR1cm4gbmV3IEluZnJhc3RydWN0dXJlKGluZnJhc3RydWN0dXJlKTtcbn0pO1xuXG5sZXQgdWkgPSBjb25maWcuX3VpLm1hcChmdW5jdGlvbih1aSl7XG5cdHJldHVybiBuZXcgVUlWaWV3KHVpKTtcbn0pO1xuXG5cbi8vIGxvYWQgdGhlIG5hcnJhdGl2ZVxubGV0IG5hcnJhdGl2ZSA9IG5ldyBOYXJyYXRpdmUoe1xuXHRzcGVlZDogY29uZmlnLnNwZWVkLFxuXHRwZXJzcGVjdGl2ZTogY29uZmlnLnBlcnNwZWN0aXZlLFxuXHRyZXNvdXJjZXM6IHJlc291cmNlcyxcblx0Y2hhcmFjdGVyczogY2hhcmFjdGVycyxcblx0aW5mcmFzdHJ1Y3R1cmU6IGluZnJhc3RydWN0dXJlLFxuXHR1aTogdWksXG59KTtcblxuLy8gZW50cnkgcG9pbnRcbm5hcnJhdGl2ZS5ydW4oaW50cm8sIFwiaW50cm9cIik7IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2hhcmFjdGVyIHtcblx0Y29uc3RydWN0b3IobmFtZSl7XG5cdFx0dGhpcy5uYW1lID0gbmFtZTtcblx0fVxuXG5cdHNheSgpe1xuXHRcdFxuXHR9XG59IiwiaW1wb3J0IERlY2lzaW9uVmlldyBmcm9tICcuL1ZpZXdzL0RlY2lzaW9uVmlldyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERlY2lzaW9uIHtcblx0Y29uc3RydWN0b3Iob3B0aW9ucyl7XG5cdFx0dGhpcy5fY2hvaWNlcyA9IG9wdGlvbnMuY2hvaWNlcztcblx0XHR0aGlzLl9yZXNvdXJjZXMgPSBvcHRpb25zLnJlc291cmNlcztcblx0XHR0aGlzLl9pbmZyYXN0cnVjdHVyZSA9IG9wdGlvbnMuaW5mcmFzdHJ1Y3R1cmU7XG5cdFx0dGhpcy5fZGVjaXNpb25WaWV3ID0gbmV3IERlY2lzaW9uVmlldyh0aGlzKTtcblx0XHR0aGlzLl9uYXJyYXRpdmUgPSBvcHRpb25zLm5hcnJhdGl2ZTtcblxuXHRcdHRoaXMuaW5pdCgpO1xuXHR9XG5cblx0aW5pdCgpe1xuXHRcdHRoaXMuX2RlY2lzaW9uVmlldy5yZW5kZXIodGhpcy5fY2hvaWNlcyk7XG5cdH1cblxuXHRnZXQgZGVjaXNpb25FdmVudCgpe1xuXHRcdHJldHVybiB0aGlzLl9kZWNpc2lvbkV2ZW50O1xuXHR9XG5cblx0c2V0IGRlY2lzaW9uRXZlbnQoZXZ0KXtcblx0XHR0aGlzLl9kZWNpc2lvbkV2ZW50ID0gZXZ0O1xuXHRcdHRoaXMuY29uY2VxdWVuY2VzKCk7XG5cdH1cblxuXHRjb25jZXF1ZW5jZXMoKXtcblx0XHR2YXIgYXR0cmlidXRlcyA9IHRoaXMuZGVjaXNpb25FdmVudC5zcmNFbGVtZW50LmRhdGFzZXQ7XG5cdFx0XG5cdFx0Zm9yKHZhciBrIGluIGF0dHJpYnV0ZXMpIHtcblxuXHRcdFx0c3dpdGNoKGspIHtcblx0XHRcdFx0Y2FzZSBcInJlc291cmNlXCI6XG5cdFx0XHRcdFx0dmFyIHJlc291cmNlRWZmZWN0ID0gYXR0cmlidXRlc1trXS5zcGxpdChcIiBcIik7XG5cdFx0XHRcdFx0dmFyIGVmZmVjdCA9IHBhcnNlSW50KHJlc291cmNlRWZmZWN0WzBdKTtcblx0XHRcdFx0XHR2YXIgcmVzb3VyY2UgPSByZXNvdXJjZUVmZmVjdFsxXTtcblx0XHRcdFx0XHR0aGlzLl9yZXNvdXJjZXNbcmVzb3VyY2VdLmxldmVsID0gZWZmZWN0O1xuXHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSBcImluZnJhc3RydWN0dXJlXCI6XG5cdFx0XHRcdFx0dmFyIGluZnJhc3RydWN0dXJlRWZmZWN0ID0gYXR0cmlidXRlc1trXS5zcGxpdChcIiBcIik7XG5cdFx0XHRcdFx0dmFyIGVmZmVjdCA9IGluZnJhc3RydWN0dXJlRWZmZWN0WzBdLnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0XHRcdGlmKGVmZmVjdCA9PT0gXCJkaXNhYmxlXCIpe1xuXHRcdFx0XHRcdFx0ZWZmZWN0ID0gZmFsc2U7XG5cdFx0XHRcdFx0fWVsc2UgaWYoZWZmZWN0ID09PSBcImVuYWJsZVwiKXtcblx0XHRcdFx0XHRcdGVmZmVjdCA9IHRydWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHZhciBpbmZyYXN0cnVjdHVyZSA9IGluZnJhc3RydWN0dXJlRWZmZWN0WzFdO1xuXHRcdFx0XHRcdHRoaXMuX2luZnJhc3RydWN0dXJlW2luZnJhc3RydWN0dXJlXS5zdGF0dXMgPSBlZmZlY3Q7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdGNvbnNvbGUubG9nKGF0dHJpYnV0ZXNba10pO1xuXHRcdFx0fVxuXHRcdH07XG5cblx0XHR0aGlzLl9uYXJyYXRpdmUubW92ZVNjZW5lKGF0dHJpYnV0ZXNbXCJnb3RvXCJdKTtcblx0fVxufSIsImltcG9ydCBJbmZyYXN0cnVjdHVyZVZpZXcgZnJvbSAnLi9WaWV3cy9JbmZyYXN0cnVjdHVyZVZpZXcnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbmZyYXN0cnVjdHVyZSB7XG5cblx0Y29uc3RydWN0b3Iob3B0aW9ucyl7XG5cdFx0dGhpcy5uYW1lID0gb3B0aW9ucy5uYW1lO1xuXHRcdHRoaXMuX3N0YXR1cyA9IG9wdGlvbnMuc3RhdHVzO1xuXG5cdFx0dGhpcy5faW5mcmFzdHJ1Y3R1cmVWaWV3ID0gbmV3IEluZnJhc3RydWN0dXJlVmlldygpO1xuXHRcdHRoaXMuX2luZnJhc3RydWN0dXJlVmlldy5yZW5kZXIoIHtuYW1lOiB0aGlzLm5hbWUsIHN0YXR1czogdGhpcy5zdGF0dXN9ICk7XG5cdH1cblxuXHRnZXQgc3RhdHVzKCl7XG5cdFx0cmV0dXJuIHRoaXMuX3N0YXR1cztcblx0fVxuXG5cdHNldCBzdGF0dXMoc3RhdHVzKXtcblx0XHR0aGlzLl9zdGF0dXMgPSBzdGF0dXM7XG5cdFx0dGhpcy5faW5mcmFzdHJ1Y3R1cmVWaWV3LnJlbmRlcigge25hbWU6IHRoaXMubmFtZSwgc3RhdHVzOiB0aGlzLnN0YXR1c30gKTtcblx0fVxufSIsImltcG9ydCBOYXJyYXRpdmVWaWV3IGZyb20gJy4vVmlld3MvTmFycmF0aXZlVmlldyc7XG5pbXBvcnQgVUlWaWV3IGZyb20gJy4vVmlld3MvVUlWaWV3JztcbmltcG9ydCBEZWNpc2lvbiBmcm9tICcuL0RlY2lzaW9uJztcblxuLy8gbWFwIHRoZSBzY2VuZXMgZm9yIHJlcXVpcmUsIHRoaXMgY3VycmVudGx5IG5lZWRzIHRvIFxuLy8gYmUgZG9uZSBtYW51YWxseSB1bnRpbCBJIGZpbmQgYSB3YXkgb2YgZHluYW1pY2FsbHkgbG9hZGluZyBtb2R1bGVzXG5sZXQgRmluZERyb25lU2NlbmUgPSByZXF1aXJlKCcuLi9zY2VuZXMvZmluZC1kcm9uZScpO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOYXJyYXRpdmUge1xuXHRjb25zdHJ1Y3RvcihvcHRpb25zKXtcblxuXHRcdHRoaXMuX25hcnJhdGl2ZVZpZXcgPSBuZXcgTmFycmF0aXZlVmlldygpO1xuXG5cdFx0Ly8gc2V0dXAgc29tZSBwdWJsaWMgcHJvcGVydGllc1xuXHRcdHRoaXMuX3NwZWVkID0gb3B0aW9ucy5zcGVlZCB8fCAxO1xuXHRcdHRoaXMuX3BlcnNwZWN0aXZlID0gb3B0aW9ucy5wZXJzcGVjdGl2ZTtcblx0XHR0aGlzLl9wcm9ncmVzcyA9IDA7XG5cdFx0dGhpcy5fY2hhcmFjdGVycyA9IG9wdGlvbnMuY2hhcmFjdGVycztcblx0XHR0aGlzLl9yZXNvdXJjZXMgPSBvcHRpb25zLnJlc291cmNlcztcblx0XHR0aGlzLl9pbmZyYXN0cnVjdHVyZSA9IG9wdGlvbnMuaW5mcmFzdHJ1Y3R1cmU7XG5cdFx0dGhpcy5fdWkgPSBvcHRpb25zLnVpO1xuXG5cdFx0Ly8gY3JlYXRlIGFuIG9iamVjdCBvZiBjaGFyYWN0ZXJzIG1hcHBpbmcgbmFtZXMgYWdhaW5zdCB0aGVpciBcblx0XHQvLyBjaGFyYWN0ZXIgY2xhc3MgaW5zdGFuY2Vcblx0XHR0aGlzLl9jaGFyYWN0ZXJzQnlOYW1lID0ge307XG5cdFx0dGhpcy5fY2hhcmFjdGVycy5mb3JFYWNoKChjaGFyYWN0ZXIpID0+IHtcblx0XHRcdHRoaXMuX2NoYXJhY3RlcnNCeU5hbWVbY2hhcmFjdGVyLm5hbWVdID0gY2hhcmFjdGVyO1xuXHRcdH0pO1xuXG5cdFx0Ly8gY3JlYXRlIGFuIG9iamVjdCBvZiByZXNvdXJjZXMgbWFwcGluZyBuYW1lcyBhZ2FpbnN0IHRoZWlyIFxuXHRcdC8vIHJlc291cmNlIGNsYXNzIGluc3RhbmNlXG5cdFx0dGhpcy5fcmVzb3VyY2VzQnlOYW1lID0ge307XG5cdFx0dGhpcy5fcmVzb3VyY2VzLmZvckVhY2goKHJlc291cmNlKSA9PiB7XG5cdFx0XHR0aGlzLl9yZXNvdXJjZXNCeU5hbWVbcmVzb3VyY2UubmFtZV0gPSByZXNvdXJjZTtcblx0XHR9KTtcdFx0XG5cblxuXHRcdC8vIGNyZWF0ZSBhbiBvYmplY3Qgb2YgaW5mcmFzdHJ1Y3R1cmUgbWFwcGluZyBuYW1lcyBhZ2FpbnN0IHRoZWlyIFxuXHRcdC8vIHJlc291cmNlIGNsYXNzIGluc3RhbmNlXG5cdFx0dGhpcy5faW5mcmFzdHJ1Y3R1cmVCeU5hbWUgPSB7fTtcblx0XHR0aGlzLl9pbmZyYXN0cnVjdHVyZS5mb3JFYWNoKChpbmZyYXN0cnVjdHVyZSkgPT4ge1xuXHRcdFx0dGhpcy5faW5mcmFzdHJ1Y3R1cmVCeU5hbWVbaW5mcmFzdHJ1Y3R1cmUubmFtZV0gPSBpbmZyYXN0cnVjdHVyZTtcblx0XHR9KTtcdFxuXG5cblx0XHQvLyBjcmVhdGUgYW4gb2JqZWN0IG9mIHVpdmlldyBtYXBwaW5nIHNlY3Rpb25zIGFnYWluc3QgdGhlaXIgXG5cdFx0Ly8gcmVzb3VyY2UgY2xhc3MgaW5zdGFuY2Vcblx0XHR0aGlzLl91aUJ5U2VjdGlvbiA9IHt9O1xuXHRcdHRoaXMuX3VpLmZvckVhY2goKHVpKSA9PiB7XG5cdFx0XHR0aGlzLl91aUJ5U2VjdGlvblt1aS5zZWN0aW9uXSA9IHVpO1xuXHRcdH0pO1x0XG5cdH1cblxuXHRzZXQgbmFycmF0aXZlKHNjZW5lKXtcblx0XHR0aGlzLl9uYXJyYXRpdmUgPSBzY2VuZTtcblx0fVxuXG5cdGdldCBuYXJyYXRpdmUoKXtcblx0XHRyZXR1cm4gdGhpcy5fbmFycmF0aXZlO1xuXHR9XG5cblx0LyoqXG5cdCAqIFRoaXMgbWV0aG9kIGlzIHRoZSBpbml0aWFsaXNlciBmb3IgdGhlIG5hcnJhdGl2ZSBjbGFzc1xuXHQgKiBAcGFyYW0gIHtBcnJheTxTdHJpbmc+fSBuYXJyYXRpdmUgVGhpcyBtZXRob2QgdGFrZXMgYSBzY2VuZSBhbmQgcnVucyB0aHJvdWdoIGl0XG5cdCAqL1xuXHRydW4oc2NlbmUsIHNjZW5lTmFtZSl7XG5cdFx0dGhpcy5fbmFycmF0aXZlVmlldy5zY2VuZSA9IHNjZW5lTmFtZTtcblx0XHR0aGlzLm5hcnJhdGl2ZSA9IHNjZW5lO1xuXHRcdHRoaXMuZ28oKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBUaGlzIGlzIGEgc2NlbmUgcHJvZ3Jlc3MgY291bnQgdXNlZCBpbiB0aGUgYGdvKClgIG1ldGhvZFxuXHQgKiBAcGFyYW0gIHtpbnRlZ2VyfSBpbmNBbW91bnQgVGhpcyBpcyB0aGUgYW1vdW50IHRvIHByb2dyZXNzIHRoZSBuYXJyYXRpdmUsIGRlZmF1bHQgaXMgMVxuXHQgKi9cblx0aW5jcmVtZW50UHJvZ3Jlc3MoaW5jQW1vdW50PTEpe1xuXHRcdHZhciBpbmNBbW91bnQgPSBpbmNBbW91bnQ7XG5cdFx0dGhpcy5fcHJvZ3Jlc3MgPSB0aGlzLl9wcm9ncmVzcyArIGluY0Ftb3VudDtcblx0fVxuXG5cdC8qKlxuXHQgKiBUaGlzIG1ldGhvZCBwYXJzZXMgb3V0IHRoZSBjaGFyYWN0ZXIgYXQgdGhlIHN0YXJ0IG9mIHRoZSB1dHRlcmFuY2UgYW5kIGNoZWNrcyB0aGF0IHRoZXkgZXhpc3QgaW4gdGhlIGNoYXJhY3RlciBjbGFzc1xuXHQgKiBAcGFyYW0gIHtzdHJpbmd9IG5hcnJhdGl2ZSBUaGUgdXR0ZXJhbmNlIGZyb20gdGhlIHNjZW5lIGFycmF5XG5cdCAqIEByZXR1cm4ge3N0cmluZ30gY2hhcmFjdGVyIFRoZSBjaGFyYWN0ZXIgbmFtZSBmcm9tIHRoZSB1dHRlcmFuY2Vcblx0ICovXG5cdGdldENoYXJhY3RlcnNGb3JOYXJyYXRpdmUobmFycmF0aXZlKXtcblx0XHR2YXIgbmFtZSA9IG5hcnJhdGl2ZS5zcGxpdChcIjpcIilbMF0udHJpbSgpO1xuXHRcdHJldHVybiB0aGlzLl9jaGFyYWN0ZXJzQnlOYW1lW25hbWVdIHx8IGZhbHNlO1xuXHR9XG5cblx0LyoqXG5cdCAqIFRoaXMgbWV0aG9kIG9mZnNldHMgdGhlIHdhaXQgdGltZSBieSB0aGUgYW1vdW50IG9mIGNoYXJhY3RlcnMgaW4gdGhlIHV0dGVyYW5jZVxuXHQgKiBAcGFyYW0gIHtzdHJpbmd9IG5hcnJhdGl2ZSBUaGUgdXR0ZXJhbmNlIGZyb20gdGhlIHNjZW5lIGFycmF5XG5cdCAqIEByZXR1cm4ge251bWJlcn0gICAgICAgICAgIFRoZSBhbW91bnQgb2YgY2hhcmFjdGVycyAqIDEwMG1zXG5cdCAqL1xuXHR0ZXh0TGVuZ3RoT2Zmc2V0KG5hcnJhdGl2ZSl7XG5cdFx0cmV0dXJuIG5hcnJhdGl2ZS5sZW5ndGggKiAxMDA7XG5cdH1cblxuXG5cdHR5cGUodXR0ZXJhbmNlKXtcblx0XHR2YXIgdXR0ZXJhbmNlVHlwZSA9IHR5cGVvZiB1dHRlcmFuY2U7XG5cdFx0cmV0dXJuIHV0dGVyYW5jZVR5cGU7XG5cdH1cblxuXHRtb3ZlU2NlbmUoc2NlbmUpe1xuXHRcdHZhciBuZXh0U2NlbmUgPSByZXF1aXJlKFwiLi4vc2NlbmVzL1wiICsgc2NlbmUpO1xuXHRcdHRoaXMuX3Byb2dyZXNzID0gMDtcblx0XHR0aGlzLnJ1bihuZXh0U2NlbmUsIHNjZW5lKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBUaGlzIG1ldGhvZCBpcyB0aGUgbWFpbiBzY2VuZSBwYXJzZXIsIGl0IGl0ZXJhdGVzIHRocm91Z2ggdGhlIHNjZW5lIGFuZCBvdXRwdXRzIHRoZSBuYXJyYXRpdmUgaW50byB0aGUgTmFycmF0aXZlVmlld1xuXHQgKi9cblx0Z28oKXtcblxuXHRcdC8vIGdyYWIgdGhlIGN1cnJlbnQgcHJvZ3Jlc3Ncblx0XHR2YXIgaSA9IHRoaXMuX3Byb2dyZXNzO1xuXG5cdFx0Ly8gZ2V0IHRoZSBzY2VuZSBuYXJyYXRpdmVcblx0XHR2YXIgbmFycmF0aXZlID0gdGhpcy5uYXJyYXRpdmU7XG5cblx0XHQvLyBpbml0aWFsaXNlIHNvbWUgdmFyc1xuXHRcdHZhciB1dHRlcmFuY2UsIHV0dGVyYW5jZVR5cGU7XG5cdFx0XG5cdFx0Ly8gaWYgd2UncmUgc3RpbGwgaW4gYSBuYXJyYXRpdmVcblx0XHRpZiggaSA8IG5hcnJhdGl2ZS5sZW5ndGggKXtcblxuXHRcdFx0dXR0ZXJhbmNlID0gbmFycmF0aXZlW2ldO1xuXG5cdFx0XHQvLyBnZXQgdGhlIGB0eXBlYCBvZiBvYmplY3QgaW4gdGhlIHNjZW5lIGFycmF5XG5cdFx0XHR1dHRlcmFuY2VUeXBlID0gdGhpcy50eXBlKHV0dGVyYW5jZSk7XG5cblx0XHRcdC8vIGRlY2lkZSB3aGljaCBtZXRob2QgdG8gcnVuIG9uIHRoZSBzY2VuZSB1dHRlcmFuY2Vcblx0XHRcdHN3aXRjaCh1dHRlcmFuY2VUeXBlKSB7XG5cdFx0XHRcdGNhc2UgXCJzdHJpbmdcIjpcblx0XHRcdFx0XHQvLyBpZiB0aGUgYXJyYXkgZWxlbWVudCBpcyBhIHN0cmluZyBwYXNzIGl0IHRvIHRoZSBzYXkgbWV0aG9kXG5cdFx0XHRcdFx0dGhpcy5zYXkodXR0ZXJhbmNlKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgXCJudW1iZXJcIjpcblx0XHRcdFx0XHQvLyBpZiB0aGUgYXJyYXkgZWxlbWVudCBpcyBhbiBpbnRlZ2VyLCBwYXNzIHRoZSBpbnQgYW5kIHRoZSBhcnJheSBpbmRleCB0byB0aGUgd2FpdCBtZXRob2Rcblx0XHRcdFx0XHR0aGlzLndhaXQodXR0ZXJhbmNlLCBpKTtcblx0XHRcdFx0Y2FzZSBcIm9iamVjdFwiOlxuXG5cdFx0XHRcdFx0aWYgKHV0dGVyYW5jZS5pcyA9PT0gXCJkZWNpc2lvblwiKSB7XG5cdFx0XHRcdFx0XHR0aGlzLmRlY2lkZSh1dHRlcmFuY2UpO1x0XHRcdFx0XHRcblx0XHRcdFx0XHR9ZWxzZSBpZiAodXR0ZXJhbmNlLmlzID09PSBcInVpXCIpIHtcblx0XHRcdFx0XHRcdHRoaXMudWkodXR0ZXJhbmNlKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0dGhpcy5zYXkodXR0ZXJhbmNlKTtcblx0XHRcdH1cblxuXHRcdH1cblxuXHR9XG5cblx0c2F5KHV0dGVyYW5jZSl7XG5cblx0XHR2YXIgY2hhcmFjdGVyO1xuXHRcdFxuXHRcdC8vIGdldCBhIHRoZSBjaGFyYWN0ZXIgZnJvbSB0aGUgZnJvbnQgb2YgdGhlIHNjZW5lIHRleHQgc3RyaW5nXG5cdFx0Y2hhcmFjdGVyID0gdGhpcy5nZXRDaGFyYWN0ZXJzRm9yTmFycmF0aXZlKHV0dGVyYW5jZSk7XG5cblx0XHQvLyBpZiB0aGUgY2hhcmFjdGVyIGluIHRoZSBuYXJyYXRpdmUgaXNuJ3QgaW4gdGhlIGNoYXJhY3RlcnMgc2V0dXBcblx0XHQvLyBhc3N1bWUgdGhhdCBpdHMgdGhlIHByb3RhZ2FuaXN0XG5cdFx0aWYoIWNoYXJhY3Rlcil7XG5cblx0XHRcdGNoYXJhY3RlciA9IHtuYW1lOiB0aGlzLl9wZXJzcGVjdGl2ZX07XG5cdFx0XHRcblx0XHR9ZWxzZXtcblxuXHRcdFx0Ly8gcmVtb3ZlIHRoZSBjaGFyYWN0ZXIgZnJvbSB0aGUgdGV4dCBzdHJpbmdcblx0XHRcdHV0dGVyYW5jZSA9IHV0dGVyYW5jZS5yZXBsYWNlKGNoYXJhY3Rlci5uYW1lICsgXCI6XCIsIFwiXCIpO1xuXHRcdH1cblxuXHRcdC8vIHBhc3MgdGhlIGNoYXJhY3RlciBhbmQgdGhlIHRleHQgdG8gdGhlIG5hcnJhdGl2ZSB2aWV3XG5cdFx0dGhpcy5fbmFycmF0aXZlVmlldy5yZW5kZXIoe3V0dGVyYW5jZTogdXR0ZXJhbmNlLCBjaGFyYWN0ZXI6IGNoYXJhY3Rlcn0pO1xuXG5cdFx0Ly8gaW5jcmVtZW50IHRoZSBwcm9ncmVzc1xuXHRcdHRoaXMuaW5jcmVtZW50UHJvZ3Jlc3MoKTtcblxuXHRcdC8vIHJlcGVhdFxuXHRcdHRoaXMuZ28oKTtcblx0fVxuXG5cdHVpKHVpKXtcblxuXHRcdHZhciB1aUVmZmVjdCA9IHVpLmVmZmVjdC5zcGxpdChcIiBcIik7XG5cdFx0dmFyIGVmZmVjdCA9IHVpRWZmZWN0WzBdLnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xuXHRcdFxuXHRcdGlmKGVmZmVjdCA9PT0gXCJkaXNhYmxlXCIpe1xuXHRcdFx0ZWZmZWN0ID0gZmFsc2U7XG5cdFx0fWVsc2UgaWYoZWZmZWN0ID09PSBcImVuYWJsZVwiKXtcblx0XHRcdGVmZmVjdCA9IHRydWU7XG5cdFx0fVxuXG5cdFx0dGhpcy5fdWlCeVNlY3Rpb25bdWlFZmZlY3RbMV1dLnN0YXRlID0gZWZmZWN0O1xuXHR9XG5cblx0ZGVjaWRlKGRlY2lzaW9uKXtcblxuXHRcdHRoaXMuX2RlY2lzaW9uID0gbmV3IERlY2lzaW9uKHtcblx0XHRcdGNob2ljZXM6IGRlY2lzaW9uLmNob2ljZXMsXG5cdFx0XHRpbmZyYXN0cnVjdHVyZTogdGhpcy5faW5mcmFzdHJ1Y3R1cmVCeU5hbWUsXG5cdFx0XHRyZXNvdXJjZXM6IHRoaXMuX3Jlc291cmNlc0J5TmFtZSxcblx0XHRcdG5hcnJhdGl2ZTogdGhpcyxcblx0XHR9KTtcblxuXHR9XG5cblx0d2FpdCh3YWl0VGltZSwgaSl7XG5cdFx0dmFyIHByZXZpb3VzTmFycmF0aXZlID0gdGhpcy5uYXJyYXRpdmVbaS0xXTtcblx0XHR2YXIgdGltZSA9IHdhaXRUaW1lICogMTAwMCArIHRoaXMudGV4dExlbmd0aE9mZnNldChwcmV2aW91c05hcnJhdGl2ZSk7XG5cdFx0dGltZSA9IHRpbWUvdGhpcy5fc3BlZWQ7XG5cdFx0c2V0VGltZW91dCgoKSA9PiB7XG5cdFx0XHR0aGlzLmluY3JlbWVudFByb2dyZXNzKCk7XG5cdFx0XHR0aGlzLmdvKCk7XG5cdFx0fSwgdGltZSk7XG5cdH1cbn0iLCJpbXBvcnQgUmVzb3VyY2VWaWV3IGZyb20gJy4vVmlld3MvUmVzb3VyY2VWaWV3JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVzb3VyY2VzIHtcblxuXHRjb25zdHJ1Y3RvcihvcHRpb25zKXtcblx0XHR0aGlzLm5hbWUgPSBvcHRpb25zLm5hbWU7XG5cdFx0dGhpcy5fbGV2ZWwgPSBvcHRpb25zLmluaXRpYWw7XG5cdFx0dGhpcy5fcmVzb3VyY2VWaWV3ID0gbmV3IFJlc291cmNlVmlldygpO1xuXHRcdHRoaXMuX3Jlc291cmNlVmlldy5yZW5kZXIoIHtuYW1lOiB0aGlzLm5hbWUsIGxldmVsOiB0aGlzLmxldmVsfSApO1xuXHR9XG5cblx0Z2V0IGxldmVsKCl7XG5cdFx0cmV0dXJuIHRoaXMuX2xldmVsO1xuXHR9XG5cblx0c2V0IGxldmVsKGxldmVsQWRqdXN0KXtcblx0XHR0aGlzLl9sZXZlbCA9IHRoaXMuX2xldmVsICsgbGV2ZWxBZGp1c3Q7XG5cdFx0dGhpcy5fcmVzb3VyY2VWaWV3LnJlbmRlcigge25hbWU6IHRoaXMubmFtZSwgbGV2ZWw6IHRoaXMubGV2ZWx9ICk7XG5cdH1cbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBEZWNpc2lvblZpZXcge1xuXG5cdGNvbnN0cnVjdG9yKGRlY2lzaW9uSW5zdGFuY2Upe1xuXHRcdHRoaXMuZGVjaXNpb25JbnN0YW5jZSA9IGRlY2lzaW9uSW5zdGFuY2U7XG5cdH1cblxuXHRyZW5kZXIoY2hvaWNlcyl7XG5cblx0XHR2YXIgdGVtcGxhdGUgPSBcIlwiO1xuXG5cdFx0Zm9yKGxldCBpIGluIGNob2ljZXMpIHsgXG5cdFx0XHR2YXIgY2hvaWNlID0gY2hvaWNlc1tpXTtcblxuXHRcdFx0dmFyIGVmZmVjdHMgPSBuZXcgU3RyaW5nO1xuXG5cdFx0XHQvLyBhZGQgdGhlIGVmZmVjdHMgdG8gdGhlIGJ1dHRvbiB0ZW1wbGF0ZS4gVGhpcyBpcyB3ZWFrIGFuZCBcblx0XHRcdC8vIG5lZWRzIHRvIGJlIGFic3RyYWN0ZWQgYW5kIGltcG9ydmVkXG5cdFx0XHRmb3IodmFyIGsgaW4gY2hvaWNlLmVmZmVjdHMpe1xuXHRcdFx0XHRlZmZlY3RzID0gZWZmZWN0cyArIFwiZGF0YS1cIiArIGsgKyBcIj1cIiArIEpTT04uc3RyaW5naWZ5KGNob2ljZS5lZmZlY3RzW2tdKSArIFwiIFwiO1xuXHRcdFx0fVxuXG5cdFx0XHRlZmZlY3RzID0gZWZmZWN0cyArIFwiZGF0YS1nb3RvPVwiICsgSlNPTi5zdHJpbmdpZnkoY2hvaWNlLmdvdG8pO1xuXG5cdFx0XHR0ZW1wbGF0ZSs9IGAgXG5cdFx0XHRcdDxzcGFuIGNsYXNzPVwiYW5zd2VyLWdyb3VwXCI+XG5cdFx0XHRcdFx0PGJ1dHRvbiAkeyBlZmZlY3RzIH0gPiR7IGNob2ljZS50ZXh0IH08L2J1dHRvbj5cblx0XHRcdFx0PC9zcGFuPlxuXHRcdFx0YDtcblx0XHR9IFxuXG5cdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJuYXJyYXRpdmVcIikuaW5uZXJIVE1MICs9IHRlbXBsYXRlO1xuXG5cdFx0dGhpcy5iaW5kRXZlbnRzKCk7XG5cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxuXG5cdGRlY2lkZShldnQpe1xuXHRcdGZvciAodmFyIGkgPSB0aGlzLmRlY2ljaW9uQnV0dG9ucy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuXHRcdFx0dGhpcy5kZWNpY2lvbkJ1dHRvbnNbaV0uZGlzYWJsZWQgPSBcInRydWVcIjtcblx0XHR9O1xuXG5cdFx0dGhpcy5kZWNpc2lvbkluc3RhbmNlLmRlY2lzaW9uRXZlbnQgPSBldnQ7XG5cdH1cblxuXHRiaW5kRXZlbnRzKCl7XG5cdFx0dGhpcy5kZWNpY2lvbkJ1dHRvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmFuc3dlci1ncm91cCBidXR0b25cIik7XG5cdFx0Zm9yICh2YXIgaSA9IHRoaXMuZGVjaWNpb25CdXR0b25zLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG5cdFx0XHR2YXIgYnV0dG9uID0gdGhpcy5kZWNpY2lvbkJ1dHRvbnNbaV07XG5cdFx0XHRpZighYnV0dG9uLmRpc2FibGVkKXtcblx0XHRcdFx0YnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBldnQgPT4gdGhpcy5kZWNpZGUoZXZ0KSxmYWxzZSk7XG5cdFx0XHR9XG5cdFx0fTtcblx0fVxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZnJhc3RydWN0dXJlVmlldyB7XG5cblx0cmVuZGVyKGRhdGEpe1xuXG5cdFx0dmFyIGluZnJhc3RydWN0dXJlVmlld1dyYXBwZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImluZnJhc3RydWN0dXJlXCIpO1xuXHRcdHZhciBpbmZyYXN0cnVjdHVyZU1lbnVJdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuaW5mcmFzdHJ1Y3R1cmVcIik7XG5cdFx0dmFyIHJlcGxhY2VJbmZyYXN0cnVjdHVyZSA9IGZhbHNlO1xuXHRcdHZhciBpbm5lclRlbXBsYXRlID0gYCR7IGRhdGEubmFtZSB9OiAkeyBkYXRhLnN0YXR1cyB9YDtcblxuXHRcdHZhciB0ZW1wbGF0ZSA9IGAgXG5cdFx0XHQ8cCBjbGFzcz1cImluZnJhc3RydWN0dXJlXCIgZGF0YS10eXBlPVwiJHsgZGF0YS5uYW1lIH1cIj5cblx0XHRcdFx0JHsgaW5uZXJUZW1wbGF0ZSB9XG5cdFx0XHQ8L3A+XG5cdFx0YDtcblxuXHRcdGlmKGluZnJhc3RydWN0dXJlTWVudUl0ZW1zLmxlbmd0aCA+IDApe1xuXHRcdFx0Zm9yICh2YXIgaSA9IGluZnJhc3RydWN0dXJlTWVudUl0ZW1zLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG5cdFx0XHRcdHZhciBpbmZyYXN0cnVjdHVyZU1lbnVJdGVtID0gaW5mcmFzdHJ1Y3R1cmVNZW51SXRlbXNbaV07XG5cdFx0XHRcdGlmKGluZnJhc3RydWN0dXJlTWVudUl0ZW0uYXR0cmlidXRlc1tcImRhdGEtdHlwZVwiXS52YWx1ZSA9PT0gZGF0YS5uYW1lKXtcblx0XHRcdFx0XHRyZXBsYWNlSW5mcmFzdHJ1Y3R1cmUgPSB0cnVlO1xuXHRcdFx0XHRcdGluZnJhc3RydWN0dXJlTWVudUl0ZW0uaW5uZXJIVE1MID0gaW5uZXJUZW1wbGF0ZTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHR9XG5cblx0XHRpZighcmVwbGFjZUluZnJhc3RydWN0dXJlKXtcblx0XHRcdGluZnJhc3RydWN0dXJlVmlld1dyYXBwZXIuaW5uZXJIVE1MICs9IHRlbXBsYXRlO1xuXHRcdH1cblx0XG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBOYXJyYXRpdmVWaWV3IHtcblxuXHRjb25zdHJ1Y3Rvcigpe1xuXHRcdHRoaXMuX3NjZW5lO1xuXHR9XG5cblx0Z2V0IHNjZW5lKCl7XG5cdFx0cmV0dXJuIHRoaXMuX3NjZW5lXG5cdH1cblxuXHRzZXQgc2NlbmUoc2NlbmUpe1xuXHRcdHRoaXMuX3NjZW5lID0gc2NlbmU7XG5cdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJuYXJyYXRpdmVcIikuaW5uZXJIVE1MICs9IGA8ZGl2IGlkPVwiJHtzY2VuZX1cIj48L2Rpdj5gO1xuXHR9XG5cblx0cmVuZGVyKGRhdGEpe1xuXG5cdFx0dmFyIHRlbXBsYXRlID0gYCBcblx0XHRcdDxwIGNsYXNzPVwib3V0cHV0XCI+XG5cdFx0XHRcdCR7IGRhdGEuY2hhcmFjdGVyLm5hbWUgfTogJHsgZGF0YS51dHRlcmFuY2UgfVxuXHRcdFx0PC9wPlxuXHRcdGA7XG5cblx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLnNjZW5lKS5pbm5lckhUTUwgKz0gdGVtcGxhdGU7XG5cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlc291cmNlVmlldyB7XG5cblx0cmVuZGVyKGRhdGEpe1xuXG5cdFx0dmFyIHJlc291cmNlVmlld1dyYXBwZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJlc291cmNlc1wiKTtcblx0XHR2YXIgcmVzb3VyY2VNZW51SXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnJlc291cmNlXCIpO1xuXHRcdHZhciByZXBsYWNlUmVzb3VyY2UgPSBmYWxzZTtcblx0XHR2YXIgaW5uZXJUZW1wbGF0ZSA9IGAkeyBkYXRhLm5hbWUgfTogJHsgZGF0YS5sZXZlbCB9YDtcblxuXHRcdHZhciB0ZW1wbGF0ZSA9IGAgXG5cdFx0XHQ8cCBjbGFzcz1cInJlc291cmNlXCIgZGF0YS10eXBlPVwiJHsgZGF0YS5uYW1lIH1cIj5cblx0XHRcdFx0JHsgaW5uZXJUZW1wbGF0ZSB9XG5cdFx0XHQ8L3A+XG5cdFx0YDtcblxuXHRcdGlmKHJlc291cmNlTWVudUl0ZW1zLmxlbmd0aCA+IDApe1xuXHRcdFx0Zm9yICh2YXIgaSA9IHJlc291cmNlTWVudUl0ZW1zLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG5cdFx0XHRcdHZhciByZXNvdXJjZU1lbnVJdGVtID0gcmVzb3VyY2VNZW51SXRlbXNbaV07XG5cdFx0XHRcdGlmKHJlc291cmNlTWVudUl0ZW0uYXR0cmlidXRlc1tcImRhdGEtdHlwZVwiXS52YWx1ZSA9PT0gZGF0YS5uYW1lKXtcblx0XHRcdFx0XHRyZXBsYWNlUmVzb3VyY2UgPSB0cnVlO1xuXHRcdFx0XHRcdHJlc291cmNlTWVudUl0ZW0uaW5uZXJIVE1MID0gaW5uZXJUZW1wbGF0ZTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHR9XG5cblx0XHRpZighcmVwbGFjZVJlc291cmNlKXtcblx0XHRcdHJlc291cmNlVmlld1dyYXBwZXIuaW5uZXJIVE1MICs9IHRlbXBsYXRlO1xuXHRcdH1cblx0XG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBVSVZpZXcge1xuXG5cdGNvbnN0cnVjdG9yKG9wdGlvbnMpe1xuXHRcdHRoaXMuX3NlY3Rpb24gPSBvcHRpb25zLnNlY3Rpb247XG5cdFx0dGhpcy5fc2VsZXRvciA9IG9wdGlvbnMuc2VsZWN0b3I7XG5cdFx0dGhpcy5zdGF0ZSA9IG9wdGlvbnMuc3RhdGUgfHwgZmFsc2U7XG5cdH1cblxuXHRnZXQgc2VsZXRvcigpe1xuXHRcdHJldHVybiB0aGlzLl9zZWxldG9yO1xuXHR9XG5cblx0Z2V0IHNlY3Rpb24oKXtcblx0XHRyZXR1cm4gdGhpcy5fc2VjdGlvbjtcblx0fVxuXG5cdGdldCBzdGF0ZSgpe1xuXHRcdHJldHVybiB0aGlzLl9zdGF0ZTtcblx0fVxuXG5cdHNldCBzdGF0ZShzdGF0ZSl7XG5cdFx0dGhpcy5fc3RhdGUgPSBzdGF0ZTtcblx0XHR2YXIgZG9tTm9kZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHRoaXMuc2VsZXRvcik7XG5cdFx0XG5cdFx0aWYodGhpcy5fc3RhdGUpe1xuXHRcdFx0XG5cdFx0XHRmb3IgKHZhciBpID0gZG9tTm9kZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcblx0XHRcdFx0ZG9tTm9kZXNbaV0uY2xhc3NMaXN0LmFkZCgnc2hvdycpO1xuXHRcdFx0fTtcblxuXHRcdH1lbHNle1xuXG5cdFx0XHRmb3IgKHZhciBpID0gZG9tTm9kZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcblx0XHRcdFx0ZG9tTm9kZXNbaV0uY2xhc3NMaXN0LnJlbW92ZSgnc2hvdycpO1xuXHRcdFx0fTtcblxuXHRcdH1cblx0fVxuXG5cdHJlbmRlcihkYXRhKXtcblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxuXG5cdHRvZ2dsZSh2aXN1YWwpe1xuXG5cdH1cbn0iLCJsZXQgY29uZmlnID0ge1xuXG5cdC8vIFRoZXNlIGFyZSBwcml2YXRlIHByb3BlcnRpZXMgdGhhdCBcblx0Ly8gYmluZCB0byB1aSBlbGVtZW50c1xuXHRfdWk6IFtcblx0XHR7c2VjdGlvbjogXCJtZW51XCIsIHN0YXRlOiBmYWxzZSwgc2VsZWN0b3I6IFwiI21lbnVcIn0sXG5cdF0sXG5cblx0c3BlZWQ6IDEsXG5cblx0cGVyc3BlY3RpdmU6IFwiTWVcIixcblxuXHRyZXNvdXJjZXM6IFtcblx0XHR7bmFtZTogXCJLaWxsb3dhdHRzXCIsIGluaXRpYWw6IDEwfSwgXG5cdFx0e25hbWU6IFwiT3h5Z2VuXCIsXHQgaW5pdGlhbDogMTB9LFxuXHRcdHtuYW1lOiBcIkRyb25lXCIsXHRcdCBpbml0aWFsOiAxfSxcblx0XHR7bmFtZTogXCJXYXRlclwiLFx0XHQgaW5pdGlhbDogMTB9LFxuXHRdLFxuXG5cdGluZnJhc3RydWN0dXJlOiBbXG5cdFx0e25hbWU6IFwiQnJpZGdlXCIsIFx0XHRzdGF0dXM6IHRydWV9LCBcblx0XHR7bmFtZTogXCJFbmdpbmVlcmluZ1wiLCBcdHN0YXR1czogdHJ1ZX0sXG5cdFx0e25hbWU6IFwiTWVkIEJheVwiLCBcdFx0c3RhdHVzOiBmYWxzZX0sXG5cdFx0e25hbWU6IFwiU2NpZW5jZSBMYWJcIiwgXHRzdGF0dXM6IGZhbHNlfSxcblx0XSxcblxuXHRjaGFyYWN0ZXJzOiBbXCJDRUJTXCJdLFxuXG5cdGVuZEdhbWU6IFtcblx0XHR7aW5mcmFzdHJ1Y3R1cmU6IFwiQnJpZGdlXCIsXHR2YWx1ZTogZmFsc2V9LFxuXHRcdHtyZXNvdXJjZXM6IFwiS2lsbG93YXR0c1wiLFx0dmFsdWU6IDB9LFxuXHRdLFxufTtcblxuXG5leHBvcnQgZGVmYXVsdCBjb25maWc7IiwibGV0IHNjZW5lID0gW1xuXHRcIkNFQlM6IE9rIGVuZ2luZWVyaW5nIGlzIHNlYWxlZC4gTGV0cyBzZWUgaWYgSSBjYW4gZ2V0IHRoZSBzaGlwcyBzdGF0dXMgb25zY3JlZW4uXCIsXG5cdDMsXG5cdFwiQXJlIHRoZSBvMiBsZXZlbHMgc3RhYmxlP1wiLFxuXHQ2LFxuXHRcIkhlbGxvPyBDRUJTP1wiLFxuXHQ1LFxuXHRcIkRhbW4gaXQsIEkganVzdCBjYW4ndCBzZWUgYSBibG9vZHkgdGhpbmchIE1heWJlIEknbGwgdHJ5IG1vdmUgbXkgYXJtcy5cIixcblx0NSxcblx0e1xuXHRcdGlzOiBcInVpXCIsXG5cdFx0ZWZmZWN0OiBcIkVuYWJsZSBtZW51XCJcblx0fSxcblx0NSxcblx0XCJDRUJTOiBIZXksIGNhbG0gZG93bi4gSSB3YXMgdHJ5aW5nIHRvIGdldCB0aGUgZGlzcGxheSB1cC4gQ2FuIHlvdSBzZWUgaXQ/XCIsXG5cdDcsXG5dXG5cbm1vZHVsZS5leHBvcnRzID0gc2NlbmU7IiwibGV0IHNjZW5lID0gW1xuXHRcIkNFQlM6IEhlbGxvLi4uXCIsIFxuXHQzLFxuXHRcIkNFQlM6IEdsYWQgdG8gc2VlIHlvdSdyZSBmaW5hbGx5IGF3YWtlXCIsXG5cdDUsXG5cdFwiV2hhdHMgZ29pbmcgb24/IEkgY2FuJ3Qgc2VlIGFueXRoaW5nIVwiLFxuXHQzLFxuXHRcIkkgY2FuJ3QgbW92ZSEgSGVscCBtZSFcIixcblx0Mixcblx0XCJDRUJTOiBEb24ndCB3b3JyeSB0aGUgcmVzY3VlIHBhcnR5IHdpbGwgYmUgaGVyZSBzb29uLCBhIGJlYWNvbiB3ZW50IHVwIGEgZmV3IGhvdXJzIGFnby4gUmlnaHQgbm93IHdlJ3ZlIGdvdCBiaWdnZXIgcHJvYmxlbXMuIFRoZSBzaGlwcyBnb3Qgc2V2ZXJhbCBodWxsIGJyZWFjaGVzIGFuZCB3ZSBuZWVkIHRvIGZvY3VzIHdoYXQgbGl0dGxlIGVuZXJneSB3ZSBoYXZlLlwiLFxuXHQzLFxuXHRcIkNFQlM6IExpZmUgc3VwcG9ydCBzeXN0ZW1zIGFyZSBiYWNrIG9ubGluZSBidXQgd2UncmUgcnVubmluZyBvbiByZXNlcnZlIHBvd2VyLiBUaGVyZSdhIGFuIE8yIGxlYWsgaW4gZW5naW5lZXJpbmcgdG9vLlwiLFxuXHQyLFxuXHRcIkNFQlM6IFdoYXQgZG8geW91IHdhbnQgdG8gZG8/XCIsXG5cdHtcblx0XHRpczogXCJkZWNpc2lvblwiLFxuXHRcdGNob2ljZXM6IFtcblx0XHRcdHtcblx0XHRcdFx0dGV4dDogXCJTZWFsIGVuZ2luZWVyaW5nXCIsXG5cdFx0XHRcdGVmZmVjdHM6IHtcblx0XHRcdFx0XHRyZXNvdXJjZTogXCItNSBLaWxsb3dhdHRzXCIsXG5cdFx0XHRcdFx0aW5mcmFzdHJ1Y3R1cmU6IFwiRGlzYWJsZSBFbmdpbmVlcmluZ1wiXG5cdFx0XHRcdH0sXG5cdFx0XHRcdGdvdG86IFwiZmluZC1kcm9uZVwiLFxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0dGV4dDogXCJGaXggdGhlIGJhY2t1cCBnZW5lcmF0b3JcIixcblx0XHRcdFx0ZWZmZWN0czoge1xuXHRcdFx0XHRcdHJlc291cmNlOiBcIi03IEtpbGxvd2F0dHNcIlxuXHRcdFx0XHR9LFxuXHRcdFx0XHRnb3RvOiBcIm8yLWxlYWtpbmdcIixcblx0XHRcdH1cblx0XHRdXG5cdH1cbl1cblxubW9kdWxlLmV4cG9ydHMgPSBzY2VuZTsiXX0=
