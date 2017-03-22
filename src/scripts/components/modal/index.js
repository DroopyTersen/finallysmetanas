var template = require("./template");
var dom = require("../../utils/domUtils");

exports.create = function(selector = ".main-content") {
    var modal =  {}
    var init = function() {
        dom.append(selector, template.render({ html: "" }))
        dom.find(".close-btn").addEventListener("click", () => modal.close())
    }
    modal.open = function(html) {
        dom.find(".modal-content").innerHTML = html;
        dom.addClass(dom.find(".modal-container"), "visible");
    }
    modal.close = function() {
        dom.find(".modal-content").innerHTML = "";
        dom.removeClass(dom.find(".modal-container"), "visible");
    }
    return modal;
}

