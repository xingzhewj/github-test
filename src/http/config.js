/**
 * @file 网络通信模块配置
 * @author wangjie
 */

define(function (require) {

    'use strict';

    var exports = {};

    exports.httpData = {
        sendUseInfo: {
            url: 'http://embed.baidu.com:8898/src/mock/test.js',
            type: 'formp',
            params: {
                param1:'xxoo',
                param2: 'fuck'
            }
        },
        getStatusInfo: {
            url: 'http://embed.baidu.com:8898/src/mock/infotest.js',
            type: 'jsonp',
            params: {
                param1: 'my name is "you cai"',
                param2: 'sex shi my love'
            }
        }
    };

    return exports;
});