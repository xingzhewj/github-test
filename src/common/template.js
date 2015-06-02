/**
 * @file 模板渲染函数
 * @author wangjie
 */
define(function (require) {

    'use strict';

    var exports = {};

    // 克隆对象
    function cloneObject(obj) {
        var o = obj.constructor === Array ? [] : {};
        for (var i in obj) {
            if (obj.hasOwnProperty(i)) {
                o[i] = typeof obj[i] === "object" ? cloneObject(obj[i]) : obj[i];
            }
        }
        return o;
    }

    exports.render = function (tpl, data) {
        if (typeof tpl === 'string') {
            return tpl.replace(/@\{.+?\}/g, function (math, index, str) {
                var value = null;
                var temObj = {};

                temObj = cloneObject(data);

                var objs = math.replace(/(@\{|\})/g, '').split('.');
                for (var i = 0, len = objs.length; i < len; i++) {

                    if (objs[i].match(/\[\d\]+$/g)) {
                        objs[i].replace(/\[\d\]+$/g, function (match1, index, str) {
                            temObj = temObj[str.replace(match1, '')][parseInt(match1.match(/\d/g)[0])];
                        });
                    }
                    else {
                        temObj = temObj[objs[i]];
                    }
                    
                    if (i === (len -1)) {
                        value = temObj;
                    }
                }
                return value;
            });
        }
    };

    return exports;
});
