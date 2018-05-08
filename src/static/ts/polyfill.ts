/** IE9, IE10 and IE11 requires all of the following polyfills. **/
import 'core-js/es6/symbol';
import 'core-js/es6/object';
import 'core-js/es6/function';
import 'core-js/es6/number';
import 'core-js/es6/promise';
// import 'core-js/fn/promise';
//import 'core-js/es6/math';
import 'core-js/es6/string';
import 'core-js/es6/date';
import 'core-js/es6/array';
import 'core-js/es6/map';
import 'core-js/es6/set';
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
