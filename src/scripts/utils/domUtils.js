var find = exports.find = function(selector) {
    return [].slice.call(document.querySelectorAll(selector), 0);
};

var findOne = exports.findOne = function(selector) {
    return document.querySelector(selector);
};

var getClassList = exports.getClassList = function(elem) {
    return elem.className.split(" ").map(c => c.trim());
}
var hasClass = exports.hasClass = function(elem, className) {
    return getClassList(elem).indexOf(className) > -1
};

var addClass = exports.addClass = function(elem, className) {
    if (!hasClass(elem, className)) {
        var classes = getClassList(elem);
        classes.push(className);
        elem.className = classes.join(" ");
    }
    return elem;
}

var removeClass = exports.removeClass = function(elem, className) {
    var classes = getClassList(elem).filter(c => c !== className);
    elem.className = classes.join(" ");
    return elem;
}

var toggleClass = exports.toggleClass = function(elem, className) {
    if (hasClass(elem, className)) removeClass(elem, className)
    else addClass(elem, className);
    return elem;
}

var append = exports.append = function(selector, html) {
    var elem = find(selector);
    if (elem) elem.innerHTML = elem.innerHTML + html
    else throw new Error("Unable to find element: " + selector);
}