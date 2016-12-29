var actions = require("../../actions");

module.exports = function(leftMenu) {
    leftMenu.handlers = {
        triggerClick(e) {
            e.preventDefault();
            e.stopPropagation();
            actions.toggleMenu(true);
        },
        bodyClick(e) {
            if (leftMenu.state.isOpen) actions.toggleMenu(false);
        },
        menuClick(e) {
            e.stopPropagation();
        },
        menuSwipeLeft(e, swipe) {
            actions.toggleMenu(false);
            e.preventDefault();
        },
        bodySwipeRight(e, swipe) {
            if (swipe.start.x < 30) {
                actions.toggleMenu(true);
                e.preventDefault();
            }
        },
        linkClick(e) {
            if (e.currentTarget && e.currentTarget.href) {
                actions.navigate(e.currentTarget.href);
                e.stopPropagation();
                e.preventDefault();
            }
        }
    };
}