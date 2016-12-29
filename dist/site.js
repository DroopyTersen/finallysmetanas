/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {"use strict";
	
	var createHub = __webpack_require__(1).create;
	__webpack_require__(36);
	global.fs = {
	    _hub: createHub(),
	    actions: __webpack_require__(6),
	    utils: __webpack_require__(13)
	};
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var leftMenu = __webpack_require__(2);
	var setupActionHandlers = __webpack_require__(11);
	
	exports.create = function () {
	    var hub = {};
	    hub.state = Object.assign({}, __webpack_require__(30));
	    leftMenu.init(hub.state.menu);
	    setupActionHandlers(hub);
	
	    hub.state.activeView.init(hub.state);
	    return hub;
	};

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var dom = __webpack_require__(3);
	var Swiper = __webpack_require__(4);
	var actions = __webpack_require__(6);
	var template = __webpack_require__(8);
	var leftMenu = {
	    selectors: {
	        menu: ".nav-bar ul",
	        container: "body > header"
	    },
	    init: function init(state) {
	        leftMenu.state = state;
	        leftMenu.container = dom.findOne(leftMenu.selectors.container);
	        leftMenu.render();
	        leftMenu.element = dom.findOne(leftMenu.selectors.menu);
	        leftMenu.bodySwiper = new Swiper();
	        leftMenu.menuSwiper = new Swiper(leftMenu.selectors.menu);
	        __webpack_require__(9).bindEvents(leftMenu);
	        leftMenu.setActive();
	    },
	    setActive: function setActive() {
	        // Find all menu links
	        dom.find("nav.nav-bar li > a").forEach(function (l) {
	            var method = l.href.replace(location.origin, "") === leftMenu.state.activePath ? "addClass" : "removeClass";
	            dom[method](l.parentElement, "active");
	        });
	    },
	    toggle: function toggle() {
	        var method = leftMenu.state.isOpen ? "addClass" : "removeClass";
	        dom[method](leftMenu.element, "active");
	    },
	    render: function render() {
	        var html = template.render(leftMenu.state);
	        leftMenu.container.innerHTML = html;
	    }
	};
	
	module.exports = leftMenu;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	var find = exports.find = function (selector) {
	    return [].concat(_toConsumableArray(document.querySelectorAll(selector)));
	};
	
	var findOne = exports.findOne = function (selector) {
	    return document.querySelector(selector);
	};
	
	var getClassList = exports.getClassList = function (elem) {
	    return elem.className.split(" ").map(function (c) {
	        return c.trim();
	    });
	};
	var hasClass = exports.hasClass = function (elem, className) {
	    return getClassList(elem).indexOf(className) > -1;
	};
	
	var addClass = exports.addClass = function (elem, className) {
	    if (!hasClass(elem, className)) {
	        var classes = getClassList(elem);
	        classes.push(className);
	        elem.className = classes.join(" ");
	    }
	};
	
	var removeClass = exports.removeClass = function (elem, className) {
	    var classes = getClassList(elem).filter(function (c) {
	        return c !== className;
	    });
	    elem.className = classes.join(" ");
	};
	
	var toggleClass = exports.toggleClass = function (elem, className) {
	    if (hasClass(elem, className)) removeClass(elem, className);else addClass(elem, className);
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var EventAggregator = __webpack_require__(5);
	var touchEvents = ["touchstart", "touchmove", "touchend"];
	
	var defaultOptions = {
	    swipeLength: 30
	};
	
	// Store initial values to make reset easier
	var defaultSwipe = {
	    start: { x: -1, y: -1 },
	    end: { x: -1, y: -1 },
	    direction: "",
	    distance: 0,
	    touchCount: 0
	};
	
	var Swiper = function Swiper(selector) {
	    var _this = this;
	
	    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	    // Allow overriding default options
	    this.opts = Object.assign({}, defaultOptions, opts);
	    // Allow attaching to any element but default to document
	    this.element = selector ? document.querySelector(selector) : document;
	    this.reset();
	    // Inherit from Droopy-Events
	    EventAggregator.call(this);
	
	    // Bind touch events to handler
	    touchEvents.forEach(function (e) {
	        return _this.element.addEventListener(e, _this.handleTouch.bind(_this));
	    });
	};
	
	// Inherit from Droopy-Events
	Swiper.prototype = Object.create(EventAggregator.prototype);
	
	Swiper.prototype.reset = function () {
	    this.swipe = Object.assign({}, defaultSwipe);
	};
	
	Swiper.prototype.handleTouch = function (event) {
	    if (event && event.touches) {
	        var touch = event.touches[0];
	        if (event.type === "touchstart") {
	            this.reset();
	            this._setSwipePoint("start", touch);
	        } else if (event.type === "touchmove") {
	            this._setSwipePoint("end", touch);
	            var vector = Swiper.calcVector(this.swipe.start, this.swipe.end);
	            this.swipe.distance = vector.distance;
	            this.swipe.direction = vector.direction;
	            if (this.swipe.distance >= this.opts.swipeLength) {
	                this.trigger("swiping", event, this.swipe);
	            }
	        } else if (event.type === "touchend") {
	            if (this.swipe.distance >= this.opts.swipeLength) {
	                this.trigger("swipe", event, this.swipe);
	                this.trigger("swipe-" + this.swipe.direction, event, this.swipe);
	            }
	        }
	    }
	};
	
	Swiper.prototype._setSwipePoint = function (type, touch) {
	    this.swipe[type] = {
	        x: touch.pageX,
	        y: touch.pageY
	    };
	    this.swipe.touchCount++;
	};
	
	Swiper.calcVector = function (start, end) {
	    var deltaX = Math.abs(start.x - end.x);
	    var deltaY = Math.abs(start.y - end.y);
	    var vector = {
	        distance: 0,
	        direction: ""
	    };
	    // horizontal swipe
	    if (deltaX >= deltaY) {
	        vector.direction = start.x - end.x > 0 ? "left" : "right";
	        vector.distance = deltaX;
	    } else {
	        // vertical swipe
	        vector.direction = start.y - end.y > 0 ? "up" : "down";
	        vector.distance = deltaY;
	    }
	    return vector;
	};
	
	module.exports = Swiper;

/***/ },
/* 5 */
/***/ function(module, exports) {

	var EventAggregator = function() {
		this.eventKeys = {};
		this.lastSubscriptionId = -1;
	};
	
	EventAggregator.prototype.on = function(key, callback) {
		if (typeof callback === "function") {
			if (!this.eventKeys[key]) {
				this.eventKeys[key] = {
					subscriptions: {}
				};
			}
			var token = (++this.lastSubscriptionId).toString();
			this.eventKeys[key].subscriptions[token] = callback;
			return token;
		} else {
			return false;
		}
	};
	
	EventAggregator.prototype.off = function(key, tokenOrCallback) {
		if (typeof tokenOrCallback === 'function') {
			//Callback reference was passed in so find the subscription with the matching function
			if (this.eventKeys[key]) {
				var eventSubscriptions = this.eventKeys[key].subscriptions;
				var matchingId = null;
				//foreach subscription see if the functions match and save the key if yes
				for (var subscriptionId in eventSubscriptions) {
					if (eventSubscriptions.hasOwnProperty(subscriptionId)) {
						if (eventSubscriptions[subscriptionId] === tokenOrCallback) {
							matchingId = subscriptionId;
						}
					}
				}
				if (matchingId !== null) {
					delete eventSubscriptions[matchingId];
				}
			}
		} else {
			//Token was passed in
			if (this.eventKeys[key] && this.eventKeys[key].subscriptions[tokenOrCallback]) {
				delete this.eventKeys[key].subscriptions[tokenOrCallback];
			}
		}
	};
	
	EventAggregator.prototype.trigger = function(key) {
		var self = this;
		if (self.eventKeys[key]) {
			var values = Array.prototype.slice.call(arguments, 1);
			//If passing less than values pass them individually
			var a1 = values[0],
				a2 = values[1],
				a3 = values[2];
			//Else if passing more than 3 values group as an args array
			if (values.length > 3) {
				a1 = values;
			}
	
			var subscriptions = self.eventKeys[key].subscriptions;
			setTimeout(function() {
				for (var token in subscriptions) {
					if (subscriptions.hasOwnProperty(token)) {
						subscriptions[token](a1, a2, a3);
					}
				}
			}, 0);
		}
	};
	
	module.exports = EventAggregator;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var dispatcher = __webpack_require__(7);
	
	module.exports = {
	    toggleMenu: function toggleMenu(isOpen) {
	        dispatcher.trigger("menu:toggle", isOpen);
	    },
	    navigate: function navigate(path) {
	        dispatcher.trigger("navigate", path);
	    }
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var Eventer = __webpack_require__(5);
	var dispatcher = new Eventer();
	
	module.exports = dispatcher;

/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";
	
	var render = exports.render = function (model) {
	    return "            \n    <nav class='nav-bar'>\n        <span id='menu-trigger'><i class=\"fa fa-bars\"></i></span>\n        <span id='mobile-title'>" + model.title + "</span>\n        <ul>\n            " + model.links.map(renderLink).join("") + "\n        </ul>\n    </nav>";
	};
	
	var renderLink = function renderLink(link) {
	    return "\n        <li>\n            <a href=\"" + link.path + "\">\n                <i class=\"fa fa-" + link.icon + "\"></i>\n                " + link.title + "\n            </a>\n        </li>\n    ";
	};
	// var render = exports.render = function(model) {
	//    return `            
	//     <nav class='nav-bar'>
	//         <span id='menu-trigger'><i class="fa fa-bars"></i></span>
	//         <span id='mobile-title'>Finally Smetanas</span>
	//         <ul>
	//             <li><a href='/'><i class="fa fa-home"></i>Home</a></li>
	//             <li><a href='/couple'><i class="fa fa-heart"></i>The Couple</a></li>
	//             <li><a href='/weddingparty'><i class="fa fa-users"></i>Wedding Party</a></li>
	//             <li><a href='/schedule'><i class="fa fa-clock-o"></i>Schedule</a></li>
	//             <li><a href='/registry'><i class="fa fa-gift"></i>Registry</a></li>
	//             <li><a href='/place'><i class="fa fa-map-marker"></i>Place</a></li>
	//             <li><a href='/travel'><i class="fa fa-plane"></i>Travel</a></li>
	//             <li><a href='/accomodations'><i class="fa fa-bed"></i>Accomodations</a></li>
	//             <li><a href='/social'><i class="fa fa-twitter"></i>Social Media</a></li>
	//         </ul>
	//     </nav>`
	// };

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var dom = __webpack_require__(3);
	
	var setupHandlers = __webpack_require__(10);
	var bindEvents = exports.bindEvents = function (leftMenu) {
	    setupHandlers(leftMenu);
	    // Close the menu on body clicks
	    dom.findOne("body").addEventListener("click", leftMenu.handlers.bodyClick);
	
	    // Open the menu when you click the hamburger
	    dom.findOne("#menu-trigger").addEventListener("click", leftMenu.handlers.triggerClick);
	
	    // Prevent default anchor tag behavior for client side navigation
	    dom.find(leftMenu.selectors.menu + " li a").forEach(function (link) {
	        link.addEventListener("click", leftMenu.handlers.linkClick);
	    });
	    // Prevent menu clicks from bubbling to body and closing the menu
	    leftMenu.element.addEventListener("click", leftMenu.handlers.menuClick);
	
	    // Open and close the menu with a swipe
	    leftMenu.menuSwiper.on("swipe-left", leftMenu.handlers.menuSwipeLeft);
	    leftMenu.bodySwiper.on("swiping", leftMenu.handlers.bodySwiping);
	    leftMenu.bodySwiper.on("swipe", leftMenu.handlers.bodySwipe);
	};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var actions = __webpack_require__(6);
	var dom = __webpack_require__(3);
	
	var mainContent = document.querySelector(".main-content");
	var htmlEl = document.querySelector("html");
	module.exports = function (leftMenu) {
	    leftMenu.handlers = {
	        triggerClick: function triggerClick(e) {
	            e.preventDefault();
	            e.stopPropagation();
	            actions.toggleMenu(true);
	        },
	        bodyClick: function bodyClick(e) {
	            if (leftMenu.state.isOpen) actions.toggleMenu(false);
	        },
	        menuClick: function menuClick(e) {
	            e.stopPropagation();
	        },
	        menuSwipeLeft: function menuSwipeLeft(e, swipe) {
	            actions.toggleMenu(false);
	            //e.preventDefault();
	            e.cancelBubble = true;
	            e.stopPropagation();
	        },
	        bodySwiping: function bodySwiping(e, swipe) {
	            if (swipe.start.x > 30 && swipe.distance > 40 && (swipe.direction === "left" || swipe.direction === "right")) {
	                // skip swiping stuff if it is a menu swipe
	                if (!isMenuSwipe(e)) {
	                    var left = swipe.direction === "left" ? swipe.distance * -1 : swipe.distance;
	                    mainContent.style.left = left + "px";
	                    if (swipe.distance > 125) {
	                        dom.addClass(htmlEl, "sliding");
	                    } else {
	                        dom.removeClass(htmlEl, "sliding");
	                    }
	                }
	            } else {
	                mainContent.style.left = "inherit";
	            }
	        },
	        bodySwipe: function bodySwipe(e, swipe) {
	
	            if (!e.cancelBubble) {
	                if (swipe.direction === "right" && swipe.start.x < 30) {
	                    actions.toggleMenu(true);
	                } else if (swipe.distance > 125 && (swipe.direction === "left" || swipe.direction === "right") && !isMenuSwipe(e)) {
	                    dom.addClass(mainContent, "hide");
	                    setTimeout(function () {
	                        mainContent.style.left = "inherit";
	                        dom.removeClass(mainContent, "hide");
	                    }, 100);
	                    var dir = swipe.direction === "left" ? 1 : -1;
	                    actions.navigate(dir);
	                } else {
	                    mainContent.style.left = "inherit";
	                }
	            } else {
	                mainContent.style.left = "inherit";
	            }
	            dom.removeClass(htmlEl, "sliding");
	        },
	        linkClick: function linkClick(e) {
	            if (e.currentTarget && e.currentTarget.href) {
	                actions.navigate(e.currentTarget.href);
	                e.stopPropagation();
	                e.preventDefault();
	            }
	        }
	    };
	};
	
	var isMenuSwipe = function isMenuSwipe(e) {
	    return [].concat.apply([], e.path.map(function (el) {
	        return el.className;
	    })).join(",").indexOf("nav-bar") > -1;
	};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var dispatcher = __webpack_require__(7);
	var leftMenu = __webpack_require__(2);
	var views = __webpack_require__(12);
	var actions = __webpack_require__(6);
	
	module.exports = function (hub) {
	    var actionHandlers = {
	        "menu:toggle": function menuToggle(isOpen) {
	            hub.state.menu.isOpen = isOpen;
	            leftMenu.toggle();
	        },
	        "navigate": function navigate() {
	            var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "/";
	
	            if (typeof path === "number") {
	                hub.state.activeView = path > 0 ? views.getNextView(hub.state.activeView) : views.getPrevView(hub.state.activeView);
	            } else {
	                hub.state.activeView = views.findByPath(path);
	            }
	            hub.state.activeView.init(hub.state);
	            window.scroll(0, 0);
	            hub.state.menu.activePath = hub.state.activeView.path;
	            leftMenu.setActive();
	
	            window.history.pushState(null, hub.state.activeView.title, hub.state.activeView.path);
	            actions.toggleMenu(false);
	        }
	    };
	
	    Object.keys(actionHandlers).forEach(function (key) {
	        dispatcher.on(key, actionHandlers[key]);
	    });
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var utils = __webpack_require__(13);
	var views = [
	// require("./home"),
	__webpack_require__(14), __webpack_require__(16), __webpack_require__(20), __webpack_require__(22), __webpack_require__(24), __webpack_require__(26), __webpack_require__(28)];
	
	views.getLinks = function () {
	    return views.map(function (v) {
	        return utils.pluck(v, ["title", "icon", "path"]);
	    });
	};
	
	views.findByPath = function (path) {
	    path = path || "/";
	    if (path.indexOf("http") === 0) path = path.replace(location.origin, "");
	
	    var matches = views.filter(function (v) {
	        return v.path.toLowerCase() === path.toLowerCase();
	    });
	    return matches.length ? matches[0] : null;
	};
	
	views.getNextView = function (view) {
	    var index = views.findViewIndex(view);
	    if (index > -1) {
	        var nextIndex = index + 1;
	        if (nextIndex >= views.length) nextIndex = 0;
	        return views[nextIndex];
	    }
	    return null;
	};
	
	views.getPrevView = function (view) {
	    var index = views.findViewIndex(view);
	    if (index > -1) {
	        var prevIndex = index - 1;
	        if (prevIndex < 0) prevIndex = views.length - 1;
	        return views[prevIndex];
	    }
	    return null;
	};
	views.findViewIndex = function (view) {
	    for (var i = 0; i < views.length; i++) {
	        if (views[i].path === view.path) return i;
	    }
	    return -1;
	};
	module.exports = views;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var utils = {
	    dom: __webpack_require__(3),
	    Swiper: __webpack_require__(4)
	};
	
	utils.toArray = function (obj) {
	    return Object.keys(obj).map(function (key) {
	        return obj[key];
	    });
	};
	
	utils.pluck = function (obj, props) {
	    var newObj = {};
	    props.forEach(function (prop) {
	        return newObj[prop] = obj[prop];
	    });
	    return newObj;
	};
	
	module.exports = utils;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var dom = __webpack_require__(3);
	var template = __webpack_require__(15);
	
	var view = {
	    title: "The Couple",
	    icon: "heart",
	    path: "/"
	};
	
	view.init = function (state) {
	    view.state = state.thecouple;
	    view.render();
	};
	
	view.render = function () {
	    var html = template.render(view.state);
	    dom.findOne(".main-content").innerHTML = html;
	};
	
	module.exports = view;

/***/ },
/* 15 */
/***/ function(module, exports) {

	"use strict";
	
	exports.render = function (model) {
	    return "\n        <div id='the-couple'>\n            <div class='view-title'>\n                <hr/>\n                <h2 class='view-title'>The Couple</h2>\n            </div>\n            <div class='image-container'>\n                <img src='" + model.imageUrl + "'>\n            </div>\n            <div class='content'>\n                " + model.content + "\n            </div>\n        </div>\n    ";
	};

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var dom = __webpack_require__(3);
	var template = __webpack_require__(17);
	var createPersonGrid = __webpack_require__(18).create;
	
	var view = {
	    title: "Wedding Party",
	    icon: "users",
	    path: "/weddingparty"
	};
	
	view.init = function (state) {
	    view.state = state;
	    view.render();
	};
	
	view.render = function () {
	    var html = template.render();
	    dom.findOne(".main-content").innerHTML = html;
	
	    createPersonGrid("#bridesmaids", { title: "Bridesmaids", people: view.state.bridesmaids });
	    createPersonGrid("#groomsmen", { title: "Groomsmen", people: view.state.groomsmen });
	};
	
	module.exports = view;

/***/ },
/* 17 */
/***/ function(module, exports) {

	"use strict";
	
	exports.render = function (model) {
	    return "\n        <div id='wedding-party'>\n            <div class='view-title'>\n                <hr/>\n                <h2 class='view-title'>Wedding Party</h2>\n            </div>\n            <div id='bridesmaids'></div>\n            <div id='groomsmen'></div>\n        </div>\n    ";
	};

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var template = __webpack_require__(19);
	var dom = __webpack_require__(3);
	
	exports.create = function (selector, state) {
	    var selectors = {
	        closeBtn: selector + " .person-details .close-btn",
	        modal: selector + " .person-details",
	        modalContent: selector + " .person-details .content",
	        person: selector + " li.person"
	    };
	    var component = {
	        state: state,
	        container: dom.findOne(selector)
	    };
	
	    var onPersonClick = function onPersonClick(e) {
	        e.preventDefault();
	        e.stopPropagation();
	        showPersonDetails(e.currentTarget.getAttribute("data-name"));
	    };
	
	    var showPersonDetails = function showPersonDetails(name) {
	        var matches = component.state.people.filter(function (p) {
	            return p.name === name;
	        });
	        if (matches.length) {
	            dom.findOne(selectors.modalContent).innerHTML = template.renderDetails(matches[0]);
	            dom.addClass(dom.findOne(selectors.modal), "active");
	        };
	    };
	
	    var closePersonDetails = function closePersonDetails() {
	        dom.removeClass(dom.findOne(selectors.modal), "active");
	    };
	
	    var bindEvents = function bindEvents() {
	        dom.find(selectors.person).forEach(function (li) {
	            //li.addEventListener("click", onPersonClick);
	        });
	        dom.findOne(selectors.closeBtn).addEventListener("click", closePersonDetails);
	    };
	
	    var render = function render() {
	        var html = template.render(component.state);
	        component.container.innerHTML = html;
	    };
	
	    render();
	    bindEvents();
	};

/***/ },
/* 19 */
/***/ function(module, exports) {

	"use strict";
	
	var renderPerson = function renderPerson(person) {
	    return "\n        <li class='person' data-name='" + person.name + "'>\n            <img src='/images/people/" + person.name.toLowerCase() + "-md.jpg'>\n            <div class='caption'>\n                <div class='name'>" + person.name + "</div>\n                <div class='title'>" + person.title + "</div>\n            </div>\n        </li>\n        ";
	};
	
	exports.renderDetails = function (person) {
	    return "\n        <img src='/images/people/" + person.name.toLowerCase() + ".jpg'>\n        <h3 class='name'>" + person.name + "</h3>\n        <div class='knownfor'>Known for " + person.yearsKnown + " years</div>\n        <div class='bio'>\n            " + person.bio + "\n        </div>\n    ";
	};
	exports.render = function (model) {
	    return "\n        <div class='person-grid'>\n            <h3 class='grid-title'>" + model.title + "</h3>\n            <ul>\n                " + model.people.map(renderPerson).join("") + "\n            </ul>\n\n            <div class='person-details'>\n                <div class='content'></div>\n                <span class='close-btn'><i class=\"fa fa-2x fa-times\"></i></span>\n            <div>\n        </div>\n    ";
	};

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var dom = __webpack_require__(3);
	var template = __webpack_require__(21);
	
	var view = {
	    title: "Schedule",
	    icon: "clock-o",
	    path: "/schedule"
	};
	
	view.init = function (state) {
	    // view.state = state.schedule;
	    view.render();
	};
	
	view.render = function () {
	    var html = template.render();
	    dom.findOne(".main-content").innerHTML = html;
	};
	
	module.exports = view;

/***/ },
/* 21 */
/***/ function(module, exports) {

	"use strict";
	
	exports.render = function (model) {
	    return "\n        <div class='schedule'>\n            <div class='view-title'>\n                <hr/>\n                <h2 class='view-title'>Schedule</h2>\n            </div>\n            <div class='content'>\n                <p>Coming soon...</p>\n            </div>\n        </div>\n    ";
	};

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var dom = __webpack_require__(3);
	var template = __webpack_require__(23);
	
	var view = {
	    title: "rsvp",
	    icon: "thumbs-o-up",
	    path: "/rsvp"
	};
	
	view.init = function (state) {
	    // view.state = state.schedule;
	    view.render();
	};
	
	view.render = function () {
	    var html = template.render();
	    dom.findOne(".main-content").innerHTML = html;
	};
	
	module.exports = view;

/***/ },
/* 23 */
/***/ function(module, exports) {

	"use strict";
	
	exports.render = function (model) {
	    return "\n        <div class='rsvp'>\n            <div class='view-title'>\n                <hr/>\n                <h2 class='view-title'>RSVP</h2>\n            </div>\n            <div class='content'>\n                <p>Coming soon...</p>\n            </div>\n        </div>\n    ";
	};

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var dom = __webpack_require__(3);
	var template = __webpack_require__(25);
	
	var view = {
	    title: "Registry",
	    icon: "gift",
	    path: "/registry"
	};
	
	view.init = function (state) {
	    view.state = state.registry;
	    view.render();
	};
	
	view.render = function () {
	    var html = template.render(view.state);
	    dom.findOne(".main-content").innerHTML = html;
	};
	
	module.exports = view;

/***/ },
/* 25 */
/***/ function(module, exports) {

	"use strict";
	
	exports.render = function (model) {
	    return "\n        <div class='registry'>\n            <div class='view-title'>\n                <hr/>\n                <h2 class='view-title'>Registry</h2>\n            </div>\n            <div class='content'>\n                " + model.content + "\n            </div>\n            <div class='links'>\n                " + model.links.map(renderLink).join(" / ") + "\n            </div>\n        </div>\n    ";
	};
	
	var renderLink = function renderLink(link) {
	    return "<a target='_blank' href='" + link.url + "'>" + link.title + "</a>";
	};

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var dom = __webpack_require__(3);
	var template = __webpack_require__(27);
	
	var view = {
	    title: "Place",
	    icon: "map-marker",
	    path: "/place"
	};
	
	view.init = function (state) {
	    // view.state = state.schedule;
	    view.render();
	};
	
	view.render = function () {
	    var html = template.render();
	    dom.findOne(".main-content").innerHTML = html;
	};
	
	module.exports = view;

/***/ },
/* 27 */
/***/ function(module, exports) {

	"use strict";
	
	exports.render = function (model) {
	    return "\n        <div class='place'>\n            <div class='view-title'>\n                <hr/>\n                <h2 class='view-title'>Place</h2>\n            </div>\n            <div class='content'>\n                <p>Coming soon...</p>\n            </div>\n        </div>\n    ";
	};

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var dom = __webpack_require__(3);
	var template = __webpack_require__(29);
	
	var view = {
	    title: "Travel",
	    icon: "plane",
	    path: "/travel"
	};
	
	view.init = function (state) {
	    // view.state = state.schedule;
	    view.render();
	};
	
	view.render = function () {
	    var html = template.render();
	    dom.findOne(".main-content").innerHTML = html;
	};
	
	module.exports = view;

/***/ },
/* 29 */
/***/ function(module, exports) {

	"use strict";
	
	exports.render = function (model) {
	    return "\n        <div class='travel'>\n            <div class='view-title'>\n                <hr/>\n                <h2 class='view-title'>Travel</h2>\n            </div>\n            <div class='content'>\n                <p>Coming soon...</p>\n            </div>\n        </div>\n    ";
	};

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var views = __webpack_require__(12);
	var activeView = views.findByPath(location.pathname);
	
	var state = {
	    activeView: activeView,
	    menu: {
	        title: "Finally Smetanas",
	        isOpen: false,
	        activePath: activeView.path,
	        links: views.getLinks()
	    }
	};
	
	// add in hardcoded data
	state = Object.assign({}, __webpack_require__(31), state);
	module.exports = state;

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = {
	    thecouple: __webpack_require__(32),
	    bridesmaids: __webpack_require__(33),
	    groomsmen: __webpack_require__(34),
	    registry: __webpack_require__(35)
	};

/***/ },
/* 32 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = {
	    imageUrl: "/images/couple.jpg",
	    content: "\n<p class='tagline'>Hi, we\u2019re Jake and Angela. We\u2019re pretty fond of one another.</p>\n<hr />\n<p><i>Our story is kind of long, so here\u2019s a condensed version for you\u2026</i></p>\n\n<p>We met in CP U.S. Government class at Horlick High School \n(shoutout to Mr. Blaga for putting us together on his seating chart!), \nbecoming the dynamic duo you all know and love in 2005.</p>\n\n<p>Since then we\u2019ve survived enjoyed many adventures... \nfive years of college (that good \u201CSuper Senior\u201D status), many road trips, \nover 112 hours watching Star Wars, a 4,000 mile trip to London to see a statue, \ntwo kickball cookouts, a VIP One Direction concert experience, \nand becoming fur parents to our precious Duke.</p>\n\n<p>Now, we\u2019re are going to embark on our greatest adventure yet.</p>\n\n<p>While taking Duke for a walk along Lake Michigan, Jake asked to stop \nto try to catch a Pokemon. Oblivious, Angela obliged and decided to take \na photo of the harbor for her Snap Story.</p> \n\n<p>After capturing the perfect shot, \nshe turned to find Jake fumbling around in his pocket. \"What the f*ck are you doing?\", \nshe asked.</p> \n\n<p>Finally, he pulled out what he\u2019d been searching for\u2026 a thimble. \nDropping to one knee with Duke at his side, Jake asked Angela to marry him and Duke.</p>\n\n<p>Yep. That\u2019s right, after 12 <s>looooooooooong</s> beautiful, unforgettable years... \nwe will finally be <i>The Smetanas.</i></p>\n"
	};

/***/ },
/* 33 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = [{
	    name: "Ani",
	    title: "Maid of Honor",
	    yearsKnown: "16",
	    imageUrl: "/images/people/ani.jpg",
	    bio: "<p>Ani and Ang have more memories together than they can remember\u2026  \n        (\"Teen drinking is very bad.\" J-Kwon)</p>"
	}, {
	    name: "Kimberly",
	    title: "Maid of Honor",
	    imageUrl: "/images/people/kimberly.jpg",
	    yearsKnown: "24",
	    bio: "<p>Ang would like to quote an ever-so-wise Mary-Kate Olsen at age 5, \"I am the cute one. She's just my sister.\"</p>"
	}, {
	    name: "Jordan",
	    title: "Bridesmaid",
	    imageUrl: "/images/people/jordan.jpg",
	    yearsKnown: "12",
	    bio: "<p>Jordan's Bio is coming soon...</p>"
	}, {
	    name: "Kristin",
	    title: "Bridesmaid",
	    imageUrl: "http://placehold.it/200x200",
	    yearsKnown: "12",
	    bio: "<p>Kristin was the first person to find out Ang and Jake had become an official couple back in 2005. Even before Angela.</p>"
	}, {
	    name: "Julie",
	    title: "Bridesmaid",
	    imageUrl: "/images/people/julie.jpg",
	    yearsKnown: "12",
	    bio: "<p>One time Julie and Ang threw Justin Bieber an 18th birthday party. The little jerk didn\u2019t show\u2026</p>"
	}, {
	    name: "Breah",
	    title: "Bridesmaid",
	    imageUrl: "/images/people/breah.jpg",
	    yearsKnown: "3",
	    bio: "<p>Breah is the official legal representation for the wedding party should things get too out-of-hand at the hen night/stag parties.</p>"
	}, {
	    name: "Lily",
	    title: "Flower Girl",
	    imageUrl: "http://placehold.it/200x200",
	    yearsKnown: "3",
	    bio: "<p>Lily's bio is coming soon...</p>"
	}];

/***/ },
/* 34 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = [{
	    name: "Jared",
	    title: "Best Man",
	    yearsKnown: "27",
	    imageUrl: "/images/people/jared.jpg",
	    bio: "<p>Jared's Bio is coming soon...</p>"
	}, {
	    name: "Drew",
	    title: "Best Man",
	    imageUrl: "/images/people/drew.jpg",
	    yearsKnown: "23",
	    bio: "<p>One time Drew wouldn't paint Jake\u2019s back with blue paint for a Halloween costume \n        because Jake\u2019s back was too hairy. Jake will never forget it or forgive him.</p>"
	}, {
	    name: "Colin",
	    title: "Groomsman",
	    imageUrl: "/images/people/colin.jpg",
	    yearsKnown: "23",
	    bio: "<p>As Colin\u2019s body grew to match his head, so did his place in Jake\u2019s heart.</p>"
	}, {
	    name: "Josh",
	    title: "Groomsman",
	    imageUrl: "/images/people/josh.jpg",
	    yearsKnown: "15",
	    bio: "<p>Josh and Jake bonded over the ancient proverb, \u201CMoney can\u2019t buy knives.\u201D</p>"
	}, {
	    name: "Ryan",
	    title: "Groomsman",
	    imageUrl: "/images/people/ryan.jpg",
	    yearsKnown: "10",
	    bio: "<p>Ryan's bio is coming soon...</p>"
	}, {
	    name: "Shawn",
	    title: "Groomsman",
	    imageUrl: "http://placehold.it/200x200",
	    yearsKnown: "7",
	    bio: "<p>Shawn once threw up on a pair of Jake\u2019s work boots\u2026 so Jake stole Shawn\u2019s shoes. SHHH\u2026 he doesn\u2019t know.</p>"
	}, {
	    name: "Landon",
	    title: "Ring Bearer",
	    imageUrl: "http://placehold.it/200x200",
	    yearsKnown: "7",
	    bio: "<p>Landon's bio is coming soon...</p>"
	}, {
	    name: "Duke",
	    title: "Ring Bearer",
	    imageUrl: "/images/people/duke.jpg",
	    yearsKnown: "3",
	    bio: "<p>Duuuuuuuuuuuuke!!</p>"
	}];

/***/ },
/* 35 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = {
	    links: [{
	        title: "Amazon",
	        url: "https://www.amazon.com/"
	    }, {
	        title: "Zola",
	        url: "https://www.zola.com/wedding-registry"
	    }, {
	        title: "Target",
	        url: "http://www.target.com/"
	    }, {
	        title: "West Elm",
	        url: "http://www.westelm.com/"
	    }, {
	        title: "Bed Bath & Beyond",
	        url: "https://www.bedbathandbeyond.com/"
	    }],
	    content: "\n    <p>We appreciate you coming \u2013 from near and far \u2013 to be with us \n    over this holiday weekend. Your attendance is as good a gift as any. \n    Who really needs a KitchenAid, anyway? (Though, in the event you find it necessary, they are available on Amazon).</p>\n\n    <p>To add a little copper to our otherwise non-existent Moscow mule collection, \n    you can browse our \"wants\" over here at Zola. Or, if you feel inclined, take a minute or \n    two to peruse Target, West Elm, or Bed Bath & Beyond.</p>"
	};

/***/ },
/* 36 */
/***/ function(module, exports) {

	'use strict';
	
	if (!location.origin) {
	  location.origin = location.protocol + "//" + location.host;
	}
	if (typeof Object.assign != 'function') {
	  Object.assign = function (target, varArgs) {
	    // .length of function is 2
	    'use strict';
	
	    if (target == null) {
	      // TypeError if undefined or null
	      throw new TypeError('Cannot convert undefined or null to object');
	    }
	
	    var to = Object(target);
	
	    for (var index = 1; index < arguments.length; index++) {
	      var nextSource = arguments[index];
	
	      if (nextSource != null) {
	        // Skip over if undefined or null
	        for (var nextKey in nextSource) {
	          // Avoid bugs when hasOwnProperty is shadowed
	          if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
	            to[nextKey] = nextSource[nextKey];
	          }
	        }
	      }
	    }
	    return to;
	  };
	};
	
	if (!Array.prototype.find) {
	  Array.prototype.find = function (func) {
	    try {
	      var length = this.length;
	      for (var i = 0; i < length; i++) {
	        if (func(this[i])) return this[i];
	      }
	      return undefined;
	    } catch (ex) {
	      return undefined;
	    }
	  };
	}
	
	if (!Array.prototype.findIndex) {
	  Array.prototype.findIndex = function (func) {
	    try {
	      var length = this.length;
	      for (var i = 0; i < length; i++) {
	        if (func(this[i])) return i;
	      }
	      return -1;
	    } catch (ex) {
	      return -1;
	    }
	  };
	}
	
	if (!Array.from) {
	  Array.from = function () {
	    var toStr = Object.prototype.toString;
	    var isCallable = function isCallable(fn) {
	      return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
	    };
	    var toInteger = function toInteger(value) {
	      var number = Number(value);
	      if (isNaN(number)) {
	        return 0;
	      }
	      if (number === 0 || !isFinite(number)) {
	        return number;
	      }
	      return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
	    };
	    var maxSafeInteger = Math.pow(2, 53) - 1;
	    var toLength = function toLength(value) {
	      var len = toInteger(value);
	      return Math.min(Math.max(len, 0), maxSafeInteger);
	    };
	
	    // The length property of the from method is 1.
	    return function from(arrayLike /*, mapFn, thisArg */) {
	      // 1. Let C be the this value.
	      var C = this;
	
	      // 2. Let items be ToObject(arrayLike).
	      var items = Object(arrayLike);
	
	      // 3. ReturnIfAbrupt(items).
	      if (arrayLike == null) {
	        throw new TypeError("Array.from requires an array-like object - not null or undefined");
	      }
	
	      // 4. If mapfn is undefined, then let mapping be false.
	      var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
	      var T;
	      if (typeof mapFn !== 'undefined') {
	        // 5. else
	        // 5. a If IsCallable(mapfn) is false, throw a TypeError exception.
	        if (!isCallable(mapFn)) {
	          throw new TypeError('Array.from: when provided, the second argument must be a function');
	        }
	
	        // 5. b. If thisArg was supplied, let T be thisArg; else let T be undefined.
	        if (arguments.length > 2) {
	          T = arguments[2];
	        }
	      }
	
	      // 10. Let lenValue be Get(items, "length").
	      // 11. Let len be ToLength(lenValue).
	      var len = toLength(items.length);
	
	      // 13. If IsConstructor(C) is true, then
	      // 13. a. Let A be the result of calling the [[Construct]] internal method 
	      // of C with an argument list containing the single item len.
	      // 14. a. Else, Let A be ArrayCreate(len).
	      var A = isCallable(C) ? Object(new C(len)) : new Array(len);
	
	      // 16. Let k be 0.
	      var k = 0;
	      // 17. Repeat, while k < len… (also steps a - h)
	      var kValue;
	      while (k < len) {
	        kValue = items[k];
	        if (mapFn) {
	          A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
	        } else {
	          A[k] = kValue;
	        }
	        k += 1;
	      }
	      // 18. Let putStatus be Put(A, "length", len, true).
	      A.length = len;
	      // 20. Return A.
	      return A;
	    };
	  }();
	}

/***/ }
/******/ ]);
//# sourceMappingURL=site.js.map