/**
 * @file 兼容ie6的fixed定位
 *
 * @author wangjie
 * @date 2015-03-14
 */

define(function (require) {

    'use strict';

    var browser = require('../base/brower');
    var dom = require('./dom');
    var lang = require('../base/lang');
    var strict = browser.isStrict();

    var doc = document;
    var timeKey = 0;
    
    /**
     * ie6中解决滚动图片加载问题
     * @return {[type]} [description]
     */
    function ieScrollCache() {
        if (browser.ie === 6) {
            doc.execCommand('BackgroundImageCache', false, true);
        }
    }

    /**
     * 获取scrollTop值
     * 
     * @return {int} scrollTop值
     */
    function getScrollTop() {
        return Math.max(doc.documentElement.scrollTop, doc.body.scrollTop);
    }

    /**
     * 获取clientHeight值
     * 
     * @return {int} clientHeight值
     */
    function getClientHeight() {
        var html = doc.documentElement;
        var body = doc.body;
        var client = strict ? html : body;
        return client.clientHeight;
    }

    /**
     * 获取scrollLeft值
     * 
     * @return {int} scrollLeft值
     */
    function getScrollLeft() {
        return Math.max(doc.documentElement.scrollLeft, doc.body.scrollLeft);
    }

    /**
     * 获取clientWidth值
     * 
     * @return {int} clientWidth值
     */
    function getClientWidth() {
        var html = doc.documentElement;
        var body = doc.body;
        var client = strict ? html : body;
        return client.clientWidth;
    }

    function handleValue(value, base) {
        if (value.indexOf('%') > -1) {                    
            value = parseInt(value, 10) / 100;
            value = value * base;
        }
        value = parseInt(value, 10);

        return value;
    }

    /**
     * fixed构造函数
     * @param  {string} el 元素id
     * @return {[]}    [description]
     */
    function Fixed(el) {
        var self = this;
        // ie6滚动
        ieScrollCache();
        if (!(lang.instanceOf(self, Fixed))){
            self = new Fixed(el);
        }
        else{
            self.init(el);
        }

        return self;
    };

    Fixed.prototype = {

        // 修正constructor
        constructor: Fixed,
        /**
         * 初始化方法
         * @param  {string} el 元素id
         * @return {[type]}    [description]
         */
        init: function (el) {
            // 非ie6 或者 没有传递wrap, 不创建mask
            // 还原到之前的ie判定条件，已验证ie各版本、火狐
            // chrome、百度浏览器
            if (!(browser.ie <= 6
                || (browser.ie == 7 && !browser.isStrict()))
                || !el) {
                return null;
            }
            var self = this;
            self.el = dom.g(el);
            self.el.style.position = 'absolute';
            // 开始设置样式
            self.set();
            return self;
        },
        set: function () {
            var self = this;
            if (self.isReady()) {
                self.getNodeRect();
                self.analyze();
                self.setHtml();
                self.bindEvent();
                return;
            }
        },

        /**
         * 绑定事件
         */
        bindEvent: function () {
            var self = this;
            window.attachEvent('onscroll', function () {
                self.fix(); 
            });
            window.attachEvent('onresize', function () {
                self.resizeFix();
            });
        },

        /**
         * resize时处理逻辑， 重新计算top, left值
         */
        resizeFix: function () {
            var self = this;
            //还是写不是ie为undefined
            if (browser.ie <= 6) {
                self.getNodeRect();
                self.analyze();
            }
        },

        /**
         * 解析top bottom, 挂载在实例top属性上
         */
        analyzeTop: function () {
            var self = this;
            var rect = self.rect;
            var top;
            var clientHeight = getClientHeight();

            
            if (!rect.bottom || rect.bottom == 'auto') {
                top = handleValue(rect.top, clientHeight);
                self.top = top;
                return;
            }

            var bottom = handleValue(rect.bottom, clientHeight);
            top = clientHeight - bottom - self.el.offsetHeight;

            self.top = top;
        },

        /**
         * 解析left, right 挂载在实例left属性上
         */
        analyzeLeft: function () {
            var self = this;
            var rect = self.rect;
            var left;
            var clientWidth = getClientWidth();

            if (!rect.right || rect.right == 'auto') {
                left = handleValue(rect.left, clientWidth);
                self.left = left;
                return;
            }

            var right = handleValue(rect.right, clientWidth);
            left = clientWidth - right - self.el.offsetWidth;

            self.left = left;
        },

        /**
         * 解析元素原有样式设置
         */
        analyze: function () {
            var self = this;
            var el = self.el;

            if (!self.isReady()) {
                return;
            }

            self.analyzeTop();
            self.analyzeLeft();

            self.fix();
        },

        /**
        * 判断节点是否可以进行样式计算
        * @todo  判断条件是否需要更严谨
        * 
        * @return {Boolean} true 为ready
        */
        isReady: function () {
            var self = this;
            var el = self.el;
            if (el) {
                return true;
            }

            return false;
        },

        /**
         * 设置html样式，解决闪烁问题
         */
        setHtml: function () {
            var html = doc.documentElement;
            html.style.backgroundImage = "url(about:blank)";
            html.style.backgroundAttachment = "fixed";
        },

        /**
         * 获取节点原始设置值并缓存
         */
        getNodeRect: function () {
            var self = this;
            var el = self.el;
            var style = el.style;
            var curStyle = el.currentStyle;
            
            self.rect = {
                top: style.top || curStyle.top,
                left: style.left || curStyle.left,
                right: style.right || curStyle.right,
                bottom: style.bottom || curStyle.bottom
            };
        },

        /**
         * 修正样式
         */
        fix: function () {
            var self = this;
            var el = self.el;

            if (!self.isReady()) {
                return;
            } 

            var scrollTop = getScrollTop();
            var scrollLeft = getScrollLeft();
            el.style.top = scrollTop + self.top + 'px';
            el.style.left = scrollLeft + self.left + 'px';
        }
    }

    return Fixed;
});