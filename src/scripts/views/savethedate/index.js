var dom = require("../../utils/domUtils");
var template = require("./template");

var view = {
    title: "Home",
    icon: "home",
    path: "/"
};

view.init = function(state) {
    view.state = state.savethedate;
    view.render();
}

view.render = function() {
    var html = template.render(view.state);
    dom.findOne(".main-content").innerHTML = html;
}

module.exports = view;
