var dom = require("../../utils/domUtils");
var template = require("./template");

var view = {
    title: "Schedule",
    icon: "clock-o",
    path: "/schedule"
};

view.init = function(state) {
    view.state = state.schedule;
    view.render();
}

view.render = function() {
    var html = template.render(view.state);
    dom.findOne(".main-content").innerHTML = html;

}

module.exports = view;
