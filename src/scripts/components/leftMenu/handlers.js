var actions = require("../../actions");
var dom = require("../../utils/domUtils");

var mainContent = document.querySelector(".main-content");
var htmlEl = document.querySelector("html");
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
        bodySwiping(e, swipe) {
            if (swipe.start.x > 30 && swipe.distance > 40 && (swipe.direction === "left" || swipe.direction === "right")) {
                var left = swipe.direction === "left" ? swipe.distance * -1 : swipe.distance;
                mainContent.style.left = left + "px";
                if (swipe.distance > 125) {
                    dom.addClass(htmlEl, "sliding");
                } else {
                    dom.removeClass(htmlEl, "sliding");
                }
            } else {
                mainContent.style.left = "inherit";
            }
        },
        bodySwipe(e, swipe) {

            if (!e.cancelBubble) {
                if (swipe.direction === "right" && swipe.start.x < 30) {
                    actions.toggleMenu(true);
                } else if (swipe.distance > 125 && (swipe.direction === "left" || swipe.direction === "right")) {
                    dom.addClass(mainContent, "hide");
                    setTimeout(() => {
                        mainContent.style.left = "inherit";
                        dom.removeClass(mainContent, "hide");
                    }, 100);
                    var dir = swipe.direction === "left" ? 1 : -1;
                    actions.navigate(dir)
                } else {
                    mainContent.style.left = "inherit";
                }
            } else {
                mainContent.style.left = "inherit";
            }
            dom.removeClass(htmlEl, "sliding");
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
