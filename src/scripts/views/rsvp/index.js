var dom = require("../../utils/domUtils");
var template = require("./template");

var view = {
    title: "rsvp",
    icon: "thumbs-o-up",
    path: "/rsvp"
};

view.init = function(state) {
    // view.state = state.schedule;
    view.render();
}

view.render = function() {
    var html = template.render();
    dom.findOne(".main-content").innerHTML = html;

}

module.exports = view;
