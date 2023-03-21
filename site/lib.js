var onboarding;
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 553:
/***/ ((module) => {

(function(){
"use strict";
var doc = document;
var win = window;
var docEle = doc.documentElement;
var createElement = doc.createElement.bind(doc);
var div = createElement('div');
var table = createElement('table');
var tbody = createElement('tbody');
var tr = createElement('tr');
var isArray = Array.isArray, ArrayPrototype = Array.prototype;
var concat = ArrayPrototype.concat, filter = ArrayPrototype.filter, indexOf = ArrayPrototype.indexOf, map = ArrayPrototype.map, push = ArrayPrototype.push, slice = ArrayPrototype.slice, some = ArrayPrototype.some, splice = ArrayPrototype.splice;
var idRe = /^#(?:[\w-]|\\.|[^\x00-\xa0])*$/;
var classRe = /^\.(?:[\w-]|\\.|[^\x00-\xa0])*$/;
var htmlRe = /<.+>/;
var tagRe = /^\w+$/;
// @require ./variables.ts
function find(selector, context) {
    var isFragment = isDocumentFragment(context);
    return !selector || (!isFragment && !isDocument(context) && !isElement(context))
        ? []
        : !isFragment && classRe.test(selector)
            ? context.getElementsByClassName(selector.slice(1).replace(/\\/g, ''))
            : !isFragment && tagRe.test(selector)
                ? context.getElementsByTagName(selector)
                : context.querySelectorAll(selector);
}
// @require ./find.ts
// @require ./variables.ts
var Cash = /** @class */ (function () {
    function Cash(selector, context) {
        if (!selector)
            return;
        if (isCash(selector))
            return selector;
        var eles = selector;
        if (isString(selector)) {
            var ctx = (isCash(context) ? context[0] : context) || doc;
            eles = idRe.test(selector) && 'getElementById' in ctx
                ? ctx.getElementById(selector.slice(1).replace(/\\/g, ''))
                : htmlRe.test(selector)
                    ? parseHTML(selector)
                    : find(selector, ctx);
            if (!eles)
                return;
        }
        else if (isFunction(selector)) {
            return this.ready(selector); //FIXME: `fn.ready` is not included in `core`, but it's actually a core functionality
        }
        if (eles.nodeType || eles === win)
            eles = [eles];
        this.length = eles.length;
        for (var i = 0, l = this.length; i < l; i++) {
            this[i] = eles[i];
        }
    }
    Cash.prototype.init = function (selector, context) {
        return new Cash(selector, context);
    };
    return Cash;
}());
var fn = Cash.prototype;
var cash = fn.init;
cash.fn = cash.prototype = fn; // Ensuring that `cash () instanceof cash`
fn.length = 0;
fn.splice = splice; // Ensuring a cash collection gets printed as array-like in Chrome's devtools
if (typeof Symbol === 'function') { // Ensuring a cash collection is iterable
    fn[Symbol['iterator']] = ArrayPrototype[Symbol['iterator']];
}
function isCash(value) {
    return value instanceof Cash;
}
function isWindow(value) {
    return !!value && value === value.window;
}
function isDocument(value) {
    return !!value && value.nodeType === 9;
}
function isDocumentFragment(value) {
    return !!value && value.nodeType === 11;
}
function isElement(value) {
    return !!value && value.nodeType === 1;
}
function isText(value) {
    return !!value && value.nodeType === 3;
}
function isBoolean(value) {
    return typeof value === 'boolean';
}
function isFunction(value) {
    return typeof value === 'function';
}
function isString(value) {
    return typeof value === 'string';
}
function isUndefined(value) {
    return value === undefined;
}
function isNull(value) {
    return value === null;
}
function isNumeric(value) {
    return !isNaN(parseFloat(value)) && isFinite(value);
}
function isPlainObject(value) {
    if (typeof value !== 'object' || value === null)
        return false;
    var proto = Object.getPrototypeOf(value);
    return proto === null || proto === Object.prototype;
}
cash.isWindow = isWindow;
cash.isFunction = isFunction;
cash.isArray = isArray;
cash.isNumeric = isNumeric;
cash.isPlainObject = isPlainObject;
function each(arr, callback, _reverse) {
    if (_reverse) {
        var i = arr.length;
        while (i--) {
            if (callback.call(arr[i], i, arr[i]) === false)
                return arr;
        }
    }
    else if (isPlainObject(arr)) {
        var keys = Object.keys(arr);
        for (var i = 0, l = keys.length; i < l; i++) {
            var key = keys[i];
            if (callback.call(arr[key], key, arr[key]) === false)
                return arr;
        }
    }
    else {
        for (var i = 0, l = arr.length; i < l; i++) {
            if (callback.call(arr[i], i, arr[i]) === false)
                return arr;
        }
    }
    return arr;
}
cash.each = each;
fn.each = function (callback) {
    return each(this, callback);
};
fn.empty = function () {
    return this.each(function (i, ele) {
        while (ele.firstChild) {
            ele.removeChild(ele.firstChild);
        }
    });
};
function extend() {
    var sources = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        sources[_i] = arguments[_i];
    }
    var deep = isBoolean(sources[0]) ? sources.shift() : false;
    var target = sources.shift();
    var length = sources.length;
    if (!target)
        return {};
    if (!length)
        return extend(deep, cash, target);
    for (var i = 0; i < length; i++) {
        var source = sources[i];
        for (var key in source) {
            if (deep && (isArray(source[key]) || isPlainObject(source[key]))) {
                if (!target[key] || target[key].constructor !== source[key].constructor)
                    target[key] = new source[key].constructor();
                extend(deep, target[key], source[key]);
            }
            else {
                target[key] = source[key];
            }
        }
    }
    return target;
}
cash.extend = extend;
fn.extend = function (plugins) {
    return extend(fn, plugins);
};
// @require ./type_checking.ts
var splitValuesRe = /\S+/g;
function getSplitValues(str) {
    return isString(str) ? str.match(splitValuesRe) || [] : [];
}
fn.toggleClass = function (cls, force) {
    var classes = getSplitValues(cls);
    var isForce = !isUndefined(force);
    return this.each(function (i, ele) {
        if (!isElement(ele))
            return;
        each(classes, function (i, c) {
            if (isForce) {
                force ? ele.classList.add(c) : ele.classList.remove(c);
            }
            else {
                ele.classList.toggle(c);
            }
        });
    });
};
fn.addClass = function (cls) {
    return this.toggleClass(cls, true);
};
fn.removeAttr = function (attr) {
    var attrs = getSplitValues(attr);
    return this.each(function (i, ele) {
        if (!isElement(ele))
            return;
        each(attrs, function (i, a) {
            ele.removeAttribute(a);
        });
    });
};
function attr(attr, value) {
    if (!attr)
        return;
    if (isString(attr)) {
        if (arguments.length < 2) {
            if (!this[0] || !isElement(this[0]))
                return;
            var value_1 = this[0].getAttribute(attr);
            return isNull(value_1) ? undefined : value_1;
        }
        if (isUndefined(value))
            return this;
        if (isNull(value))
            return this.removeAttr(attr);
        return this.each(function (i, ele) {
            if (!isElement(ele))
                return;
            ele.setAttribute(attr, value);
        });
    }
    for (var key in attr) {
        this.attr(key, attr[key]);
    }
    return this;
}
fn.attr = attr;
fn.removeClass = function (cls) {
    if (arguments.length)
        return this.toggleClass(cls, false);
    return this.attr('class', '');
};
fn.hasClass = function (cls) {
    return !!cls && some.call(this, function (ele) { return isElement(ele) && ele.classList.contains(cls); });
};
fn.get = function (index) {
    if (isUndefined(index))
        return slice.call(this);
    index = Number(index);
    return this[index < 0 ? index + this.length : index];
};
fn.eq = function (index) {
    return cash(this.get(index));
};
fn.first = function () {
    return this.eq(0);
};
fn.last = function () {
    return this.eq(-1);
};
function text(text) {
    if (isUndefined(text)) {
        return this.get().map(function (ele) { return isElement(ele) || isText(ele) ? ele.textContent : ''; }).join('');
    }
    return this.each(function (i, ele) {
        if (!isElement(ele))
            return;
        ele.textContent = text;
    });
}
fn.text = text;
// @require core/type_checking.ts
// @require core/variables.ts
function computeStyle(ele, prop, isVariable) {
    if (!isElement(ele))
        return;
    var style = win.getComputedStyle(ele, null);
    return isVariable ? style.getPropertyValue(prop) || undefined : style[prop] || ele.style[prop];
}
// @require ./compute_style.ts
function computeStyleInt(ele, prop) {
    return parseInt(computeStyle(ele, prop), 10) || 0;
}
// @require css/helpers/compute_style_int.ts
function getExtraSpace(ele, xAxis) {
    return computeStyleInt(ele, "border".concat(xAxis ? 'Left' : 'Top', "Width")) + computeStyleInt(ele, "padding".concat(xAxis ? 'Left' : 'Top')) + computeStyleInt(ele, "padding".concat(xAxis ? 'Right' : 'Bottom')) + computeStyleInt(ele, "border".concat(xAxis ? 'Right' : 'Bottom', "Width"));
}
// @require css/helpers/compute_style.ts
var defaultDisplay = {};
function getDefaultDisplay(tagName) {
    if (defaultDisplay[tagName])
        return defaultDisplay[tagName];
    var ele = createElement(tagName);
    doc.body.insertBefore(ele, null);
    var display = computeStyle(ele, 'display');
    doc.body.removeChild(ele);
    return defaultDisplay[tagName] = display !== 'none' ? display : 'block';
}
// @require css/helpers/compute_style.ts
function isHidden(ele) {
    return computeStyle(ele, 'display') === 'none';
}
// @require ./cash.ts
function matches(ele, selector) {
    var matches = ele && (ele['matches'] || ele['webkitMatchesSelector'] || ele['msMatchesSelector']);
    return !!matches && !!selector && matches.call(ele, selector);
}
// @require ./matches.ts
// @require ./type_checking.ts
function getCompareFunction(comparator) {
    return isString(comparator)
        ? function (i, ele) { return matches(ele, comparator); }
        : isFunction(comparator)
            ? comparator
            : isCash(comparator)
                ? function (i, ele) { return comparator.is(ele); }
                : !comparator
                    ? function () { return false; }
                    : function (i, ele) { return ele === comparator; };
}
fn.filter = function (comparator) {
    var compare = getCompareFunction(comparator);
    return cash(filter.call(this, function (ele, i) { return compare.call(ele, i, ele); }));
};
// @require collection/filter.ts
function filtered(collection, comparator) {
    return !comparator ? collection : collection.filter(comparator);
}
fn.detach = function (comparator) {
    filtered(this, comparator).each(function (i, ele) {
        if (ele.parentNode) {
            ele.parentNode.removeChild(ele);
        }
    });
    return this;
};
var fragmentRe = /^\s*<(\w+)[^>]*>/;
var singleTagRe = /^<(\w+)\s*\/?>(?:<\/\1>)?$/;
var containers = {
    '*': div,
    tr: tbody,
    td: tr,
    th: tr,
    thead: table,
    tbody: table,
    tfoot: table
};
//TODO: Create elements inside a document fragment, in order to prevent inline event handlers from firing
//TODO: Ensure the created elements have the fragment as their parent instead of null, this also ensures we can deal with detatched nodes more reliably
function parseHTML(html) {
    if (!isString(html))
        return [];
    if (singleTagRe.test(html))
        return [createElement(RegExp.$1)];
    var fragment = fragmentRe.test(html) && RegExp.$1;
    var container = containers[fragment] || containers['*'];
    container.innerHTML = html;
    return cash(container.childNodes).detach().get();
}
cash.parseHTML = parseHTML;
fn.has = function (selector) {
    var comparator = isString(selector)
        ? function (i, ele) { return find(selector, ele).length; }
        : function (i, ele) { return ele.contains(selector); };
    return this.filter(comparator);
};
fn.not = function (comparator) {
    var compare = getCompareFunction(comparator);
    return this.filter(function (i, ele) { return (!isString(comparator) || isElement(ele)) && !compare.call(ele, i, ele); });
};
function pluck(arr, prop, deep, until) {
    var plucked = [];
    var isCallback = isFunction(prop);
    var compare = until && getCompareFunction(until);
    for (var i = 0, l = arr.length; i < l; i++) {
        if (isCallback) {
            var val_1 = prop(arr[i]);
            if (val_1.length)
                push.apply(plucked, val_1);
        }
        else {
            var val_2 = arr[i][prop];
            while (val_2 != null) {
                if (until && compare(-1, val_2))
                    break;
                plucked.push(val_2);
                val_2 = deep ? val_2[prop] : null;
            }
        }
    }
    return plucked;
}
// @require core/pluck.ts
// @require core/variables.ts
function getValue(ele) {
    if (ele.multiple && ele.options)
        return pluck(filter.call(ele.options, function (option) { return option.selected && !option.disabled && !option.parentNode.disabled; }), 'value');
    return ele.value || '';
}
function val(value) {
    if (!arguments.length)
        return this[0] && getValue(this[0]);
    return this.each(function (i, ele) {
        var isSelect = ele.multiple && ele.options;
        if (isSelect || checkableRe.test(ele.type)) {
            var eleValue_1 = isArray(value) ? map.call(value, String) : (isNull(value) ? [] : [String(value)]);
            if (isSelect) {
                each(ele.options, function (i, option) {
                    option.selected = eleValue_1.indexOf(option.value) >= 0;
                }, true);
            }
            else {
                ele.checked = eleValue_1.indexOf(ele.value) >= 0;
            }
        }
        else {
            ele.value = isUndefined(value) || isNull(value) ? '' : value;
        }
    });
}
fn.val = val;
fn.is = function (comparator) {
    var compare = getCompareFunction(comparator);
    return some.call(this, function (ele, i) { return compare.call(ele, i, ele); });
};
cash.guid = 1;
function unique(arr) {
    return arr.length > 1 ? filter.call(arr, function (item, index, self) { return indexOf.call(self, item) === index; }) : arr;
}
cash.unique = unique;
fn.add = function (selector, context) {
    return cash(unique(this.get().concat(cash(selector, context).get())));
};
fn.children = function (comparator) {
    return filtered(cash(unique(pluck(this, function (ele) { return ele.children; }))), comparator);
};
fn.parent = function (comparator) {
    return filtered(cash(unique(pluck(this, 'parentNode'))), comparator);
};
fn.index = function (selector) {
    var child = selector ? cash(selector)[0] : this[0];
    var collection = selector ? this : cash(child).parent().children();
    return indexOf.call(collection, child);
};
fn.closest = function (comparator) {
    var filtered = this.filter(comparator);
    if (filtered.length)
        return filtered;
    var $parent = this.parent();
    if (!$parent.length)
        return filtered;
    return $parent.closest(comparator);
};
fn.siblings = function (comparator) {
    return filtered(cash(unique(pluck(this, function (ele) { return cash(ele).parent().children().not(ele); }))), comparator);
};
fn.find = function (selector) {
    return cash(unique(pluck(this, function (ele) { return find(selector, ele); })));
};
// @require core/variables.ts
// @require collection/filter.ts
// @require traversal/find.ts
var HTMLCDATARe = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
var scriptTypeRe = /^$|^module$|\/(java|ecma)script/i;
var scriptAttributes = ['type', 'src', 'nonce', 'noModule'];
function evalScripts(node, doc) {
    var collection = cash(node);
    collection.filter('script').add(collection.find('script')).each(function (i, ele) {
        if (scriptTypeRe.test(ele.type) && docEle.contains(ele)) { // The script type is supported // The element is attached to the DOM // Using `documentElement` for broader browser support
            var script_1 = createElement('script');
            script_1.text = ele.textContent.replace(HTMLCDATARe, '');
            each(scriptAttributes, function (i, attr) {
                if (ele[attr])
                    script_1[attr] = ele[attr];
            });
            doc.head.insertBefore(script_1, null);
            doc.head.removeChild(script_1);
        }
    });
}
// @require ./eval_scripts.ts
function insertElement(anchor, target, left, inside, evaluate) {
    if (inside) { // prepend/append
        anchor.insertBefore(target, left ? anchor.firstChild : null);
    }
    else { // before/after
        if (anchor.nodeName === 'HTML') {
            anchor.parentNode.replaceChild(target, anchor);
        }
        else {
            anchor.parentNode.insertBefore(target, left ? anchor : anchor.nextSibling);
        }
    }
    if (evaluate) {
        evalScripts(target, anchor.ownerDocument);
    }
}
// @require ./insert_element.ts
function insertSelectors(selectors, anchors, inverse, left, inside, reverseLoop1, reverseLoop2, reverseLoop3) {
    each(selectors, function (si, selector) {
        each(cash(selector), function (ti, target) {
            each(cash(anchors), function (ai, anchor) {
                var anchorFinal = inverse ? target : anchor;
                var targetFinal = inverse ? anchor : target;
                var indexFinal = inverse ? ti : ai;
                insertElement(anchorFinal, !indexFinal ? targetFinal : targetFinal.cloneNode(true), left, inside, !indexFinal);
            }, reverseLoop3);
        }, reverseLoop2);
    }, reverseLoop1);
    return anchors;
}
fn.after = function () {
    return insertSelectors(arguments, this, false, false, false, true, true);
};
fn.append = function () {
    return insertSelectors(arguments, this, false, false, true);
};
function html(html) {
    if (!arguments.length)
        return this[0] && this[0].innerHTML;
    if (isUndefined(html))
        return this;
    var hasScript = /<script[\s>]/.test(html);
    return this.each(function (i, ele) {
        if (!isElement(ele))
            return;
        if (hasScript) {
            cash(ele).empty().append(html);
        }
        else {
            ele.innerHTML = html;
        }
    });
}
fn.html = html;
fn.appendTo = function (selector) {
    return insertSelectors(arguments, this, true, false, true);
};
fn.wrapInner = function (selector) {
    return this.each(function (i, ele) {
        var $ele = cash(ele);
        var contents = $ele.contents();
        contents.length ? contents.wrapAll(selector) : $ele.append(selector);
    });
};
fn.before = function () {
    return insertSelectors(arguments, this, false, true);
};
fn.wrapAll = function (selector) {
    var structure = cash(selector);
    var wrapper = structure[0];
    while (wrapper.children.length)
        wrapper = wrapper.firstElementChild;
    this.first().before(structure);
    return this.appendTo(wrapper);
};
fn.wrap = function (selector) {
    return this.each(function (i, ele) {
        var wrapper = cash(selector)[0];
        cash(ele).wrapAll(!i ? wrapper : wrapper.cloneNode(true));
    });
};
fn.insertAfter = function (selector) {
    return insertSelectors(arguments, this, true, false, false, false, false, true);
};
fn.insertBefore = function (selector) {
    return insertSelectors(arguments, this, true, true);
};
fn.prepend = function () {
    return insertSelectors(arguments, this, false, true, true, true, true);
};
fn.prependTo = function (selector) {
    return insertSelectors(arguments, this, true, true, true, false, false, true);
};
fn.contents = function () {
    return cash(unique(pluck(this, function (ele) { return ele.tagName === 'IFRAME' ? [ele.contentDocument] : (ele.tagName === 'TEMPLATE' ? ele.content.childNodes : ele.childNodes); })));
};
fn.next = function (comparator, _all, _until) {
    return filtered(cash(unique(pluck(this, 'nextElementSibling', _all, _until))), comparator);
};
fn.nextAll = function (comparator) {
    return this.next(comparator, true);
};
fn.nextUntil = function (until, comparator) {
    return this.next(comparator, true, until);
};
fn.parents = function (comparator, _until) {
    return filtered(cash(unique(pluck(this, 'parentElement', true, _until))), comparator);
};
fn.parentsUntil = function (until, comparator) {
    return this.parents(comparator, until);
};
fn.prev = function (comparator, _all, _until) {
    return filtered(cash(unique(pluck(this, 'previousElementSibling', _all, _until))), comparator);
};
fn.prevAll = function (comparator) {
    return this.prev(comparator, true);
};
fn.prevUntil = function (until, comparator) {
    return this.prev(comparator, true, until);
};
fn.map = function (callback) {
    return cash(concat.apply([], map.call(this, function (ele, i) { return callback.call(ele, i, ele); })));
};
fn.clone = function () {
    return this.map(function (i, ele) { return ele.cloneNode(true); });
};
fn.offsetParent = function () {
    return this.map(function (i, ele) {
        var offsetParent = ele.offsetParent;
        while (offsetParent && computeStyle(offsetParent, 'position') === 'static') {
            offsetParent = offsetParent.offsetParent;
        }
        return offsetParent || docEle;
    });
};
fn.slice = function (start, end) {
    return cash(slice.call(this, start, end));
};
// @require ./cash.ts
var dashAlphaRe = /-([a-z])/g;
function camelCase(str) {
    return str.replace(dashAlphaRe, function (match, letter) { return letter.toUpperCase(); });
}
fn.ready = function (callback) {
    var cb = function () { return setTimeout(callback, 0, cash); };
    if (doc.readyState !== 'loading') {
        cb();
    }
    else {
        doc.addEventListener('DOMContentLoaded', cb);
    }
    return this;
};
fn.unwrap = function () {
    this.parent().each(function (i, ele) {
        if (ele.tagName === 'BODY')
            return;
        var $ele = cash(ele);
        $ele.replaceWith($ele.children());
    });
    return this;
};
fn.offset = function () {
    var ele = this[0];
    if (!ele)
        return;
    var rect = ele.getBoundingClientRect();
    return {
        top: rect.top + win.pageYOffset,
        left: rect.left + win.pageXOffset
    };
};
fn.position = function () {
    var ele = this[0];
    if (!ele)
        return;
    var isFixed = (computeStyle(ele, 'position') === 'fixed');
    var offset = isFixed ? ele.getBoundingClientRect() : this.offset();
    if (!isFixed) {
        var doc_1 = ele.ownerDocument;
        var offsetParent = ele.offsetParent || doc_1.documentElement;
        while ((offsetParent === doc_1.body || offsetParent === doc_1.documentElement) && computeStyle(offsetParent, 'position') === 'static') {
            offsetParent = offsetParent.parentNode;
        }
        if (offsetParent !== ele && isElement(offsetParent)) {
            var parentOffset = cash(offsetParent).offset();
            offset.top -= parentOffset.top + computeStyleInt(offsetParent, 'borderTopWidth');
            offset.left -= parentOffset.left + computeStyleInt(offsetParent, 'borderLeftWidth');
        }
    }
    return {
        top: offset.top - computeStyleInt(ele, 'marginTop'),
        left: offset.left - computeStyleInt(ele, 'marginLeft')
    };
};
var propMap = {
    /* GENERAL */
    class: 'className',
    contenteditable: 'contentEditable',
    /* LABEL */
    for: 'htmlFor',
    /* INPUT */
    readonly: 'readOnly',
    maxlength: 'maxLength',
    tabindex: 'tabIndex',
    /* TABLE */
    colspan: 'colSpan',
    rowspan: 'rowSpan',
    /* IMAGE */
    usemap: 'useMap'
};
fn.prop = function (prop, value) {
    if (!prop)
        return;
    if (isString(prop)) {
        prop = propMap[prop] || prop;
        if (arguments.length < 2)
            return this[0] && this[0][prop];
        return this.each(function (i, ele) { ele[prop] = value; });
    }
    for (var key in prop) {
        this.prop(key, prop[key]);
    }
    return this;
};
fn.removeProp = function (prop) {
    return this.each(function (i, ele) { delete ele[propMap[prop] || prop]; });
};
var cssVariableRe = /^--/;
// @require ./variables.ts
function isCSSVariable(prop) {
    return cssVariableRe.test(prop);
}
// @require core/camel_case.ts
// @require core/cash.ts
// @require core/each.ts
// @require core/variables.ts
// @require ./is_css_variable.ts
var prefixedProps = {};
var style = div.style;
var vendorsPrefixes = ['webkit', 'moz', 'ms'];
function getPrefixedProp(prop, isVariable) {
    if (isVariable === void 0) { isVariable = isCSSVariable(prop); }
    if (isVariable)
        return prop;
    if (!prefixedProps[prop]) {
        var propCC = camelCase(prop);
        var propUC = "".concat(propCC[0].toUpperCase()).concat(propCC.slice(1));
        var props = ("".concat(propCC, " ").concat(vendorsPrefixes.join("".concat(propUC, " "))).concat(propUC)).split(' ');
        each(props, function (i, p) {
            if (p in style) {
                prefixedProps[prop] = p;
                return false;
            }
        });
    }
    return prefixedProps[prop];
}
// @require core/type_checking.ts
// @require ./is_css_variable.ts
var numericProps = {
    animationIterationCount: true,
    columnCount: true,
    flexGrow: true,
    flexShrink: true,
    fontWeight: true,
    gridArea: true,
    gridColumn: true,
    gridColumnEnd: true,
    gridColumnStart: true,
    gridRow: true,
    gridRowEnd: true,
    gridRowStart: true,
    lineHeight: true,
    opacity: true,
    order: true,
    orphans: true,
    widows: true,
    zIndex: true
};
function getSuffixedValue(prop, value, isVariable) {
    if (isVariable === void 0) { isVariable = isCSSVariable(prop); }
    return !isVariable && !numericProps[prop] && isNumeric(value) ? "".concat(value, "px") : value;
}
function css(prop, value) {
    if (isString(prop)) {
        var isVariable_1 = isCSSVariable(prop);
        prop = getPrefixedProp(prop, isVariable_1);
        if (arguments.length < 2)
            return this[0] && computeStyle(this[0], prop, isVariable_1);
        if (!prop)
            return this;
        value = getSuffixedValue(prop, value, isVariable_1);
        return this.each(function (i, ele) {
            if (!isElement(ele))
                return;
            if (isVariable_1) {
                ele.style.setProperty(prop, value);
            }
            else {
                ele.style[prop] = value;
            }
        });
    }
    for (var key in prop) {
        this.css(key, prop[key]);
    }
    return this;
}
;
fn.css = css;
function attempt(fn, arg) {
    try {
        return fn(arg);
    }
    catch (_a) {
        return arg;
    }
}
// @require core/attempt.ts
// @require core/camel_case.ts
var JSONStringRe = /^\s+|\s+$/;
function getData(ele, key) {
    var value = ele.dataset[key] || ele.dataset[camelCase(key)];
    if (JSONStringRe.test(value))
        return value;
    return attempt(JSON.parse, value);
}
// @require core/attempt.ts
// @require core/camel_case.ts
function setData(ele, key, value) {
    value = attempt(JSON.stringify, value);
    ele.dataset[camelCase(key)] = value;
}
function data(name, value) {
    if (!name) {
        if (!this[0])
            return;
        var datas = {};
        for (var key in this[0].dataset) {
            datas[key] = getData(this[0], key);
        }
        return datas;
    }
    if (isString(name)) {
        if (arguments.length < 2)
            return this[0] && getData(this[0], name);
        if (isUndefined(value))
            return this;
        return this.each(function (i, ele) { setData(ele, name, value); });
    }
    for (var key in name) {
        this.data(key, name[key]);
    }
    return this;
}
fn.data = data;
function getDocumentDimension(doc, dimension) {
    var docEle = doc.documentElement;
    return Math.max(doc.body["scroll".concat(dimension)], docEle["scroll".concat(dimension)], doc.body["offset".concat(dimension)], docEle["offset".concat(dimension)], docEle["client".concat(dimension)]);
}
each([true, false], function (i, outer) {
    each(['Width', 'Height'], function (i, prop) {
        var name = "".concat(outer ? 'outer' : 'inner').concat(prop);
        fn[name] = function (includeMargins) {
            if (!this[0])
                return;
            if (isWindow(this[0]))
                return outer ? this[0]["inner".concat(prop)] : this[0].document.documentElement["client".concat(prop)];
            if (isDocument(this[0]))
                return getDocumentDimension(this[0], prop);
            return this[0]["".concat(outer ? 'offset' : 'client').concat(prop)] + (includeMargins && outer ? computeStyleInt(this[0], "margin".concat(i ? 'Top' : 'Left')) + computeStyleInt(this[0], "margin".concat(i ? 'Bottom' : 'Right')) : 0);
        };
    });
});
each(['Width', 'Height'], function (index, prop) {
    var propLC = prop.toLowerCase();
    fn[propLC] = function (value) {
        if (!this[0])
            return isUndefined(value) ? undefined : this;
        if (!arguments.length) {
            if (isWindow(this[0]))
                return this[0].document.documentElement["client".concat(prop)];
            if (isDocument(this[0]))
                return getDocumentDimension(this[0], prop);
            return this[0].getBoundingClientRect()[propLC] - getExtraSpace(this[0], !index);
        }
        var valueNumber = parseInt(value, 10);
        return this.each(function (i, ele) {
            if (!isElement(ele))
                return;
            var boxSizing = computeStyle(ele, 'boxSizing');
            ele.style[propLC] = getSuffixedValue(propLC, valueNumber + (boxSizing === 'border-box' ? getExtraSpace(ele, !index) : 0));
        });
    };
});
var displayProperty = '___cd';
fn.toggle = function (force) {
    return this.each(function (i, ele) {
        if (!isElement(ele))
            return;
        var show = isUndefined(force) ? isHidden(ele) : force;
        if (show) {
            ele.style.display = ele[displayProperty] || '';
            if (isHidden(ele)) {
                ele.style.display = getDefaultDisplay(ele.tagName);
            }
        }
        else {
            ele[displayProperty] = computeStyle(ele, 'display');
            ele.style.display = 'none';
        }
    });
};
fn.hide = function () {
    return this.toggle(false);
};
fn.show = function () {
    return this.toggle(true);
};
var eventsNamespace = '___ce';
var eventsNamespacesSeparator = '.';
var eventsFocus = { focus: 'focusin', blur: 'focusout' };
var eventsHover = { mouseenter: 'mouseover', mouseleave: 'mouseout' };
var eventsMouseRe = /^(mouse|pointer|contextmenu|drag|drop|click|dblclick)/i;
// @require ./variables.ts
function getEventNameBubbling(name) {
    return eventsHover[name] || eventsFocus[name] || name;
}
// @require ./variables.ts
function parseEventName(eventName) {
    var parts = eventName.split(eventsNamespacesSeparator);
    return [parts[0], parts.slice(1).sort()]; // [name, namespace[]]
}
fn.trigger = function (event, data) {
    if (isString(event)) {
        var _a = parseEventName(event), nameOriginal = _a[0], namespaces = _a[1];
        var name_1 = getEventNameBubbling(nameOriginal);
        if (!name_1)
            return this;
        var type = eventsMouseRe.test(name_1) ? 'MouseEvents' : 'HTMLEvents';
        event = doc.createEvent(type);
        event.initEvent(name_1, true, true);
        event.namespace = namespaces.join(eventsNamespacesSeparator);
        event.___ot = nameOriginal;
    }
    event.___td = data;
    var isEventFocus = (event.___ot in eventsFocus);
    return this.each(function (i, ele) {
        if (isEventFocus && isFunction(ele[event.___ot])) {
            ele["___i".concat(event.type)] = true; // Ensuring the native event is ignored
            ele[event.___ot]();
            ele["___i".concat(event.type)] = false; // Ensuring the custom event is not ignored
        }
        ele.dispatchEvent(event);
    });
};
// @require ./variables.ts
function getEventsCache(ele) {
    return ele[eventsNamespace] = (ele[eventsNamespace] || {});
}
// @require core/guid.ts
// @require events/helpers/get_events_cache.ts
function addEvent(ele, name, namespaces, selector, callback) {
    var eventCache = getEventsCache(ele);
    eventCache[name] = (eventCache[name] || []);
    eventCache[name].push([namespaces, selector, callback]);
    ele.addEventListener(name, callback);
}
function hasNamespaces(ns1, ns2) {
    return !ns2 || !some.call(ns2, function (ns) { return ns1.indexOf(ns) < 0; });
}
// @require ./get_events_cache.ts
// @require ./has_namespaces.ts
// @require ./parse_event_name.ts
function removeEvent(ele, name, namespaces, selector, callback) {
    var cache = getEventsCache(ele);
    if (!name) {
        for (name in cache) {
            removeEvent(ele, name, namespaces, selector, callback);
        }
    }
    else if (cache[name]) {
        cache[name] = cache[name].filter(function (_a) {
            var ns = _a[0], sel = _a[1], cb = _a[2];
            if ((callback && cb.guid !== callback.guid) || !hasNamespaces(ns, namespaces) || (selector && selector !== sel))
                return true;
            ele.removeEventListener(name, cb);
        });
    }
}
fn.off = function (eventFullName, selector, callback) {
    var _this = this;
    if (isUndefined(eventFullName)) {
        this.each(function (i, ele) {
            if (!isElement(ele) && !isDocument(ele) && !isWindow(ele))
                return;
            removeEvent(ele);
        });
    }
    else if (!isString(eventFullName)) {
        for (var key in eventFullName) {
            this.off(key, eventFullName[key]);
        }
    }
    else {
        if (isFunction(selector)) {
            callback = selector;
            selector = '';
        }
        each(getSplitValues(eventFullName), function (i, eventFullName) {
            var _a = parseEventName(eventFullName), nameOriginal = _a[0], namespaces = _a[1];
            var name = getEventNameBubbling(nameOriginal);
            _this.each(function (i, ele) {
                if (!isElement(ele) && !isDocument(ele) && !isWindow(ele))
                    return;
                removeEvent(ele, name, namespaces, selector, callback);
            });
        });
    }
    return this;
};
fn.remove = function (comparator) {
    filtered(this, comparator).detach().off();
    return this;
};
fn.replaceWith = function (selector) {
    return this.before(selector).remove();
};
fn.replaceAll = function (selector) {
    cash(selector).replaceWith(this);
    return this;
};
function on(eventFullName, selector, data, callback, _one) {
    var _this = this;
    if (!isString(eventFullName)) {
        for (var key in eventFullName) {
            this.on(key, selector, data, eventFullName[key], _one);
        }
        return this;
    }
    if (!isString(selector)) {
        if (isUndefined(selector) || isNull(selector)) {
            selector = '';
        }
        else if (isUndefined(data)) {
            data = selector;
            selector = '';
        }
        else {
            callback = data;
            data = selector;
            selector = '';
        }
    }
    if (!isFunction(callback)) {
        callback = data;
        data = undefined;
    }
    if (!callback)
        return this;
    each(getSplitValues(eventFullName), function (i, eventFullName) {
        var _a = parseEventName(eventFullName), nameOriginal = _a[0], namespaces = _a[1];
        var name = getEventNameBubbling(nameOriginal);
        var isEventHover = (nameOriginal in eventsHover);
        var isEventFocus = (nameOriginal in eventsFocus);
        if (!name)
            return;
        _this.each(function (i, ele) {
            if (!isElement(ele) && !isDocument(ele) && !isWindow(ele))
                return;
            var finalCallback = function (event) {
                if (event.target["___i".concat(event.type)])
                    return event.stopImmediatePropagation(); // Ignoring native event in favor of the upcoming custom one
                if (event.namespace && !hasNamespaces(namespaces, event.namespace.split(eventsNamespacesSeparator)))
                    return;
                if (!selector && ((isEventFocus && (event.target !== ele || event.___ot === name)) || (isEventHover && event.relatedTarget && ele.contains(event.relatedTarget))))
                    return;
                var thisArg = ele;
                if (selector) {
                    var target = event.target;
                    while (!matches(target, selector)) {
                        if (target === ele)
                            return;
                        target = target.parentNode;
                        if (!target)
                            return;
                    }
                    thisArg = target;
                }
                Object.defineProperty(event, 'currentTarget', {
                    configurable: true,
                    get: function () {
                        return thisArg;
                    }
                });
                Object.defineProperty(event, 'delegateTarget', {
                    configurable: true,
                    get: function () {
                        return ele;
                    }
                });
                Object.defineProperty(event, 'data', {
                    configurable: true,
                    get: function () {
                        return data;
                    }
                });
                var returnValue = callback.call(thisArg, event, event.___td);
                if (_one) {
                    removeEvent(ele, name, namespaces, selector, finalCallback);
                }
                if (returnValue === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
            };
            finalCallback.guid = callback.guid = (callback.guid || cash.guid++);
            addEvent(ele, name, namespaces, selector, finalCallback);
        });
    });
    return this;
}
fn.on = on;
function one(eventFullName, selector, data, callback) {
    return this.on(eventFullName, selector, data, callback, true);
}
;
fn.one = one;
var queryEncodeCRLFRe = /\r?\n/g;
function queryEncode(prop, value) {
    return "&".concat(encodeURIComponent(prop), "=").concat(encodeURIComponent(value.replace(queryEncodeCRLFRe, '\r\n')));
}
var skippableRe = /file|reset|submit|button|image/i;
var checkableRe = /radio|checkbox/i;
fn.serialize = function () {
    var query = '';
    this.each(function (i, ele) {
        each(ele.elements || [ele], function (i, ele) {
            if (ele.disabled || !ele.name || ele.tagName === 'FIELDSET' || skippableRe.test(ele.type) || (checkableRe.test(ele.type) && !ele.checked))
                return;
            var value = getValue(ele);
            if (!isUndefined(value)) {
                var values = isArray(value) ? value : [value];
                each(values, function (i, value) {
                    query += queryEncode(ele.name, value);
                });
            }
        });
    });
    return query.slice(1);
};
// @require core/types.ts
// @require core/cash.ts
// @require core/type_checking.ts
// @require core/variables.ts
// @require core/each.ts
// @require core/extend.ts
// @require core/find.ts
// @require core/get_compare_function.ts
// @require core/get_split_values.ts
// @require core/guid.ts
// @require core/parse_html.ts
// @require core/unique.ts
// @require attributes/add_class.ts
// @require attributes/attr.ts
// @require attributes/has_class.ts
// @require attributes/prop.ts
// @require attributes/remove_attr.ts
// @require attributes/remove_class.ts
// @require attributes/remove_prop.ts
// @require attributes/toggle_class.ts
// @require collection/add.ts
// @require collection/each.ts
// @require collection/eq.ts
// @require collection/filter.ts
// @require collection/first.ts
// @require collection/get.ts
// @require collection/index.ts
// @require collection/last.ts
// @require collection/map.ts
// @require collection/slice.ts
// @require css/css.ts
// @require data/data.ts
// @require dimensions/inner_outer.ts
// @require dimensions/normal.ts
// @require effects/hide.ts
// @require effects/show.ts
// @require effects/toggle.ts
// @require events/off.ts
// @require events/on.ts
// @require events/one.ts
// @require events/ready.ts
// @require events/trigger.ts
// @require forms/serialize.ts
// @require forms/val.ts
// @require manipulation/after.ts
// @require manipulation/append.ts
// @require manipulation/append_to.ts
// @require manipulation/before.ts
// @require manipulation/clone.ts
// @require manipulation/detach.ts
// @require manipulation/empty.ts
// @require manipulation/html.ts
// @require manipulation/insert_after.ts
// @require manipulation/insert_before.ts
// @require manipulation/prepend.ts
// @require manipulation/prepend_to.ts
// @require manipulation/remove.ts
// @require manipulation/replace_all.ts
// @require manipulation/replace_with.ts
// @require manipulation/text.ts
// @require manipulation/unwrap.ts
// @require manipulation/wrap.ts
// @require manipulation/wrap_all.ts
// @require manipulation/wrap_inner.ts
// @require offset/offset.ts
// @require offset/offset_parent.ts
// @require offset/position.ts
// @require traversal/children.ts
// @require traversal/closest.ts
// @require traversal/contents.ts
// @require traversal/find.ts
// @require traversal/has.ts
// @require traversal/is.ts
// @require traversal/next.ts
// @require traversal/next_all.ts
// @require traversal/next_until.ts
// @require traversal/not.ts
// @require traversal/parent.ts
// @require traversal/parents.ts
// @require traversal/parents_until.ts
// @require traversal/prev.ts
// @require traversal/prev_all.ts
// @require traversal/prev_until.ts
// @require traversal/siblings.ts
// @no-require extras/get_script.ts
// @no-require extras/shorthands.ts
// @require methods.ts
if (true) { // Node.js
    module.exports = cash;
}
else {}
})();

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/cash-dom/dist/cash.js
var cash = __webpack_require__(553);
var cash_default = /*#__PURE__*/__webpack_require__.n(cash);
;// CONCATENATED MODULE: ./js/common.js

function common_hideElement(el) {
    $(el).addClass('hidden');
}

function common_showElement(el) {
    $(el).removeClass('hidden');
}

function addPulse(el) { $(el).addClass('animate-pulse'); }
function removePulse(el) { $(el).removeClass('animate-pulse'); }

function common_addInvalid(el) {
    $(el).addClass('is-invalid');
}

function common_removeInvalid(el) {
    $(el).removeClass('is-invalid');
}

function common_removeAllInvalid() {
    $('.is-invalid').each(function (i, el) {
        $(el).removeClass('is-invalid');
    });
}


function common_removeDisabled(el) {
    $(el).prop("disabled", false);
}

function common_showSpinner(el) {
    $(el).prop("disabled", true);
    $(el).addClass('spinner');
}

function common_removeSpinner(el) {
    $(el).prop("disabled", false);
    $(el).removeClass('spinner');
}

function common_removeAllSpinners() {
    $('.spinner').each(function (i, el) {
        $(el).removeClass('spinner');
    });
}

function common_showPulse(el) {
    $(el).addClass('animate-pulse');
}



function common_removeAllPulse() {
    $('.animate-pulse').each(function (i, el) {
        $(el).removeClass('animate-pulse');
    });
}


function common_setReadonly(el) {
    $(el).prop("readonly", true);
}

function common_removeReadonly(el) {
    $(el).prop("readonly", false);
}


;// CONCATENATED MODULE: ./js/onboarding-validate.js

function validateEmail(field) {
    let regex = /^([_\-\.0-9a-zA-Z]+)@([_\-\.0-9a-zA-Z]+)\.([a-zA-Z]){2,7}$/;
    let value = field.value;
    if (regex.test(value)) {
        field.classList.remove("is-invalid");
        return value;
    } else {
        field.classList.add("is-invalid");
    }

    return null;
}
function validateCell(field) {

    let regex = /^((4|(?:9))\d{7})$/;
    let value = field.value;
    field.value = value.trim();
    if (value.indexOf('+47') > -1) {
        value = value.replace('+47', '');
        field.value = value;
    }
    if (regex.test(value)) {
        field.classList.remove("is-invalid");
        return value;
    } else {
        field.classList.add("is-invalid");
    }

    return null;
}
function clearFnr() {
    $("personalNumberEdit").val('');
}

function validateFnrChange(value) {
    let field = document.getElementById("personalNumberEdit");
    return validateFnr(field);
}

function validateFnr(field, value) {

    let regex = /^(\d{11})$/;

    if (!value) {
        value = field.value;
        value = value.trim();
    }

    if (regex.test(value)) {
        field.classList.remove("is-invalid");
        return value;
    } else {
        field.classList.add("is-invalid");
    }

    return null;
}

cash_default()(document).ready(function () {
    // Validate Email
    let lookup = document.forms.lookup;
    //lookup.addEventListener("focusin", () => lookup.classList.add('focused'));
    //lookup.addEventListener("blur", () => lookup.classList.remove('focused'), true);
    const emailField = document.getElementById("onboarding_email");
    if (emailField) {
        emailField.addEventListener("blur", () => {
            let email = emailField.value;
            validateEmail(emailField);
        });
    }

    const cellField = document.getElementById("onboarding_cell");
    if (cellField) {
        cellField.addEventListener("blur", () => {
            let cell = cellField.value;
            validateCell(cellField);
        });
    }

    //step1 cell lookip validation
    cash_default()("#lookup").submit(function (event) {
        event.preventDefault();

        //var test = token;
        let cellField = document.getElementById("onboarding_cell");
        let emailField = document.getElementById("onboarding_email");

        var validCell = validateCell(cellField);
        var validEmail = validateEmail(emailField);

        var valid = validCell && validEmail;
        if (valid)
            OnboardingCell(validCell, validEmail);

        return false;
    });





    //$("#firstNameEdit").blur(function () {
    cash_default()('#firstNameEdit').on('blur', function () {
        clearPnr('firstname', cash_default()("#firstNameEdit").val());
    });

    cash_default()("#lastNameEdit").blur(function () {
        clearPnr('lastname', cash_default()("#lastNameEdit").val());
    });
  
});

// function clearPnr(field, newVal) {
//     //debugger;
//     let obj = getJsonContent();
//     if (obj == null) {
//         return null;
//     }
//     let val = obj.firstName;
//     if (field == 'lastname')
//         val = obj.lastName;
//
//     if (obj.authMethod != "Vipps") {
//         if (val.toLowerCase() != newVal.toLowerCase()) {
//             $("#personalNumberEdit").val('');
//         }
//     }
// }
//
// function validateInitData(cell, email) {
//
//     var validCell = cell.length == 8;
//     var validEmail = validateEmail(email);
//
//     return validEmail && validCell;
// }
//
//
// //Steps
// function validate(type, part) {
//     let obj = getJsonContent();// sessionStorage.getItem('onboardingObj');
//     if (obj == null) {
//         return null;
//     }
//
//     var allValid = true;
//     if (type == "step1") {
//         let cell = $("#onboarding_cell").val();
//         cell = cleanCellNumber(cell);
//
//         var validCell = false;
//         if (cell.length == 8)
//             validCell = true;
//
//         //let email = $("#onboarding_email").val();
//         //var validEmail = validateEmail(email);
//
//         if (validCell && validEmail) {
//             OnboardingCell(cell, email);
//             //gotoStep(2, 'search');
//         }
//     }
//     else if (type == "step2") {
//         //debugger;
//
//         if (obj.authMethod != "Vipps") {
//             var personalNumberEdit = $("#personalNumberEdit").val();
//             var firstNameEdit = $("#firstNameEdit").val();
//             var lastNameEdit = $("#lastNameEdit").val();
//
//             if (obj.firstName != firstNameEdit || obj.lastNameEdit != lastNameEdit) {
//                 obj.firstName = firstNameEdit;
//                 obj.lastName = lastNameEdit;
//                 if (!personalNumberEdit || personalNumberEdit.length != 11) {
//                     addInvalid("#personalNumberEdit");
//                     allValid = false;
//                 }
//                 else if (!personalNumberEdit.startsWith('*')) {
//                     let pnrField = document.getElementById("personalNumberEdit");
//                     var validPnr = validateFnr(pnrField);
//                     if (validPnr)
//                         obj.personalNumber = validPnr;
//                     else
//                         allValid = false;
//                 }
//                 setJsonContent(obj);
//             }
//         }
//
//
//         if (part == "overview") {
//             //debugger;
//             if (obj.deliveries && obj.deliveries.length > 0) {
//                 gotoStep(3);
//             }
//             else {
//                 gotoStep(2, 'manual');
//             }
//         }
//         else {
//
//             if (!obj.cell)
//                 allValid = false;
//
//
//             var validEmail = obj.email;
//             if (!validEmail) {
//                 let emailField = document.getElementById("onboarding_email_edit");
//                 var validEmail = validateEmail(emailField);
//                 if (!validEmail)
//                     allValid = false;
//                 else {
//
//                     obj.email = validEmail;
//                     sessionStorage.setItem('onboardingObj', JSON.stringify(obj));
//                 }
//             }
//
//             $('#step2-edit .required').each(function () {
//                 //debugger;
//                 var el = $(this);
//                 var val = el.val();
//                 if (val) {
//                     removeInvalid(el);
//                 }
//                 else {
//                     addInvalid(el);
//                     allValid = false;
//                 }
//             });
//
//             //debugger;
//             var zip = $("#onboardingZipEdit").val();
//             var validZip = false;
//             if (zip.length == 4) {
//                 var elementPlace = $('#onboardingPlaceEdit').val();
//                 if (elementPlace != 'Ugyldig postnummer') {
//                     validZip = true;
//                 }
//             }
//
//             if (!validZip) {
//                 allValid = false;
//                 InvalidZip();
//             }
//
//             //debugger;
//             if (allValid) {
//                 removeAllInvalid();
//                 if (part == "add") {
//                     AddNewDeliveryV2();
//                 }
//                 else {
//                     CustomerSaleLead(obj.cell, validEmail);
//                     SaveEditDeliveryV2();
//                     gotoStep(2);
//                 }
//             }
//         }
//     }
// }
//
// function validateZip(zip) {
//     if (zip) {
//         if (zip.length == 4) {
//             return OnboardingPlaceFromZipV2(zip);
//         }
//         else if ((zip.length > 4)) {
//             InvalidZip();
//             return false;
//         }
//     }
//     return false;
// }


// Onboarding validate

// function validateEmail(field) {
//     let regex = /^([_-.0-9a-zA-Z]+)@([_-.0-9a-zA-Z]+).([a-zA-Z]){2,7}$/;
//     let value = field.value;
//     if (regex.test(value)) {
//         field.classList.remove("is-invalid");
//         return value;
//     } else {
//         field.classList.add("is-invalid");
//     }
//
//     return null;
// }
// function validateCell(field) {
//
//     let regex = /^((4|(?:9))d{7})$/;
//     let value = field.value;
//     field.value = value.trim();
//     if (value.indexOf('+47') > -1) {
//         value = value.replace('+47', '');
//         field.value = value;
//     }
//     if (regex.test(value)) {
//         field.classList.remove("is-invalid");
//         return value;
//     } else {
//         field.classList.add("is-invalid");
//     }
//
//     return null;
// }



// function validateFnr(field, value) {
//
//     let regex = /^(d{11})$/;
//
//     if (!value) {
//         value = field.value;
//         value = value.trim();
//     }
//
//     if (regex.test(value)) {
//         field.classList.remove("is-invalid");
//         return value;
//     } else {
//         field.classList.add("is-invalid");
//     }
//
//     return null;
// }

document.addEventListener('DOMContentLoaded', function () {
    // Validate Email
    let lookup = document.forms.lookup;
    //lookup.addEventListener("focusin", () => lookup.classList.add('focused'));
    //lookup.addEventListener("blur", () => lookup.classList.remove('focused'), true);
    const emailField = document.getElementById("onboarding_email");
    if (emailField) {
        emailField.addEventListener("blur", () => {
            let email = emailField.value;
            validateEmail(emailField);
        });
    }

    const cellField = document.getElementById("onboarding_cell");
    if (cellField) {
        cellField.addEventListener("blur", () => {
            let cell = cellField.value;
            validateCell(cellField);
        });
    }

    //step1 cell lookip validation
    document.querySelector("#lookup").submit(function (event) {
        event.preventDefault();

        //var test = token;
        let cellField = document.getElementById("onboarding_cell");
        let emailField = document.getElementById("onboarding_email");

        var validCell = validateCell(cellField);
        var validEmail = validateEmail(emailField);

        var valid = validCell && validEmail;
        if (valid)
            OnboardingCell(validCell, validEmail);

        return false;
    });





    //document.querySelector("#firstNameEdit").blur(function () {
    document.querySelector('#firstNameEdit').addEventListener('blur', function () {
        clearPnr('firstname', document.querySelector("#firstNameEdit").value);
    });

    document.querySelector("#lastNameEdit").blur(function () {
        clearPnr('lastname', document.querySelector("#lastNameEdit").value);
    });

});

function clearPnr(field, newVal) {
    //debugger;
    let obj = getJsonContent();
    if (obj == null) {
        return null;
    }
    let val = obj.firstName;
    if (field == 'lastname')
        val = obj.lastName;

    if (obj.authMethod != "Vipps") {
        if (val.toLowerCase() != newVal.toLowerCase()) {
            document.querySelector("#personalNumberEdit").val('');
        }
    }
}

function validateInitData(cell, email) {

    var validCell = cell.length == 8;
    var validEmail = validateEmail(email);

    return validEmail && validCell;
}


//Steps
function validate(type, part) {
    let obj = getJsonContent();// sessionStorage.getItem('onboardingObj');
    if (obj == null) {
        return null;
    }

    var allValid = true;
    if (type == "step1") {
        let cell = document.querySelector("#onboarding_cell").value;
        cell = cleanCellNumber(cell);

        var validCell = false;
        if (cell.length == 8)
            validCell = true;

        //let email = document.querySelector("#onboarding_email").value;
        //var validEmail = validateEmail(email);

        if (validCell && validEmail) {
            OnboardingCell(cell, email);
            //gotoStep(2, 'search');
        }
    }
    else if (type == "step2") {
        //debugger;

        if (obj.authMethod != "Vipps") {
            var personalNumberEdit = document.querySelector("#personalNumberEdit").value;
            var firstNameEdit = document.querySelector("#firstNameEdit").value;
            var lastNameEdit = document.querySelector("#lastNameEdit").value;

            if (obj.firstName != firstNameEdit || obj.lastNameEdit != lastNameEdit) {
                obj.firstName = firstNameEdit;
                obj.lastName = lastNameEdit;
                if (!personalNumberEdit || personalNumberEdit.length != 11) {
                    addInvalid("#personalNumberEdit");
                    allValid = false;
                }
                else if (!personalNumberEdit.startsWith('*')) {
                    let pnrField = document.getElementById("personalNumberEdit");
                    var validPnr = validateFnr(pnrField);
                    if (validPnr)
                        obj.personalNumber = validPnr;
                    else
                        allValid = false;
                }
                setJsonContent(obj);
            }
        }


        if (part == "overview") {
            //debugger;
            if (obj.deliveries && obj.deliveries.length > 0) {
                gotoStep(3);
            }
            else {
                gotoStep(2, 'manual');
            }
        }
        else {

            if (!obj.cell)
                allValid = false;


            var validEmail = obj.email;
            if (!validEmail) {
                let emailField = document.getElementById("onboarding_email_edit");
                var validEmail = validateEmail(emailField);
                if (!validEmail)
                    allValid = false;
                else {

                    obj.email = validEmail;
                    sessionStorage.setItem('onboardingObj', JSON.stringify(obj));
                }
            }

            document.querySelector('#step2-edit .required').each(function () {
                //debugger;
                var el = document.querySelector(this);
                var val = el.value;
                if (val) {
                    removeInvalid(el);
                }
                else {
                    addInvalid(el);
                    allValid = false;
                }
            });

            //debugger;
            var zip = document.querySelector("#onboardingZipEdit").value;
            var validZip = false;
            if (zip.length == 4) {
                var elementPlace = document.querySelector('#onboardingPlaceEdit').value;
                if (elementPlace != 'Ugyldig postnummer') {
                    validZip = true;
                }
            }

            if (!validZip) {
                allValid = false;
                InvalidZip();
            }

            //debugger;
            if (allValid) {
                removeAllInvalid();
                if (part == "add") {
                    AddNewDeliveryV2();
                }
                else {
                    CustomerSaleLead(obj.cell, validEmail);
                    SaveEditDeliveryV2();
                    gotoStep(2);
                }
            }
        }
    }
}

function validateZip(zip) {
    if (zip) {
        if (zip.length == 4) {
            return OnboardingPlaceFromZipV2(zip);
        }
        else if ((zip.length > 4)) {
            InvalidZip();
            return false;
        }
    }
    return false;
}
;// CONCATENATED MODULE: ./js/onboarding-api.js


var customerData;
//let apiUrlSaleV2 = "https://app-elkompis-service-prod.azurewebsites.net/sale/";
let apiUrlSaleV2 = "/api/sale/";

//registrer mobil og epost
function onboarding_api_CustomerSaleLead(cell = null, email = null) {
    let apiUrl = apiUrlSaleV2 + "saleLead";
    //debugger;
    let obj = {
        cell: cell,
        email: email
    };

    let xhr = new XMLHttpRequest();
    xhr.open('POST', apiUrl, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify(obj));
    xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                //debugger;
            }
        }
    }
}

function OnboardingLookupV2(cell = null, email = null, authCode = null, state = null, redirectUrl = null, trackingObj = null) {
    //debugger;
    showSpinner("#btnSubmitCellSearch");
    showPulse("#step1-cell");
    let apiUrl = apiUrlSaleV2;

    if (cell != null) {
        apiUrl = apiUrl + "lookup?cell=" + cell;
    }
    else {
        apiUrl = apiUrl + "lookup?state=" + state + "&code=" + authCode + "&redirectUrl=" + redirectUrl;
        if (!authCode) {
            return
        }
    }
    //showLoader();
    let xhr = new XMLHttpRequest();
    xhr.open('GET', apiUrl, true);
    xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200 || this.status == 204) {
                let jsonContent = JSON.parse(this.responseText);

                //debugger;

                customerData = jsonContent;
                var unhappy = false;
                if (email)
                    jsonContent.email = email;

                if (jsonContent.firstName && jsonContent.lastName) {
                    SetOnboardingState("happy");
                    $("#firstNameEdit").val(jsonContent.firstName);
                    $("#lastNameEdit").val(jsonContent.lastName);
                }
                else {
                    SetOnboardingState("unhappy");
                    unhappy = true;
                }
                //if (!jsonContent.personalNumber)
                //    showElement("#sep1-pnr");


                $("#deliveriesContainer").empty();
                if (!!jsonContent.deliveries) {
                    let i = 0;
                    jsonContent.deliveries.forEach(element => {
                        element.isSelected = true;
                        AppendDeliveryV2(element, i);
                        i = i + 1;
                    });
                }

                if (trackingObj) {
                    jsonContent.referralCode = trackingObj.invite;
                    jsonContent.campaignCode = trackingObj.campaignCode;
                    jsonContent.utmSource = trackingObj.utm_source;
                    jsonContent.utmMedium = trackingObj.utm_medium;
                    jsonContent.utmCampaign = trackingObj.utm_campaign;
                    jsonContent.utmTerm = trackingObj.utm_term;
                    jsonContent.utmContent = trackingObj.utm_content;
                }
                sessionStorage.setItem('onboardingObj', JSON.stringify(jsonContent));

                //debugger;

                if (jsonContent.authMethod == "Vipps") {
                    $("#onboarding_cell").val(jsonContent.cell)
                }


                if (jsonContent.email) {
                    // $("#emailInputStep3").val(jsonContent.email);

                    if (jsonContent.deliveries.length > 0) {
                        //$("#step1-customername").html(jsonContent.firstName + ' ' + jsonContent.lastName);
                        gotoStep(2, 'deliveries');
                    }

                    else {
                        gotoStep(2, 'manual');
                    }
                }
                else {
                    if (jsonContent.deliveries.length > 0) {
                        EditDeliveryV2('#data-0', 0);
                    }
                    else {
                        gotoStep(2, 'edit');
                    }
                }
                //hideLoader();
                //debugger;
                //scrollToElement('#step2');
                //scrollToElement('#step1-sum');
            }
            else {
                gotoStep(1, 'phone');
                //hideLoader();
                removeSpinner("#btnSubmitCellSearch");
                removeAllPulse();
                //hideElement("#city-loader");
            }
        }
    }
    xhr.send();
}


function onboarding_api_SaveEditDeliveryV2() {
    let index = $("#deliveryIdEdit").val();
    let jsonContent = getJsonContent();
    if (jsonContent == null) {
        return null;
    }

    let meternumber = $("#meterNumberAdd").val();

    let moveTakeover = $('#supply-takover').is(':checked');
    let changeOfSup = !moveTakeover ? "ChangeOfSupply" : "Move";
    let moveDate = null;


    if (!index || jsonContent.deliveries == null
        || jsonContent.deliveries[index].address != $("#onboardingAddressEdit").val()
        || jsonContent.deliveries[index].houseNumber != $("#onboardingHouseNoEdit").val()
        || jsonContent.deliveries[index].zipcode != $("#onboardingZipEdit").val()
    ) {

        if (!index || jsonContent.deliveries == null) {
            index = 0;

            const delivery = {
                address: $("#onboardingAddressEdit").val(),
                houseNumber: $("#onboardingHouseNoEdit").val(),
                zipcode: $("#onboardingZipEdit").val(),
                place: $("#onboardingPlaceEdit").val(),
                country: null,
                mpid: null,
                meterNumber: null,
                changeOfSupplyType: changeOfSup,
                moveDate: moveDate,
                isSelected: true
            };

            jsonContent.deliveries.push(delivery);
        }

        //change in address
        jsonContent.deliveries[index].mpid = null;

        if (meternumber
            && jsonContent.deliveries[index].meterNumber != meternumber) {
            //updated meternumber 
            jsonContent.deliveries[index].meterNumber = meternumber;
        }
        else {
            jsonContent.deliveries[index].meterNumber = null;
        }

        //do new customerlookup for mpid and meternumber
        let obj = {
            phone: null,
            "personalNumber": jsonContent.personalNumber,
            "firstName": null,
            //"firstName": userData.firstName,
            //"lastName": userData.lastName,
            "lastName": null,
            "streetName": $("#onboardingAddressEdit").val(),
            "buildingNumber": $("#onboardingHouseNoEdit").val(),
            "zipcode": $("#onboardingZipEdit").val(),
            "meterNumber": jsonContent.deliveries[index].meterNumber,
            //"email": userData.email,
            "email": null,
            "orderId": 0,
            "source": "Elhub",
            "vippsAccessToken": null,
        };
        //debugger;
        CustomerLookupV2(obj, index);


    } else {
        if (meternumber) {
            jsonContent.deliveries[index].meterNumber = meternumber;
        }

    }
    if (moveTakeover) {
        moveDate = moveTakeover ? $("#takoverDate").val() : null;
        jsonContent.deliveries[index].moveDate = moveDate;
    }

    $("#meterNumberAdd").val(jsonContent.deliveries[index].meterNumber);


    jsonContent.deliveries[index].address = $("#onboardingAddressEdit").val();
    jsonContent.deliveries[index].houseNumber = $("#onboardingHouseNoEdit").val();
    jsonContent.deliveries[index].zipcode = $("#onboardingZipEdit").val();
    jsonContent.deliveries[index].place = $("#onboardingPlaceEdit").val();
    jsonContent.deliveries[index].isSelected = true;


    $("#deliveriesContainer").empty();
    if (!!jsonContent.deliveries) {
        let i = 0;
        jsonContent.deliveries.forEach(element => {
            AppendDeliveryV2(element, i);
            i = i + 1;
        });
    }

    //debugger;
    setJsonContent(jsonContent);
    //sessionStorage.setItem('onboardingObj', JSON.stringify(jsonContent));
}



function OnboardingSaleV2(profile) {
    //debugger;
    $("#onboardingSaleClick").prop("disabled", true);
    let obj = SyncUserDataV2();

    if (obj == null) {
        showOnboardingError("Invalid zipcode");
        $("#onboardingSaleClick").prop("disabled", false);
        removeSpinner("#onboardingSaleClick");
        return;
    }

    obj.profile = profile;

    let xhr = new XMLHttpRequest();
    xhr.open('POST', apiUrlSaleV2, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify(obj));


    xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            //debugger;
            if (this.status == 200 || this.status == 204) {
                //let jsonContent = JSON.parse(this.responseText);
                //var deliveryId = String(jsonContent.deliveryId);
                var welcomeUrl = null;
                var urlTemp = "";
                //debugger;

                if (obj.moveDate) {
                    //til flyttevelkomst om finnes
                    var urlTemp = $("#linkWelcome1").val();
                    if (urlTemp && urlTemp.length > 0) {
                        welcomeUrl = getUrlParamsV2(urlTemp);
                    }
                }

                if (!welcomeUrl && obj.expeditedStartup) {
                    //til rask oppstartvelkomst om finnes
                    var urlTemp = $("#linkWelcome2").val();
                    if (urlTemp && urlTemp.length > 0) {
                        welcomeUrl = getUrlParamsV2(urlTemp);
                    }
                }

                if (!welcomeUrl) {
                    //til rask generell velkomst om finnes
                    var urlTemp = $("#linkWelcome3").val();
                    if (urlTemp && urlTemp.length > 0) {
                        welcomeUrl = getUrlParamsV2(urlTemp);
                    }
                }
                if (!welcomeUrl) {
                    welcomeUrl = getUrlParamsV2('/velkommen');
                }

                removeAllPulse();

                //send til velkomstside
                window.location.href = welcomeUrl;
            }
            else {
                //hideSpinner("#onboardingSaleButton");
                removeSpinner("#onboardingSaleClick");
                removeAllPulse();
            }
        }
    }
}


function getUrlParamsV2(path) {
    var mainurl = location.protocol + "//" + location.host + path;
    let utmCodes = getUtmCodes();
    return mainurl + utmCodes;
}



function onboarding_api_OnboardingPlaceFromZipV2(zip = null) {
    showElement("#city-loader");

    let apiUrl = apiUrlSaleV2 + "place/" + zip;;
    let xhr = new XMLHttpRequest();
    xhr.open('GET', apiUrl, true);
    xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                let jsonContent = JSON.parse(this.responseText);
                let zipPlace = jsonContent.postalArea;

                var elementPlace = $('#onboardingPlaceEdit');
                elementPlace.val('Ugyldig postnummer');
                removeInvalid(elementPlace);

                elementPlace.val(zipPlace);

                removeInvalid($("#onboardingZipEdit"));
                hideElement("#city-loader");
                return true;
            }
            else {
                //showOnboardingError("Invalid zipcode");
                onboarding_api_InvalidZip();
                return false;
            }
        }
    }
    xhr.send();
}

function onboarding_api_InvalidZip() {
    var elementPlace = $('#onboardingPlaceEdit');
    elementPlace.val('Ugyldig postnr');
    addInvalid(elementPlace);

    addInvalid($("#onboardingZipEdit"));

    hideElement("#city-loader");
}



function CustomerLookupV2(obj = null, index = null) {
    //debugger;
    let apiUrl = apiUrlSaleV2 + "customerLookup";
    //showLoader();
    let xhr = new XMLHttpRequest();
    xhr.open('POST', apiUrl, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify(obj));
    xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                let jsonContent = JSON.parse(this.responseText);
                //debugger;
                if (jsonContent) {
                    if (jsonContent.deliveries && jsonContent.deliveries.length > 0) {
                        $("#meterNumberAdd").val(meterNumber);
                        if (index) {
                            var mpid = jsonContent.deliveries[0].mpid;
                            var meterNumber = jsonContent.deliveries[0].meterNumber;
                            SyncUserDataEditObject(index, mpid, meterNumber);
                        }
                        SaveEditDelivery();
                    }
                }
                //hideLoader();
            }
            else {
                //hideLoader();
            }
        }
    }
}
;// CONCATENATED MODULE: ./js/onboarding.js


function GetOnboardingState() {
    return sessionStorage.getItem('onboardingState');
}
function onboarding_SetOnboardingState(state) {
    sessionStorage.setItem('onboardingState', state);
}

function ShowPopup(element) {
    if (element)
        showElement(element);
}

function HidePopup(element) {
    if (element)
        hideElement(element);
}

Array.from(document.querySelectorAll(".form-popup-close"))
    .forEach(e => e.addEventListener("click", function (e) {
        e.preventDefault();
        e.closest(".form-popup").addClass("hidden");
}));

function onboarding_getJsonContent() {
    let retrievedObject = sessionStorage.getItem('onboardingObj');
    return JSON.parse(retrievedObject);
}

function onboarding_setJsonContent(obj) {
    sessionStorage.setItem('onboardingObj', JSON.stringify(obj));
}

function resetJsonContent() {
    let obj = onboarding_getJsonContent();
    obj.firstName = null;
    obj.lastName = null;
    obj.personalNumber = null;
    obj.deliveries = [];
    onboarding_setJsonContent(obj);
}

function addressChange() {
    document.getElementById("meterNumberAdd").value = ''
}


function onboarding_gotoStep(step, sub, deliveryId = null) {
    let jsonContent = onboarding_getJsonContent();
    //debugger;

    const elementConfirm = document.getElementById("#step3-confirm")
    removeAllSpinners();
    removeAllInvalid();
    removeAllPulse();

    if (step != 1) {
        showElement("#step1-sum");
        hideElement("#step1");
        hideElement("#step1-cell");
    }
    if (step != 2) {
        showElement("#step2-sum");
        hideElement("#step2");
        hideElement("#step2-edit");
    }
    if (step != 3) {
        if (elementConfirm.hasClass('showOrderDetails')) {
            elementConfirm.addClass("hideOrderDetails");
            elementConfirm.removeClass("showOrderDetails");
        }
        hideElement("#step2-editpen");
        hideElement("#step12-space");
        showElement("#step3-sum");
        hideElement("#step3-confirm");
    }

    //debugger;
    if (step == 1) {
        hideElement("#step1-sum");
        hideElement("#step2-edit");

        removeDisabled("#btnSubmitCellSearch");

        if (sub == 'intro') {
            clearDeliveryFields(true);
            sessionStorage.removeItem('onboardingObj');
            if (getUrlParam('code')) {
                window.location.assign('/landingsside-v2#onboarding');
            }
            showElement("#step1");
            showElement("#step1-intro");
            hideElement("#step1-cell");
        }
        else if (sub == 'cell') {
            hideElement("#step1-intro");
            showElement("#step1-cell");
        }
    }
    else if (step == 2) {
        hideElement("#step2-sum");
        hideElement("#step2-edit");
        hideElement("#step2email");
        
        if (sub == 'back' && jsonContent.firstName == '' && jsonContent.lastName == '') {
            onboarding_gotoStep(1, 'intro');
            return;
        }

        //debugger;
        if (!jsonContent.personalNumber)
            showElement("#sep1-pnr");
        //else
        //    hideElement("#sep1-pnr");


        if (sub == 'manual' || sub == 'reset') { //edit
            if (sub == 'reset') {
                clearDeliveryFields(true);
                $("#deliveriesContainer").empty();
                resetJsonContent();
            }
            hideElement("#step2");
            showElement("#step2-edit");
            stepNameEdit(true);

            showElement("#step2EditButton");
            hideElement("#step2AddButton");

        } else if (sub == 'edit') {
            hideElement("#step2");
            showElement("#step2-edit");
            showElement("#step2EditButton");
            hideElement("#step2AddButton");

            showElement("#sep1-pnr");
            if (jsonContent.authMethod == "Phone") {
                if (jsonContent && jsonContent.deliveries && jsonContent.deliveries.length == 1) {
                    stepNameEdit(true);
                }
                else {
                    stepNameEdit(false);
                }
            }
            else if (jsonContent.authMethod == "Vipps") {
                stepNameEdit(false);
                setReadonly("#personalNumberEdit");
            }
        }
        else if (sub == 'add') {
            clearDeliveryFields();
            hideElement("#step2");
            showElement("#step2-edit");
            showElement("#step2AddButton");
            hideElement("#step2EditButton");
            showElement("#sep1-pnr");

            setFnrField(jsonContent);


            /*if (jsonContent.authMethod == "Phone") {*/
                if (jsonContent && jsonContent.deliveries && jsonContent.deliveries.length > 0) {
                    setReadonly("#firstNameEdit");
                    setReadonly("#lastNameEdit");
                    setReadonly("#personalNumberEdit");
                    stepNameEdit(false);
                }
                else {
                    stepNameEdit(true);
                }
            //}
            //else {
            //    stepNameEdit(false);
            //}
        }
        else {
            showElement("#step2");
        }




        if (jsonContent && !jsonContent.email)
            showElement("#step2email");

    }
    else if (step == 3) {
        showElement("#step3-confirm");
        showElement("#step12-space");
        if (sub == 'orderdetails') {
            if (elementConfirm.hasClass('hideOrderDetails')) {
                elementConfirm.addClass("showOrderDetails");
                elementConfirm.removeClass("hideOrderDetails");
            }
            else {
                elementConfirm.addClass("hideOrderDetails");
                elementConfirm.removeClass("showOrderDetails");
            }
        }
        else {
            showElement("#step2-editpen");
            hideElement("#step3-sum");
        }
    } else if (step == 4) {
        showElement("#step-createorder");
        hideElement("#onboarding-container");
    }

    //debugger;
    if (/Android|iPhone/i.test(navigator.userAgent)) {
        if (step == 1) {
            scrollToElementOnboarding('#step1');
            //scrollToElement('#step1-scrollto');
        }
        else if (step == 2) {
            scrollToElementOnboarding('#step2');
            //scrollToElement('#step2-scrollto');
        }
        else if (step == 3) {
            //scrollToElement('#step3-scrollto');
            scrollToElementOnboarding('#step3-confirm');
        }
    }
}

function scrollToElementOnboarding(el2) {

    // This checks if the current device is in fact mobile
    var el = document.querySelector(el2);
    var viewportOffset = el.getBoundingClientRect();
    // these are relative to the viewport, i.e. the window
    var top = viewportOffset.top;
    var sc = top - 92;
    window.scrollBy(0, sc);

}

function stepNameEdit(edit) {
    if (edit) {
        removeReadonly("#firstNameEdit");
        removeReadonly("#lastNameEdit");
        hideElement("#btnResetUser");
    }
    else {
        setReadonly("#firstNameEdit");
        setReadonly("#lastNameEdit");
        showElement("#btnResetUser");
    }
}


function clearDeliveryFields(all = false) {
    $('#step2-edit input').each(function () {
        if ($(this).data('type') != "notclear" || all) {
            $(this).val(null);
        }
    })
}

function onboarding_AppendDeliveryV2(obj, index) {
    var meterNumber = obj.meterNumber;
    if (!meterNumber) {
        meterNumber = "";
    }
    else if (meterNumber.length > 12) {
        var part = meterNumber.slice(8, 12);
        meterNumber = meterNumber.replace(part, "xxxx");
    }
    var isSelected = "";
    if (obj.isSelected) {
        isSelected = "checked=\"checked\"";
    }


    var temp = $.trim($('#deliveryNew').html());
    //debugger;
    var firstName = $("#firstNameEdit").val();
    var lastName = $("#lastNameEdit").val();

    var x = temp.replace(/{{Firstname}}/ig, firstName);
    x = x.replace(/{{Lastname}}/ig, lastName);
    x = x.replace(/{{Address}}/ig, obj.address);
    x = x.replace(/{{HouseNo}}/ig, obj.houseNumber);
    x = x.replace(/{{ZipCode}}/ig, obj.zipcode);
    x = x.replace(/{{Place}}/ig, obj.place);

    //x = x.replace(/{{meterNumber}}/ig, obj.meterNumber);
    if (meterNumber) {
        x = x.replace(/{{meterNumber}}/ig, meterNumber);
    } else {
        x = x.replace(/{{meterNumberClass}}/ig, "hidden");
    }
    x = x.replace(/{{index}}/ig, index);
    x = x.replace(/{{checked}}/ig, isSelected);
    $('#deliveriesContainer').append(x);
}



function onboarding_EditDeliveryV2(el, index) {
    //debugger;
    $("#deliveryIdEdit").val(index);

    var datael = $(el);
    if (datael) {

        var address = $(datael).find('.address').html();
        if (address)
            $("#onboardingAddressEdit").val(address);

        var houseno = $(datael).find('.houseno').html();
        if (houseno)
            $("#onboardingHouseNoEdit").val(houseno);

        var zipcode = $(datael).find('.zipcode').html();
        if (zipcode)
            $("#onboardingZipEdit").val(zipcode);

        var place = $(datael).find('.place').html();
        if (place)
            $("#onboardingPlaceEdit").val(place);

        let obj = onboarding_getJsonContent();
        if (obj == null) {
            return null;
        }

        $("#firstNameEdit").val(obj.firstName);
        $("#lastNameEdit").val(obj.lastName);

        setFnrField(obj);

        let mnum = obj.deliveries[index].meterNumber;
        if (mnum) {
            $("#meterNumberAdd").val(mnum);
        }
    }

    onboarding_gotoStep(2, 'edit');

}

function setFnrField(obj) {
    let pnr = '';
    if (obj.personalNumber) {
        if (obj.personalNumber.length > 11) {
            pnr = "***********";
        } else {
            pnr = obj.personalNumber;
        }
    }
    $("#personalNumberEdit").val(pnr);
}


function onboarding_AddNewDeliveryV2(e) {
    //debugger;
    let retrievedObject = sessionStorage.getItem('onboardingObj');
    if (retrievedObject == null) {
        return null;
    }
    let jsonContent = JSON.parse(retrievedObject);
    let state = GetOnboardingState();
    if (state === 'unhappy') {
        jsonContent.firstName = $("#firstNameEdit").val();
        jsonContent.lastName = $("#lastNameEdit").val();
        var pnr = $("#personalNumberEdit").val();
        if (!pnr.startsWith('*'))
            jsonContent.personalNumber = pnr;
    }
    //debugger;
    let moveTakeover = $('#supply-takover').is(':checked');
    let changeOfSup = !moveTakeover ? "ChangeOfSupply" : "Move";
    let moveDate = moveTakeover ? $("#takoverDate").val() : null;

    const delivery = {
        address: $("#onboardingAddressEdit").val(),
        houseNumber: $("#onboardingHouseNoEdit").val(),
        zipcode: $("#onboardingZipEdit").val(),
        place: $("#onboardingPlaceEdit").val(),
        country: null,
        mpid: null,
        meterNumber: null,
        changeOfSupplyType: changeOfSup,
        moveDate: moveDate,
        isSelected: true
    };
    let meternumber = $("#meterNumberAdd").val();
    if (meternumber) {
        delivery.meterNumber = meternumber;
    }
    jsonContent.deliveries.push(delivery);

    showDeliveries(jsonContent);

    sessionStorage.setItem('onboardingObj', JSON.stringify(jsonContent));
    onboarding_gotoStep(2);
}

function showDeliveries(jsonContent) {
    $("#deliveriesContainer").empty();
    if (!!jsonContent.deliveries) {
        let i = 0;
        jsonContent.deliveries.forEach(element => {
            onboarding_AppendDeliveryV2(element, i);
            i = i + 1;
        });
    }
}

function DeleteDelivery(index) {
    //debugger;
    let retrievedObject = sessionStorage.getItem('onboardingObj');
    if (retrievedObject == null) {
        return null;
    }
    let jsonContent = JSON.parse(retrievedObject);
    if (!!jsonContent.deliveries) {
        jsonContent.deliveries.splice(index, 1);
    }
    sessionStorage.setItem('onboardingObj', JSON.stringify(jsonContent));
    SyncUserDeliveries();
}

function SyncUserDeliveries() {
    //debugger;
    let retrievedObject = sessionStorage.getItem('onboardingObj');
    if (retrievedObject == null) {
        return null;
    }
    let jsonContent = JSON.parse(retrievedObject);


    if (!!jsonContent.deliveries) {
        let i = 0;
        jsonContent.deliveries.forEach(element => {
            //element.isSelected = true;
            onboarding_AppendDeliveryV2(element, i);
            i = i + 1;
        });
    }
    showDeliveries(jsonContent);
    return jsonContent;
}


function onboarding_SyncUserDataV2() {
    //debugger;
    let retrievedObject = sessionStorage.getItem('onboardingObj');
    if (retrievedObject == null) {
        return null;
    }
    let jsonContent = JSON.parse(retrievedObject);

    jsonContent.expeditedStartup = $('#confirm-faststartup').is(':checked');
    jsonContent.newsletter = $('#confirm-news').is(':checked');

    return jsonContent;
}

function onboarding_SyncUserDataEditObject(index, mpid, meterNumber) {
    if (!index) {
        return null;
    }

    let retrievedObject = sessionStorage.getItem('onboardingObj');
    if (retrievedObject == null) {
        return null;
    }

    let jsonContent = JSON.parse(retrievedObject);
    jsonContent.deliveries[index].mpid = mpid;
    jsonContent.deliveries[index].meterNumber = meterNumber;
    sessionStorage.setItem('onboardingObj', JSON.stringify(jsonContent));
}

function getUrlParam(key) {
    let searchParams = new URLSearchParams(window.location.search);
    if (searchParams.has(key)) {
        return searchParams.get(key);
    }
    return "";
}

function onboarding_getUtmCodes() {
    let retrievedObject = sessionStorage.getItem('trackingObj');
    if (!retrievedObject)
        return "";
    let trackingObj = JSON.parse(retrievedObject);
    if (!trackingObj)
        return "";

    let result = "?";
    if (trackingObj.utm_source) {
        if (result != "?") {
            result += "&";
        }
        result += "utm_source=" + trackingObj.utm_source;
    }
    if (trackingObj.utm_medium) {
        if (result != "?") {
            result += "&";
        }
        result += "utm_medium=" + trackingObj.utm_medium;
    }
    if (trackingObj.utm_campaign) {
        if (result != "?") {
            result += "&";
        }
        result += "utm_campaign=" + trackingObj.utm_campaign;
    }
    if (trackingObj.utm_term) {
        if (result != "?") {
            result += "&";
        }
        result += "utm_term=" + trackingObj.utm_term;
    }
    if (trackingObj.utm_content) {
        if (result != "?") {
            result += "&";
        }
        result += "utm_content=" + trackingObj.utm_content;
    }

    if (result == "?") {
        return "";
    }
    return result;
}
;// CONCATENATED MODULE: ./js/index.js




})();

onboarding = __webpack_exports__;
/******/ })()
;