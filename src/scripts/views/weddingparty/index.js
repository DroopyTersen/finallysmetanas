var dom = require("../../utils/domUtils");
var template = require("./template");
var createPersonGrid = require("../../components/personGrid").create;

var view = {
    title: "Wedding Party",
    icon: "users",
    path: "/weddingparty"
};

view.init = function(state) {
    view.state = state;
    view.render();
}

view.render = function() {
    var html = template.render();
    dom.findOne(".main-content").innerHTML = html;

    createPersonGrid("#bridesmaids", { title: "Bridesmaids", people: view.state.bridesmaids});
    createPersonGrid("#groomsmen", { title: "Groomsmen", people: view.state.groomsmen});
}

view.destroy = function() {
    
}

module.exports = view;
