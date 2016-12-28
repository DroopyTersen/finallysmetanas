var dom = require("../../utils/domUtils");

var view = {
    title: "Wedding Party",
    icon: "users",
    path: "/weddingparty"
};

view.init = function() {
    view.render();
}

view.render = function() {
    var html = "hi, im the wedding party page"
    dom.findOne(".main-content").innerHTML = html;
}

view.destroy = function() {
    
}

module.exports = view;
