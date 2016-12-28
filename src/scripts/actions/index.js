var dispatcher = require("./dispatcher");

module.exports = {
    toggleMenu: (isOpen) => {
        dispatcher.trigger("menu:toggle", isOpen);
    },
    navigate: (path) => {
        dispatcher.trigger("navigate", path)
    }
}

