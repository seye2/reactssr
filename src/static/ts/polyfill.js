"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** IE9, IE10 and IE11 requires all of the following polyfills. **/
require("core-js/es6/symbol");
require("core-js/es6/object");
require("core-js/es6/function");
require("core-js/es6/number");
require("core-js/es6/promise");
// import 'core-js/fn/promise';
//import 'core-js/es6/math';
require("core-js/es6/string");
require("core-js/es6/date");
require("core-js/es6/array");
require("core-js/es6/map");
require("core-js/es6/set");
// import 'core-js/web/dom-collections';
// import 'core-js/fn/dom-collections/iterator';
//import 'core-js/es6/parse-int';
//import 'core-js/es6/parse-float';
//import 'core-js/es6/regexp';
//import 'core-js/es7/object';
//import 'core-js/fn/typed/array-buffer';
if (!NodeList.prototype['forEach']) {
    NodeList.prototype['forEach'] = function (callback, thisArg) {
        thisArg = thisArg || window;
        for (var i = 0; i < this.length; i++) {
            callback.call(thisArg, this[i], i, this);
        }
    };
}
