!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.mynaconnect=e():t.mynaconnect=e()}(this,(function(){return function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=0)}([function(t,e,n){"use strict";n.r(e),n.d(e,"Popup",(function(){return a})),n.d(e,"signWithAuth",(function(){return c})),n.d(e,"getAuthCert",(function(){return s}));var r=function(){return(r=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++)for(var o in e=arguments[n])Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t}).apply(this,arguments)},o=function(t,e,n,r){return new(n||(n=Promise))((function(o,i){function u(t){try{c(r.next(t))}catch(t){i(t)}}function a(t){try{c(r.throw(t))}catch(t){i(t)}}function c(t){var e;t.done?o(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(u,a)}c((r=r.apply(t,e||[])).next())}))},i=function(t,e){var n,r,o,i,u={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function a(i){return function(a){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;u;)try{if(n=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return u.label++,{value:i[1],done:!1};case 5:u.label++,r=i[1],i=[0];continue;case 7:i=u.ops.pop(),u.trys.pop();continue;default:if(!(o=u.trys,(o=o.length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){u=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){u.label=i[1];break}if(6===i[0]&&u.label<o[1]){u.label=o[1],o=i;break}if(o&&u.label<o[2]){u.label=o[2],u.ops.push(i);break}o[2]&&u.ops.pop(),u.trys.pop();continue}i=e.call(t,u)}catch(t){i=[6,t],r=0}finally{n=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,a])}}},u="yes"!=localStorage.dev?"https://connect.mynumber.dev":"http://localhost:8080",a=function(){function t(t){var e=this,n=t.appName;this.events={},this.target=null,this.appName="",this.windowTimer=null,this.appName=n,window.addEventListener("message",(function(t){t.origin===u&&e.emit(t.data.type,t.data.data)}))}return t.prototype.emit=function(t,e){var n;null===(n=this.events[t])||void 0===n||n.forEach((function(t){return t(e)}))},t.prototype.on=function(t,e){this.events[t]?this.events[t].push(e):this.events[t]=[e]},t.prototype.off=function(t,e){var n=this.events[t];n&&n.length&&(this.events[t]=n.filter((function(t){return t==e})))},t.prototype.waitOnce=function(t){var e=this;return new Promise((function(n,r){var o=function(r){e.off(t,o),n(r)};e.on(t,o)}))},t.prototype.send=function(t,e){void 0===e&&(e={}),this.target&&this.target.postMessage({type:t,data:e},u)},t.prototype.open=function(t,e){var n=this;void 0===e&&(e={}),this.target=window.open(u,"mynaconnect","width=500,height=650,top="+(window.screenY+(window.outerHeight-650)/2)+",left="+(window.screenX+(window.outerWidth-500)/2)),this.on("childReady",(function(){n.send("parentReady",r({remoteOrigin:location.origin,appName:n.appName,commandType:t},e))})),this.on("result",(function(){n.close()})),this.windowTimer=setInterval((function(){n.target&&n.target.closed&&n.close(!0)}),400),window.addEventListener("beforeunload",(function(t){t.preventDefault(),n.close()}))},t.prototype.close=function(t){var e;void 0===t&&(t=!1),t&&this.emit("exit",{success:!1,cancelled:!0}),this.windowTimer&&clearInterval(this.windowTimer),null===(e=this.target)||void 0===e||e.close(),this.target=null},t.prototype.getResult=function(){return o(this,void 0,void 0,(function(){return i(this,(function(t){switch(t.label){case 0:return[4,Promise.race([this.waitOnce("result"),this.waitOnce("exit")])];case 1:return[2,t.sent()]}}))}))},t}();function c(t,e){return o(this,void 0,void 0,(function(){var n;return i(this,(function(r){switch(r.label){case 0:return(n=new a({appName:t})).open("signWithAuth",{sigHash:e}),[4,n.getResult()];case 1:return[2,r.sent()]}}))}))}function s(t){return o(this,void 0,void 0,(function(){var e;return i(this,(function(n){switch(n.label){case 0:return(e=new a({appName:t})).open("getAuthCert"),[4,e.getResult()];case 1:return[2,n.sent()]}}))}))}}])}));