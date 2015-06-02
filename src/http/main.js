/**
 * @file 网络通信模块代码
 * @author wangjie
 */

define(function (require) {

    'use strict';

    var config = require('./config');
    var ajax = require('../base/ajax');
    var Promise = require('./promise');

    var exports = {};

    function request(type, url, options) {
        switch (type) {
            case 'jsonp':
                ajax.jsonp(url, options);
            break;
            case 'formp':
                ajax.formAjax(url, options);
            break;
            default:
                alert('i love you');
            break;
        }
    }

    exports.init = function () {

        var httpData = config.httpData;

        for (var attr in httpData) {
            if (httpData.hasOwnProperty(attr)) {
                this[attr] = (function (item) {
                    return function (funScu, funFail) {
                        var options = httpData[item];
                        options.sucess = funScu;
                        options.fail = funFail;
                        request(options.type, options.url, options);
                    };
                })(attr);
            }
        }
    };

    exports.promise = function (fun) {
        var p = new Promise(fun);
        return p;
    };

    exports.init();

    return exports;
});