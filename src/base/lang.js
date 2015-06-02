/**
 * @fileOverview 公用方法封装
 *
 * @author shaobo(renshaobo@baidu.com)
 */

define(function () {

    'use strict';

    var TOSTRING = ({}).toString;

    // from yui
    var NATIVE_FN_REGEX  = /\{\s*\[(?:native code|function)\]\s*\}/i;

    /**
     * 检查变量是否是数组
     * 
     * @param {*} arr 需要检查的变量
     * @return {boolean} true为数组
     */
    function isArray(arr) {
        return TOSTRING.call(arr) === '[object Array]';
    }

    /**
     * 验证方法是否原生方法
     * 
     * @param  {Function} fn 方法名
     * @return {Boolean}     true为原生方法
     */
    function isNative(fn) {
        return !!(fn && NATIVE_FN_REGEX.test(fn));
    }

    return {
        /**
         * 验证方法是否原生方法
         * 
         * @param  {Function} fn 方法名
         * @return {Boolean}     true为原生方法
         */
        isNative: isNative,

        /**
         * 检查变量是否是数组
         * 
         * @param {*} arr 需要检查的变量
         */
        isArray: isNative(Array.isArray) ? Array.isArray : isArray,

        /**
         * 检查变量是否是对象, function及null排除
         * 
         * @param  {*}  obj 需要检查的变量
         * @return {Boolean}   true为Object  
         */
        isObject: function (obj) {
            return obj && TOSTRING.call(obj) === '[object Object]';
        },

        /**
         * 检查变量是否是函数
         * 
         * @param  {*}  obj 需要检查的变量
         * @return {Boolean}   true为Object  
         */
        isFunction: function (fn) {
            return fn && TOSTRING.call(fn) === '[object Function]';
        },

        /**
         * 判断给定的对象是否是某个实例
         * @param  {[type]} o    [description]
         * @param  {[type]} type [description]
         * @return {[type]}      [description]
         */
        instanceOf: function(o, type) {
            return (o && o.hasOwnProperty && (o instanceof type));
        },

        /**
         * 扩展对象
         *
         * @public
         * @param {Object} target 目标对象
         * @param {Object} source 源对象
         * @return {Object}
         */ 
        extend: function (target, source) {
            for (var key in source) {
                if (source.hasOwnProperty(key)) {
                    target[key] = source[key];
                }
            }

            return target;
        }
    };
});
