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
	    hub.state = Object.assign({}, __webpack_require__(17));
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
	    leftMenu.bodySwiper.on("swipe-right", leftMenu.handlers.bodySwipeRight);
	};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var actions = __webpack_require__(6);
	
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
	        },
	        bodySwipeRight: function bodySwipeRight(e, swipe) {
	            if (swipe.start.x < 30) actions.toggleMenu(true);
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
	
	            hub.state.activeView = views.findByPath(path);
	            hub.state.activeView.init(hub.state);
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
	__webpack_require__(15), __webpack_require__(16)];
	
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
/* 14 */,
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var dom = __webpack_require__(3);
	var template = __webpack_require__(20);
	
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
	
	view.destroy = function () {};
	
	module.exports = view;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var dom = __webpack_require__(3);
	
	var view = {
	    title: "Wedding Party",
	    icon: "users",
	    path: "/weddingparty"
	};
	
	view.init = function () {
	    view.render();
	};
	
	view.render = function () {
	    var html = "hi, im the wedding party page";
	    dom.findOne(".main-content").innerHTML = html;
	};
	
	view.destroy = function () {};
	
	module.exports = view;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var views = __webpack_require__(12);
	var activeView = views.findByPath(location.pathname);
	var data = __webpack_require__(18);
	var state = {
	    activeView: activeView,
	    menu: {
	        title: "Finally Smetanas",
	        isOpen: false,
	        activePath: activeView.path,
	        links: views.getLinks()
	    },
	    thecouple: data.thecouple
	};
	
	module.exports = state;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = {
	    thecouple: __webpack_require__(19)
	};

/***/ },
/* 19 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = {
	    imageUrl: "/images/couple.jpg",
	    content: "\n<p class='tagline'>Hi, we\u2019re Jake and Angela. We\u2019re pretty fond of one another.</p>\n<hr />\n<p><i>Our story is kind of long, so here\u2019s a condensed version for you\u2026</i></p>\n\n<p>We met in CP U.S. Government class at Horlick High School \n(shoutout to Mr. Blaga for putting us together on his seating chart!), \nbecoming the dynamic duo you all know and love in 2005.</p>\n\n<p>Since then we\u2019ve survived enjoyed many adventures... \nfive years of college (that good \u201CSuper Senior\u201D status), many road trips, \nover 112 hours watching Star Wars, a 4,000 mile trip to London to see a statue, \ntwo kickball cookouts, a VIP One Direction concert experience, \nand becoming fur parents to our precious Duke.</p>\n\n<p>Now, we\u2019re are going to embark on our greatest adventure yet.</p>\n\n<p>While taking Duke for a walk along Lake Michigan, Jake asked to stop \nto try to catch a Pokemon. Oblivious, Angela obliged and decided to take \na photo of the harbor for her Snap Story.</p> \n\n<p>After capturing the perfect shot, \nshe turned to find Jake fumbling around in his pocket. \"What the f*ck are you doing?\", \nshe asked.</p> \n\n<p>Finally, he pulled out what he\u2019d been searching for\u2026 a thimble. \nDropping to one knee with Duke at his side, Jake asked Angela to marry him and Duke.</p>\n\n<p>Yep. That\u2019s right, after 12 <s>looooooooooong</s> beautiful, unforgettable years... \nwe will finally be The Smetanas.</p>\n"
	};

/***/ },
/* 20 */
/***/ function(module, exports) {

	"use strict";
	
	exports.render = function (model) {
	    return "\n        <div id='the-couple'>\n            <div class='view-title'>\n                <hr/>\n                <h2 class='view-title'>The Couple</h2>\n            </div>\n            <div class='image-container'>\n                <img src='" + model.imageUrl + "'>\n            </div>\n            <div class='content'>\n                " + model.content + "\n            </div>\n        </div>\n    ";
	};

/***/ }
/******/ ]);
//# sourceMappingURL=site.js.map