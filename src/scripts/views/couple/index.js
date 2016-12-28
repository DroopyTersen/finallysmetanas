var dom = require("../../utils/domUtils");

var view = {
    title: "The Couple",
    icon: "heart",
    path: "/thecouple"
};

view.init = function() {
    view.render();
}

view.render = function() {
    var html = "hi, im the couples page"
    dom.findOne(".main-content").innerHTML = html;

}

view.destroy = function() {
    
}

module.exports = view;
