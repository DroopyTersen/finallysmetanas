var dom = require("../../utils/domUtils");

var setupHandlers = require("./handlers");
var bindEvents = exports.bindEvents = function(leftMenu) {
    setupHandlers(leftMenu);
   // Close the menu on body clicks
    dom.findOne("body").addEventListener("click", leftMenu.handlers.bodyClick);
    
    // Open the menu when you click the hamburger
    dom.findOne("#menu-trigger").addEventListener("click", leftMenu.handlers.triggerClick);

    // Prevent default anchor tag behavior for client side navigation
    dom.find(leftMenu.selectors.menu + " li a").forEach(link => {
        link.addEventListener("click", leftMenu.handlers.linkClick)
    });
    // Prevent menu clicks from bubbling to body and closing the menu
    leftMenu.element.addEventListener("click", leftMenu.handlers.menuClick);

    // Open and close the menu with a swipe
    leftMenu.menuSwiper.on("swipe-left", leftMenu.handlers.menuSwipeLeft);
    leftMenu.bodySwiper.on("swipe", leftMenu.handlers.bodySwipe);
}
