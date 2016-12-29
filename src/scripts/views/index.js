var utils = require("../utils");
var views = [
    // require("./home"),
    require("./couple"),
    require("./weddingparty"),
    require("./schedule"),
    require("./rsvp"),
    require("./registry"),
    require("./place"),
    require("./travel")
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

module.exports = views;