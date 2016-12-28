var EventAggregator = require("droopy-events");
var touchEvents = ["touchstart", "touchmove", "touchend"];

var defaultOptions = {
    swipeLength: 30
}

// Store initial values to make reset easier
var defaultSwipe = {
    start: { x: -1, y: -1 },
    end: { x: -1, y: -1 },
    direction: "",
    distance: 0,
    touchCount: 0
};

var Swiper = function(selector, opts = {}) {
    // Allow overriding default options
    this.opts = Object.assign({}, defaultOptions, opts);
    // Allow attaching to any element but default to document
    this.element = selector ? document.querySelector(selector) : document;
    this.reset();
    // Inherit from Droopy-Events
    EventAggregator.call(this);

    // Bind touch events to handler
    touchEvents.forEach(e => this.element.addEventListener(e, this.handleTouch.bind(this)))
};

// Inherit from Droopy-Events
Swiper.prototype = Object.create(EventAggregator.prototype);

Swiper.prototype.reset = function() {
    this.swipe = Object.assign({}, defaultSwipe);
};

Swiper.prototype.handleTouch = function(event) {
    if (event && event.touches) {
        let touch = event.touches[0];
        if (event.type === "touchstart") {
            this.reset();
            this._setSwipePoint("start", touch);
        } else if (event.type === "touchmove") {
            this._setSwipePoint("end", touch);
            var vector = Swiper.calcVector(this.swipe.start, this.swipe.end);
            this.swipe.distance = vector.distance;
            this.swipe.direction = vector.direction;
            if (this.swipe.distance >= this.opts.swipeLength) {
                this.trigger("swiping", event, this.swipe);
            }
        } else if (event.type === "touchend") {
            if (this.swipe.distance >= this.opts.swipeLength) {
                this.trigger("swipe", event, this.swipe);
                this.trigger(`swipe-${this.swipe.direction}`, event, this.swipe);
            }
        }
    }
};

Swiper.prototype._setSwipePoint = function(type, touch) {
    this.swipe[type] = {
        x: touch.pageX,
        y: touch.pageY
    };
    this.swipe.touchCount++;
};

Swiper.calcVector = function(start, end) {
    var deltaX = Math.abs(start.x - end.x);
    var deltaY = Math.abs(start.y - end.y);
    var vector = {
        distance: 0,
        direction: ""
    };
    // horizontal swipe
    if (deltaX >= deltaY) {
        vector.direction = (start.x - end.x > 0) ? "left" : "right";
        vector.distance = deltaX;
    } else { // vertical swipe
        vector.direction = (start.y - end.y > 0) ? "up" : "down";
        vector.distance = deltaY;
    }
    return vector;
};

module.exports = Swiper;
