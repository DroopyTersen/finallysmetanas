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
            //e.preventDefault();
                e.cancelBubble = true;
            e.stopPropagation();
            
        },
        bodySwipe(e, swipe) {
            if (!e.cancelBubble) {
                if (swipe.direction === "right" && swipe.start.x < 30) {
                    actions.toggleMenu(true);
                    //e.preventDefault();
                } else if (swipe.distance > 125 && (swipe.direction === "left" || swipe.direction === "right")) {
                    var dir = swipe.direction === "left" ? 1 : -1;
                    actions.navigate(dir)
                }
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