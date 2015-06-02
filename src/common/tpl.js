/**
 * @file 模板提取方法
 * @author wangjie
 */

define(function (require) {

    'use strict';

    var exports = {};

    /**
     * 提取制定target的内容
     * @param  {string} tplStr 模板字符串
     * @param  {string} target 目标名称
     * @return {string}        目标内容
     */
    exports.pickHtml = function (tplStr, target) {
        if (!!tplStr) {
            var tempObj = {};
            var tpls = tplStr.split('<!-- end -->');
            var len = tpls.length;
            while (len--) {
                var temTpl = tpls[len];
                if (!temTpl) {
                    continue;
                }
                if (arguments.length == 1) {
                    target = temTpl.match(/\w{0,}( \-\->)/g)[0]
                                           .match(/\w/g).join('');
                }
                var temTar = '<!-- target: ' + target + ' -->';
                if (temTpl.indexOf(temTar) !== -1) {
                    tempObj[target] = temTpl;
                }
            }
            return tempObj;
        }
    };

    return exports;
});