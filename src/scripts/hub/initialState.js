var views = require("../views");
var activeView = views.findByPath(location.pathname)
var data = require("../data");
var state = {
    activeView,
    menu: {
        title: "Finally Smetanas",
        isOpen: false,
        activePath: activeView.path,
        links: views.getLinks()
    },
    thecouple: data.thecouple
}

module.exports = state;