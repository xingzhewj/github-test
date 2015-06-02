/**
 * @file 事件控制注册脚本
 * @author wangjie
 */

define(function (require) {

    'use strict';

    var emitter = require('../common/Emitter');
    var http = require('../http/main');

    var exports = {};

    emitter.mixin(exports);

    function clickOk() {
        var t = http.promise(function (resolve, reject) {
            http.sendUseInfo(function (result) {
                resolve(result);
            },
            function (result) {
                reject();
            });
        });
        var h = t.then(function (d) {
            alert('iframe 提交成功');
        }).then(function (result) {
            http.getStatusInfo(function (result) {
                alert(result.data.nm);
            }, function (result) {

            });
        });
    }

    exports.initFun = function () {
        // 注册单击ok方法
        this.on('clickok', clickOk);
    };

    return exports;
});