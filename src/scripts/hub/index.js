var leftMenu = require("../components/leftMenu");
var setupActionHandlers = require("./actionHandlers");

exports.create = function() {
    var hub = {};
    hub.state = Object.assign({}, require("./initialState"));
    leftMenu.init(hub.state.menu);
    setupActionHandlers(hub);
   
    hub.state.activeView.init();
    return hub;
};


