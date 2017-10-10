var dom = require("../../utils/domUtils");
var template = require("./template");

var view = {
    title: "rsvp",
    icon: "thumbs-o-up",
    path: "/rsvp"
};

view.init = function(state) {
    // view.state = state.schedule;
    view.render();
}

view.render = function() {
    var html = template.render();
    var scriptTag = document.createElement("script");
    dom.findOne(".main-content").innerHTML = html;
    var embed = new EmbedForm();
    iFrameResize({autoResize: true,heightCalculationMethod: 'max',enablePublicMethods: true}, "#RSVPifyIFrame");
    dom.findOne(".main-content .content").appendChild(scriptTag);
}

function EmbedForm() {
	this.iframe = null;
	this.iframe = null;
	this.currentProtocol = "https";
	this.startScroll = false;
	this.init = function() {
		this.createForm();
	};
	this.createForm = function() {
		var ie_check = !!window.ActiveXObject;
		var iframe =
			'<iframe id="RSVPifyIFrame" style="width:100%; border:none;" onload="window.parent.scrollTo(0,0)" allowtransparency="true" src="' +
			this.currentProtocol +
            '://finallysmetanas.app.rsvpify.com/?embed=1&js=1" frameborder="0" scrolling="no"></iframe>';
        console.log(iframe);
        dom.findOne(".main-content .content").innerHTML = iframe;
		this.iframe = document.getElementById("RSVPifyIFrame");
		if (ie_check === true) {
			try {
				var iframe = this.iframe;
				var doc = iframe.contentDocument
					? iframe.contentDocument
					: iframe.contentWindow.document || iframe.document;
				doc.open();
				doc.write("");
			} catch (err) {
				this.iframe.src =
					"javascript:void((function(){document.open();document.domain='" +
					this.baseUrl() +
					"';document.close();})())";
			}
		} else {
			var innerDocument = document.getElementById("RSVPifyIFrame").contentWindow.document;
			var spinnerImage = innerDocument.createElement("IMG");
			var container = innerDocument.createElement("P");
			container.style["text-align"] = "center";
			spinnerImage.src = this.currentProtocol + "://app.rsvpify.com/images/preloader.GIF";
			container.appendChild(spinnerImage);
			innerDocument.body.appendChild(container);
		}
	};
	this.baseUrl = function() {
		var pathArray = location.href.split("/");
		var site_host = pathArray[2];
		return site_host;
	};
	this.init();
}

module.exports = view;
