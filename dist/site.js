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

	"use strict";
	
	var onload = __webpack_require__(1);
	var utils = {
	    dom: __webpack_require__(2)
	};
	onload();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var dom = __webpack_require__(2);
	var setSelectedMenuItem = function setSelectedMenuItem() {
	    var path = location.pathname;
	    var links = dom.find("nav.nav-bar li > a");
	    links.filter(function (l) {
	        return l.href.replace(location.origin, "") === path;
	    }).forEach(function (l) {
	        dom.addClass(l.parentElement, "selected");
	        //document.getElementById("mobile-title").innerHTML = l.innerHTML;
	    });
	};
	
	var handlers = {
	    bodyClick: function bodyClick(e) {
	        dom.removeClass(dom.findOne(".nav-bar ul"), "active");
	    },
	    menuTriggerClick: function menuTriggerClick(e) {
	        e.preventDefault();
	        e.stopPropagation();
	        dom.addClass(dom.findOne(".nav-bar ul"), "active");
	    },
	    menuClick: function menuClick(e) {
	        e.stopPropagation();
	    }
	};
	var openMenu = function openMenu() {
	    dom.addClass(dom.findOne(".nav-bar ul"), "active");
	};
	module.exports = function () {
	    setSelectedMenuItem();
	    dom.findOne("#menu-trigger").addEventListener("click", handlers.menuTriggerClick);
	    dom.findOne(".nav-bar ul").addEventListener("click", handlers.menuClick);
	    dom.findOne("body").addEventListener("click", handlers.bodyClick);
	};

/***/ },
/* 2 */
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

/***/ }
/******/ ]);
//# sourceMappingURL=site.js.map