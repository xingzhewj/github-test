/**
 * @file 嵌入视图脚本
 * @author wangjie
 */

define(function (require) {

    'use strict';

    var template = require('template');
    var dom = require('dom');
    var handle = require('event');
    var config = require('../data/config');
    var mainTpl = require('./main.tpl');
    var fixed = require('../common/Fixed');
    var util = require('../lib/util');
    var eventControl = require('../events/main');
    var model = require('./model');

    var exports = {};
    var WRAP_ID = 'embed_contain';

    /**
     * 渲染自定义内容的嵌入
     */
    function render() {
        var htmlStr = template.render(mainTpl, config.testData);
        var wrapEle = dom.g(WRAP_ID);
        dom.appendHTML(htmlStr, wrapEle);
    }

    exports.init = function () {
        // 渲染
        render();

        // 事件注册
        eventControl.init();

        // 设置ie6中的fixed样式
        fixed(WRAP_ID);

        // 挂载model
        this.model = model;
    };

    return exports;
});
