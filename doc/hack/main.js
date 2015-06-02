/**
 * @file 嵌入参考文档页面主入口脚本
 * @author wangjie
 */

define(function (require) {

    'use strict';

    var render = require('./render');

    function main() {
        render.init();
    }

    return main;
});