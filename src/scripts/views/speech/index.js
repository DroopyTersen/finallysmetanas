var dom = require("../../utils/domUtils");
var template = require("./template");
var slides = require("./slides");
var createDb = require("./firebase");
let db = null;
var view = {
    title: "Speech",
    hidden: true,
    path: "/speech",
    icon: "glass"
};

view.init = async function() {
    view.render();
    db = await createDb();
    view.events.bind();
    view.currentSlide = await db.getCurrentSlide();
    view.setCurrentSlide(view.currentSlide);
}
view.setCurrentSlide = function(index) {
    dom.find(".slide.active").forEach(el => dom.removeClass(el, "active"))
    var target = dom.findOne(".slide-" + index);
    dom.addClass(target, "active");    
}
view.render = function() {
    var html = template.render({ slides, isAdmin: checkIfAdmin() });
    dom.findOne(".main-content").innerHTML = html;
}

var checkIfAdmin = function() {
    return (window.location.hash === "#admin")
}
view.events = {
    handlers: {
        clickNext() {
            view.currentSlide++;
            if (view.currentSlide >= slides.length) {
                view.currentSlide = 0;
            }
            db.setCurrentSlide(view.currentSlide);
        },
        clickPrev() {
            view.currentSlide--;
            if (view.currentSlide < 0) {
                view.currentSlide = slides.length - 1;
            }
            db.setCurrentSlide(view.currentSlide);
        }
    },
    bind() {
        dom.findOne(".the-speech .next-btn")
            .addEventListener("click", view.events.handlers.clickNext);

        var prevBtn = dom.findOne(".the-speech .prev-btn")
            .addEventListener("click", view.events.handlers.clickPrev);
        
        db.onSlideChange(view.setCurrentSlide);
    }
}
module.exports = view;
