!function(t){function e(i){if(n[i])return n[i].exports;var s=n[i]={exports:{},id:i,loaded:!1};return t[i].call(s.exports,s,s.exports,e),s.loaded=!0,s.exports}var n={};return e.m=t,e.c=n,e.p="",e(0)}([function(t,e,n){"use strict";var i=n(2);i()},function(t,e,n){"use strict";var i=n(4),s=n(3),r={selector:".nav-bar ul",element:null,isOpen:!1,init:function(){r.element=i.findOne(r.selector),r.bodySwiper=new s,r.menuSwiper=new s(r.selector),r.bindEvents(),r.setActive()},setActive:function(){var t=location.pathname,e=i.find("nav.nav-bar li > a");e.filter(function(e){return e.href.replace(location.origin,"")===t}).forEach(function(t){i.addClass(t.parentElement,"selected")})},bindEvents:function(){i.findOne("body").addEventListener("click",r.handlers.bodyClick),i.findOne("#menu-trigger").addEventListener("click",r.handlers.triggerClick),r.element.addEventListener("click",r.handlers.menuClick),r.menuSwiper.on("swipe-left",r.handlers.menuSwipeLeft),r.bodySwiper.on("swipe-right",r.handlers.bodySwipeRight)},close:function(){i.removeClass(r.element,"active"),r.isOpen=!1},open:function(){i.addClass(r.element,"active"),r.isOpen=!0}};r.handlers={triggerClick:function(t){t.preventDefault(),t.stopPropagation(),r.open()},bodyClick:function(t){r.isOpen&&r.close()},menuClick:function(t){t.stopPropagation()},menuSwipeLeft:function(t,e){r.close()},bodySwipeRight:function(t,e){e.start.x<30&&r.open()}},t.exports=r},function(t,e,n){"use strict";var i=n(1);t.exports=function(){i.init()}},function(t,e,n){"use strict";var i=n(5),s=["touchstart","touchmove","touchend"],r={swipeLength:30},o={start:{x:-1,y:-1},end:{x:-1,y:-1},direction:"",distance:0,touchCount:0},c=function(t){var e=this,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};this.opts=Object.assign({},r,n),this.element=t?document.querySelector(t):document,this.reset(),i.call(this),s.forEach(function(t){return e.element.addEventListener(t,e.handleTouch.bind(e))})};c.prototype=Object.create(i.prototype),c.prototype.reset=function(){this.swipe=Object.assign({},o)},c.prototype.handleTouch=function(t){if(t&&t.touches){var e=t.touches[0];if("touchstart"===t.type)this.reset(),this._setSwipePoint("start",e);else if("touchmove"===t.type){this._setSwipePoint("end",e);var n=c.calcVector(this.swipe.start,this.swipe.end);this.swipe.distance=n.distance,this.swipe.direction=n.direction,this.swipe.distance>=this.opts.swipeLength&&this.trigger("swiping",t,this.swipe)}else"touchend"===t.type&&this.swipe.distance>=this.opts.swipeLength&&(this.trigger("swipe",t,this.swipe),this.trigger("swipe-"+this.swipe.direction,t,this.swipe))}},c.prototype._setSwipePoint=function(t,e){this.swipe[t]={x:e.pageX,y:e.pageY},this.swipe.touchCount++},c.calcVector=function(t,e){var n=Math.abs(t.x-e.x),i=Math.abs(t.y-e.y),s={distance:0,direction:""};return n>=i?(s.direction=t.x-e.x>0?"left":"right",s.distance=n):(s.direction=t.y-e.y>0?"up":"down",s.distance=i),s},t.exports=c},function(t,e){"use strict";function n(t){if(Array.isArray(t)){for(var e=0,n=Array(t.length);e<t.length;e++)n[e]=t[e];return n}return Array.from(t)}var i=(e.find=function(t){return[].concat(n(document.querySelectorAll(t)))},e.findOne=function(t){return document.querySelector(t)},e.getClassList=function(t){return t.className.split(" ").map(function(t){return t.trim()})}),s=e.hasClass=function(t,e){return i(t).indexOf(e)>-1},r=e.addClass=function(t,e){if(!s(t,e)){var n=i(t);n.push(e),t.className=n.join(" ")}},o=e.removeClass=function(t,e){var n=i(t).filter(function(t){return t!==e});t.className=n.join(" ")};e.toggleClass=function(t,e){s(t,e)?o(t,e):r(t,e)}},function(t,e){var n=function(){this.eventKeys={},this.lastSubscriptionId=-1};n.prototype.on=function(t,e){if("function"==typeof e){this.eventKeys[t]||(this.eventKeys[t]={subscriptions:{}});var n=(++this.lastSubscriptionId).toString();return this.eventKeys[t].subscriptions[n]=e,n}return!1},n.prototype.off=function(t,e){if("function"==typeof e){if(this.eventKeys[t]){var n=this.eventKeys[t].subscriptions,i=null;for(var s in n)n.hasOwnProperty(s)&&n[s]===e&&(i=s);null!==i&&delete n[i]}}else this.eventKeys[t]&&this.eventKeys[t].subscriptions[e]&&delete this.eventKeys[t].subscriptions[e]},n.prototype.trigger=function(t){var e=this;if(e.eventKeys[t]){var n=Array.prototype.slice.call(arguments,1),i=n[0],s=n[1],r=n[2];n.length>3&&(i=n);var o=e.eventKeys[t].subscriptions;setTimeout(function(){for(var t in o)o.hasOwnProperty(t)&&o[t](i,s,r)},0)}},t.exports=n}]);
//# sourceMappingURL=site.js.map