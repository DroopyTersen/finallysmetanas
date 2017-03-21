var dom = require("../../utils/domUtils");
var template = require("./template");

var view = {
    title: "The Couple",
    icon: "heart",
    path: "/thecouple"
};

view.init = function(state) {
    view.state = state.thecouple;
    view.render();
}

view.render = function() {
    var html = template.render(view.state);
    dom.findOne(".main-content").innerHTML = html;

}

module.exports = view;
