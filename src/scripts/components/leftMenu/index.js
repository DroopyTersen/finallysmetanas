var dom = require("../..//utils/domUtils");
var Swiper = require("../../utils/Swiper");
var actions = require("../../actions");
var template = require("./template");
var leftMenu = {
    selectors: {
        menu: ".nav-bar ul",
        container: "body > header"
    },
    init(state) {
        leftMenu.state = state;
        leftMenu.container = dom.findOne(leftMenu.selectors.container);
        leftMenu.render();
        leftMenu.element = dom.findOne(leftMenu.selectors.menu);
        leftMenu.bodySwiper = new Swiper();
        leftMenu.menuSwiper = new Swiper(leftMenu.selectors.menu);
        require("./events").bindEvents(leftMenu);
        leftMenu.setActive();
    },
    setActive() {
        // Find all menu links
        dom.find("nav.nav-bar li > a").forEach(l => {
            var method = l.href.replace(location.origin, "") === leftMenu.state.activePath ? "addClass" : "removeClass";
            dom[method](l.parentElement, "active");
        });
    },
    toggle() {
        var method = leftMenu.state.isOpen ? "addClass" : "removeClass";
        dom[method](leftMenu.element, "active");
    },
    render() {
        var html = template.render(leftMenu.state);
        leftMenu.container.innerHTML = html;
    }

};

module.exports = leftMenu;
