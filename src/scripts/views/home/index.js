var dom = require("../../utils/domUtils");

var view = {
    title: "Home",
    icon: "home",
    path: "/"
};

view.init = function() {
    view.render();
}

view.render = function() {
    var html = "hi, im the homepage"
    dom.findOne(".main-content").innerHTML = html;

}
view.destroy = function() {
    
}

module.exports = view;
