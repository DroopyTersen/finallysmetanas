var template = require("./template.js");
var dom = require("../../utils/domUtils");
exports.create = function(selector, state) {
    var selectors = {
        closeBtn: selector + " .person-details .close-btn",
        modal: selector + " .person-details",
        modalContent: selector + " .person-details .content",
        person: selector + " li.person"
    }
    var component = {
        state,
        container: dom.findOne(selector)
    };

    var onPersonClick = function(e) {
        e.preventDefault();
        e.stopPropagation();
        showPersonDetails(e.currentTarget.getAttribute("data-name"));
    };

    var showPersonDetails = function(name) {
        var matches = component.state.people.filter(p => p.name === name);
        if (matches.length) {
            dom.findOne(selectors.modalContent).innerHTML = template.renderDetails(matches[0]);
            dom.addClass(dom.findOne(selectors.modal), "active");
        };
    };

    var closePersonDetails = function() {
        dom.removeClass(dom.findOne(selectors.modal), "active");
    };

    var bindEvents = function() {
        dom.find(selectors.person).forEach(li => {
            li.addEventListener("click", onPersonClick);
        })
        dom.findOne(selectors.closeBtn).addEventListener("click", closePersonDetails);
    };

    var render = function() {
        var html = template.render(component.state)
        component.container.innerHTML = html;
    };


    render();
    bindEvents();
}