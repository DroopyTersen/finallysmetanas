var dom = require("../../utils/domUtils");
var template = require("./template");

var view = {
    title: "The Couple",
    icon: "heart",
    path: "/"
};

view.init = function(state) {
    view.state = state.thecouple;
    view.render();
}

view.render = function() {
    var html = template.render(view.state);
    dom.findOne(".main-content").innerHTML = html;

}

view.destroy = function() {
    
}

module.exports = view;
