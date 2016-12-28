var dom = require("../utils/domUtils");
var Swiper = require("../utils/Swiper");

var leftMenu = {
    selector: ".nav-bar ul",
    element: null,
    isOpen: false,
    init() {
        leftMenu.element = dom.findOne(leftMenu.selector);
        leftMenu.bodySwiper = new Swiper();
        leftMenu.menuSwiper = new Swiper(leftMenu.selector);
        leftMenu.bindEvents();
        leftMenu.setActive();
    },
    setActive() {
        var path = location.pathname;
        var links = dom.find("nav.nav-bar li > a");
        links.filter(l => l.href.replace(location.origin, "") === path)
            .forEach(l => {
                dom.addClass(l.parentElement, "selected");
            })
    },
    bindEvents() {
        // Close the menu on body clicks
        dom.findOne("body").addEventListener("click", leftMenu.handlers.bodyClick);
        
        // Open the menu when you click the hamburger
        dom.findOne("#menu-trigger").addEventListener("click", leftMenu.handlers.triggerClick);

        // Prevent menu clicks from bubbling to body and closing the menu
        leftMenu.element.addEventListener("click", leftMenu.handlers.menuClick);

        // Open and close the menu with a swipe
        leftMenu.menuSwiper.on("swipe-left", leftMenu.handlers.menuSwipeLeft);
        leftMenu.bodySwiper.on("swipe-right", leftMenu.handlers.bodySwipeRight);
    },
    close() {
        dom.removeClass(leftMenu.element, "active");
        leftMenu.isOpen = false;
    },
    open() {
        dom.addClass(leftMenu.element, "active");
        leftMenu.isOpen = true;
        
    }
};

leftMenu.handlers = {
    triggerClick(e) {
        e.preventDefault();
        e.stopPropagation();
        leftMenu.open();
    },
    bodyClick(e) {
        if (leftMenu.isOpen) leftMenu.close();
    },
    menuClick(e) {
        e.stopPropagation();
    },
    menuSwipeLeft(e, swipe) {
        leftMenu.close();
    },
    bodySwipeRight(e, swipe) {
        if (swipe.start.x < 30) leftMenu.open();
    }
};

module.exports = leftMenu;
