var dispatcher = require("../actions/dispatcher");
var leftMenu = require("../components/leftMenu");
var views = require("../views");
var actions = require("../actions");

module.exports = function(hub) {
    var actionHandlers = {
        "menu:toggle": function(isOpen) {
            hub.state.menu.isOpen = isOpen;
            leftMenu.toggle();
        },
        "navigate": function(path = "/") {
            if (typeof path === "number") {
                hub.state.activeView = path > 0 ? views.getNextView(hub.state.activeView) : views.getPrevView(hub.state.activeView);
            } else {
                hub.state.activeView = views.findByPath(path);
            }
            hub.state.activeView.init(hub.state);
            window.scroll(0,0);
            hub.state.menu.activePath = hub.state.activeView.path;
            leftMenu.setActive();

            window.history.pushState(null, hub.state.activeView.title, hub.state.activeView.path);
            actions.toggleMenu(false);
        }
    }; 

    Object.keys(actionHandlers).forEach(key => {
        dispatcher.on(key, actionHandlers[key])
    });
}