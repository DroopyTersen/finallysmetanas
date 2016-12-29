var dom = require("../../utils/domUtils");
var template = require("./template");

var view = {
    title: "Registry",
    icon: "gift",
    path: "/registry"
};

view.init = function(state) {
    view.state = state.registry;
    view.render();
}

view.render = function() {
    var html = template.render(view.state);
    dom.findOne(".main-content").innerHTML = html;

}

module.exports = view;
