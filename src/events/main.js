/**
 * @file 事件控制主脚本
 * @author wangjie
 */

define(function (require) {

    'use strict';

    var config = require('./config');
    var control = require('./control');
    var handle = require('../common/handle');
    var util = require('../lib/util');
    var dom = require('../common/dom');

    var exports = {};

    /**
     * 初始化元素事件
     */
    function initEvent() {
        util.each(config.domData, function (item, index) {
            var tem = dom.g(item.id);
            if (tem) {
                handle.domOn(tem, item.type, function () {
                    control.emit(item.fun);
                });
            }
            else {
                throw new TypeError('无此id的dom元素存在');
            }
        });
    }

    exports.init = function () {
        // 初始化事件方法
        control.initFun();
        // 初始化事件注册
        initEvent();
    };

    return exports;
});