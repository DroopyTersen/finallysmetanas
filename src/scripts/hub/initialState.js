var views = require("../views");
var activeView = views.findByPath(location.pathname)
var state = {
    activeView,
    menu: {
        title: "Finally Smetanas",
        isOpen: false,
        activePath: activeView.path,
        links: views.getLinks()
    }
}

module.exports = state;