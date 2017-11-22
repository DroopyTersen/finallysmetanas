var views = require("../views");
var activeView = views.findByPath(location.pathname)

var state = {
    activeView,
    menu: {
        title: "Finally Smetanas",
        isOpen: false,
        activePath: activeView.path,
        links: views.getLinks()
    },
    thespeech: {
        currentSlide: 0
    }
}

// add in hardcoded data
state = Object.assign({}, require("../data"), state);
module.exports = state;