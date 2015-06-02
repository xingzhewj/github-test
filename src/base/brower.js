/**
 * @file 浏览器判断
 * @author cxl(chenxinle@baidu.com)
 */

define(function () {

    'use strict';

    var UNDEFINED;

    var DOCUMENT = document;

    var IETester = new RegExp('msie (\\d+\\.\\d+)|trident', 'i');

    return {
        /**
         * ie版本
         *
         * @public
         * @return {number}
         */
        ie: function () {
            return IETester.test(navigator.userAgent) 
                ? (DOCUMENT.documentMode || + RegExp.$1) 
                : UNDEFINED;
        }(),

        opera: /opera(\/| )(\d+(\.\d+)?)(.+?(version\/(\d+(\.\d+)?)))?/i.test(navigator.userAgent) 
            ?  + ( RegExp["\x246"] || RegExp["\x242"] ) 
            : undefined,

        /**
         * 判断是否严格标准的渲染模式
         *
         * @public
         * @return {boolean}
         */
        isStrict: function () {
            return DOCUMENT.compatMode == 'CSS1Compat';
        },

        isMobile: function () {
            var u = navigator.userAgent;
            return !!u.match(/.*Mobile.*/) || ('ontouchstart' in window);
        }()
    };
});
