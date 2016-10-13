var dom = require("./domUtils");
var setSelectedMenuItem = function() {
    var path = location.pathname;
    var links = dom.find("nav.nav-bar li > a");
    links.filter(l => l.href.replace(location.origin, "") === path)
        .forEach(l => {
            dom.addClass(l.parentElement, "selected");
            //document.getElementById("mobile-title").innerHTML = l.innerHTML;
        })
}


var handlers = {
    bodyClick: function(e) {
        dom.removeClass(dom.findOne(".nav-bar ul"), "active");
    },
    menuTriggerClick: function(e) {
        e.preventDefault();
        e.stopPropagation();
        dom.addClass(dom.findOne(".nav-bar ul"), "active");
    },
    menuClick: function(e) {
        e.stopPropagation();
    }
}
var openMenu = function() {
    dom.addClass(dom.findOne(".nav-bar ul"), "active");
}
module.exports = function() {
    setSelectedMenuItem();
    dom.findOne("#menu-trigger").addEventListener("click", handlers.menuTriggerClick);
    dom.findOne(".nav-bar ul").addEventListener("click", handlers.menuClick);
    dom.findOne("body").addEventListener("click", handlers.bodyClick);
};