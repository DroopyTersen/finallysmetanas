var dom = require("../../utils/domUtils");
var template = require("./template");

var view = {
    title: "The Basics",
    icon: "question",
    path: "/thebasics"
};

view.init = function(state) {
    view.state = state.thebasics;
    view.render();
}

view.render = function() {
    var html = template.render(view.state);
    dom.findOne(".main-content").innerHTML = html;

}

module.exports = view;
