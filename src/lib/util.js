/**
 * @file 工具脚本
 * @author wangjie
 */

define(function (require) {

    'use strict';

    var exports = {};

    /**
     * 时间格式化函数
     * @param  {string} format 时间格式
     * @param  {string|number} time   需要格式化的时间
     * @return {string}        格式化有的时间
     */
    exports.dateFormat = function (format, time) {
        var dateTime = new Date(time);

        if (dateTime + '' === 'Invalid Date') {
            return;
        }

        var year = dateTime.getYear() + 1900;
        var month = dateTime.getMonth() + 1;
        var day = dateTime.getDate();
        var hour = dateTime.getHours();
        var minute = dateTime.getMinutes();
        var seconds = dateTime.getSeconds();
        var millisecond = dateTime.getMilliseconds();

        var dateShortRegex = [
            'yy-MM-dd',
            'yy-MM-dd hh:mm:ss'
        ];

        var len = dateShortRegex.length;

        var baseResult = year + '-' + month + '-' + day;

        while (len--) {
            var temRegex = new RegExp(dateShortRegex[len], 'ig');
            if (temRegex.test(format)) {
                switch (len) {
                    case 1:
                        baseResult = baseResult + ' ' + hour + ':' + minute + ':' + seconds;
                    break;
                    default:
                    baseResult = baseResult;
                    break;
                }
            }
        }

        return baseResult;
    }

    /**
     * 深度克隆对象
     * @param  {Object} obj  需要克隆的对象
     * @return {Object}      克隆的对象
     */
    exports.cloneDeep = function (obj) {
        var o = obj.constructor === Array ? [] : {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) {
                o[attr] = typeof obj[attr] === 'Object' ? cloneDeep(obj[attr]) : obj[attr];
            }
        }

        return o;
    };

    /**
     * 浅度克隆对象
     * @param  {Object} obj  需要克隆的对象
     * @return {Object}      克隆的对象
     */
    exports.cloneFace = function (obj) {
        var o = obj.constructor === Array ? [] : {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) {
                o[attr] = obj[attr];
            }
        }
    };

    /**
     * 验证是否是日期格式
     * @param  {string}  str 需要验证的字符串
     * @return {Boolean}     是否为日期结果
     */
    exports.isDate = function (str) {
        //日期格式正则
        var dataFilter = /^([1-9]\d{3}-((0?[1-9])|(1[0-2]))-((0[1-9])|([1-2]?\d)|(3[0-1])))?$/;
        return dataFilter.test(strData);
    };

    /**
     * 去除字符串两端的空格
     * @param  {string} str 需要处理的字符串
     * @return {string}     处理以后的字符串
     */
    exports.trim = function (str) {
        return str.replace(/^\s|\s$/g, '');
    };

    /**
     * 数组遍历方法
     * @param  {Array|HtmlCollection} arry 数组活元素集合
     * @param  {Function} fun  回调方法
     */
    exports.each = function (arry, fun) {
        var tems = [].slice.call(arry, 0);
        var len = tems.length;
        while (len--) {
            fun(arry[len], len);
        }
    };

    /**
     * 正则匹配常用类型
     * @param  {string} str 需要匹配检测的字符串
     * @param  {string} type 匹配类型
     * @return {Boolean}      匹配结果
     */
    exports.matchFormat = function (str, type) {
        
    };

    return exports;

});
