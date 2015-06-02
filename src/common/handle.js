define(function (require, exports) {

    'use strict';

    var dom = require('./dom');

    var _events = {};

    /**
     * 注册事件
     * @param  {[String]}   event [事件名]
     * @param  {Function} fn    [事件函数]
     */
    exports.on = function (event, fn) {
        (_events[event] = _events[event] || []).push(fn);
    };

    /**
     * 移除事件
     * @param  {[String]}   event [事件名]
     * @param  {Function} fn    [事件函数]
     * @return {[type]}         [事件集合]
     */
    exports.off = function (event, fn) {
        var args = [].slice.call(arguments, 0).length;
        if(args.length === 0){
            _events = [];
            return;
        }
        if(args.length === 1){
            delete _events[event];
            return _events;
        }
    };

    /**
     * 触发事件
     * @param  {[String]} event [事件名]
     */
    exports.trigger = function (event) {
        var args = [].slice.call(arguments, 1);
        var eventFns = _events[event];
        if (eventFns) {
            var len = eventFns.length;
            while(len--){
                eventFns[len].call(this, args);
            }
        } 
    };

    exports.domOn = function (ele, type, fn) {
        var eles = [];

        if (Object.prototype.toString.call(ele).indexOf('Array') !== -1) {
            var len = ele.length;
            while (len--) {
                eles.push(ele[len]);
            }
        }
        else {
            eles.push(ele);
        }
        var l = eles.length;
        while (l--) {
            var element = dom.g(eles[l]);
            if (element) {
                if (element.addEventListener) {
                    element.addEventListener(type, fn, false);
                } else if (element.attactEvent) {
                    element.attachEvent('on' + type, fn);
                } else {
                    element['on' + type] = fn;
                }
            }
        }
    };

    exports.domOff = function (ele, type, fn) {
        var element = dom.g(ele);
        if (element) {
            if (element.removeEventListener) {
                element.removeEventListener(type, fn, false);
            } else if (element.detactEvent) {
                element.detachEvent('on' + type, fn);
            } else {
                element['on' + type] = undefined;
            }

        }
    };

    // TODO
    // window和HTMLElement
    exports.register = function (obj, type, fun) {
        if (typeof obj === 'object') {
            if (obj.addEventListener) {
                obj.addEventListener(type, fun, false);
            }
            else if(obj.attachEvent) {
                obj.attachEvent('on' + type, fun);
            }
            else {
                obj['on' + type] = fun;
            }
        }
    };

    /**
     * 阻止事件冒泡
     *
     * @param {Event} e
     *
     */
    exports.domStop = function (e) {
        e = e || window.event;
        if (e.stopPropagation) {
            e.stopPropagation();
        }
        else {
            e.cancelBubble = true;
        }
    };

    /**
     * 阻止默认事件
     *
     * @param {Event} e
     *
     */
    exports.domPrevent = function (e) {
        e = e || window.event;
        if (e.preventDefault) {
            e.preventDefault();
        }
        e.returnValue = false;
    };
});
