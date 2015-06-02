/**
 * @file 渲染嵌入参考文档页面脚本
 * @author wangjie
 */

define(function (require) {

    'use strict';

    var template = require('template');
    var config = require('./config');
    var tplStr = require('./main.tpl');
    var tpl = require('tpl');
    var dom = require('dom');
    var ftpl = require('ftpl');

    var exports = {};

    function renderHtml() {
        var htmlTpl = tpl.pickHtml(tplStr, 'html');
        var htmlStr = template.render(htmlTpl.html, config.data);
        var htmlWrap = dom.g('content_js');
        htmlWrap.innerHTML = htmlStr;
    }

    exports.init = function () {
        
        renderHtml();
    };

    return exports;
});