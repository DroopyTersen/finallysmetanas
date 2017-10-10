var utils = require("../utils");
var views = [
    require("./savethedate"),
    require("./couple"),
    require("./weddingparty"),
    require("./schedule"),
    require("./basics"),
    require("./rsvp"),
    require("./registry"),
    //require("./place"),
    require("./travel"),
];

views.getLinks = () => {
    return views.map(v => utils.pluck(v, ["title", "icon", "path"]))
};

views.findByPath = (path) => {
    path = path || "/";
    if (path.indexOf("http") === 0) path = path.replace(location.origin, "");

    var matches = views.filter(v => v.path.toLowerCase() === path.toLowerCase());
    return matches.length ? matches[0] : null;
};

views.getNextView = (view) => {
    var index = views.findViewIndex(view);
    if (index > -1) {
        var nextIndex = index + 1;
        if (nextIndex >= views.length) nextIndex = 0;
        return views[nextIndex]
    } 
    return null;
};

views.getPrevView = (view) => {
    var index = views.findViewIndex(view);
    if (index > -1) {
        var prevIndex = index - 1;
        if (prevIndex < 0) prevIndex = views.length - 1;
        return views[prevIndex];
    } 
    return null;
};
views.findViewIndex = (view) => {
    for(var i = 0; i < views.length; i++) {
        if (views[i].path === view.path) return i;
    }
    return -1;
};
module.exports = views;