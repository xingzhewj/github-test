/**
 * @file 嵌入通信脚本
 * @author wangjie
 */
define(function (require) {

    'use strict';

    var exports = {};

    // 获取当前时间戳
    function now() {
        return new Date().getTime();
    }

    // 生成16位随机数字字符
    function rand() {
        return Math.random().toString().substr(2);
    }

    // 对象url序列化
    function urlSearise(params) {
        var urlStr = '?';
        for (var attr in params) {
            if (params.hasOwnProperty(attr)) {
                urlStr += attr + '=' + params[attr] + '&';
            }
        }
        urlStr += '_time=' + now();
        return urlStr;
    }

    // 删除节点元素
    function removeElem(elem) {

        var parent = elem.parentNode;
        if (parent && parent.nodeType !== 11) {
            parent.removeChild(elem);
        }
    }

    /**
     * jsonp请求方法
     * @param  {string} url  请求地址
     * @param  {Object} options  请求参数对象
     * @return {Function} options.callback  请求回调函数
     */
    exports.jsonp = function (url, options) {

        function jsonp(url, funSuc, funFial, data) {
            var script = document.createElement('script');
            var cb = 'callback';
            var id = 'jsonp_id_' + now();
            // 设置script的url
            script.src = url + urlSearise(data) + '&callback=' + cb;
            // 设置script的编码
            script.charset = 'utf-8';
            // 设置script的id
            script.id = id;
            
            // 设置全局函数接受josnp调用
            window[cb] = function (json) {
                // 销毁此函数
                window[cb] = undefined;
                // 销毁jsonp创建的script的dom元素
                var scriptEle = document.getElementById(id);
                // 异步销毁，在ie6中直接删除会导致未执行完毕jsonp中的代码dom就删除
                // 会导致ie6直接奔溃
                setTimeout(function () {
                    removeElem(scriptEle);
                }, 0);
                // 执行回调
                funSuc(json);
            };

            // 此处开始处理失败回调，验证了502、404状态和ie6+，chrome,firefox
            // 其他类型浏览器未验证
            // 失败回调，适用ie9+,firefox,chrome,safri等
            // 用hasOwnProperty验证是否支持onerror，此作用可避免在chrome等支持
            // onerror的浏览器中调用两次失败回调的问题
            if (script.hasOwnProperty && script.hasOwnProperty('onerror')) {
                script.onerror = function () {
                    funFial && funFial();
                    removeElem(script);
                }
            }
            else {
                // 设置超时时调用失败回调,ie6/7/8的404、502问题也在此列
                var overTimeInterval = 3000;
                // 长连接后台会hold住20s
                if (l === 1) {
                    overTimeInterval = overTimeInterval + 20000;
                }
                // timeInterval仍旧为0，说明超时未调用成功回调，则调用失败回调
                // i66/7/8，404、502等状态也在此情况
                setTimeout(function () {
                    if (timeInterval === 0) {
                        // 调用失败回调
                        funFial && funFial();
                        removeElem(script);
                    }
                }, overTimeInterval);
            }

            // 在head里面插入script元素 此处无法置入商桥元素内，百度框此处有坑
            var scriptCon = document.getElementsByTagName('head')[0];
            if (scriptCon) {
                setTimeout(function () {
                    scriptCon.appendChild(script);
                }, 0);
            }
        }

        // 调用jsonp
        jsonp(url, options.sucess, options.fail, options.params);
    };

    /**
     * 跨域post提交
     * @param  {string} url     提交地址
     * @param  {Object} options 参数对象
     */
    exports.formAjax = function (url, options) {
        var iframe = document.createElement('iframe');
        var id = 'iframe_id_' + rand();
        var name = 'iframe_name_' + rand();
        // 设置iframe的name
        iframe.setAttribute('name', name);
        // 设置iframe的id
        iframe.setAttribute('id', id);
        // 设置iframe为隐藏以免印象页面布局
        iframe.style.display = 'none';
        // 页面中插入iframe
        document.body.appendChild(iframe);

        // 创建form表单
        var form = document.createElement('form');
        var formId = 'form_id_' + rand();
        // form设置target到iframe的name中
        form.setAttribute('target', name);
        // 设置forme的请求提交方式为post
        form.setAttribute('method', 'post');
        // 设置form的请求地址
        form.setAttribute('action', url);
        // 设置form的id
        form.setAttribute('id', formId);

        var params = options.params;
        for (var attr in params) {
            if (params.hasOwnProperty(attr)) {
                var input = document.createElement('input');
                input.setAttribute('type', 'hidden');
                input.setAttribute('name', attr);
                input.setAttribute('value', params[attr]);
                form.appendChild(input);
            }
        }
        document.body.appendChild(form);
        form.submit();
        // 提交完毕之后销毁form和iframe,异步销毁
        iframe.onload = function () {
            options.sucess();
            setTimeout(function () {
                removeElem(form);
                removeElem(iframe);
            }, 0);
        };
    };

    /**
     * 跨域img提交数据
     * @param  {string} url     提交地址
     * @param  {Object} options 参数对象
     * @description 此方法主要可用于统计打点的请求使用,
     *              只关心提交数据，不关心返回
     */
    exports.staticAjax = function (url, options) {
        var img = document.createElement('img');
        // 设置img的id
        var id = 'img_id_' + rand();
        img.setAttribute('id', id);
        img.src = url + urlSearise(options);
        document.body.appendChild(img);
        img.onload = function () {
            // 删除img标签
            setTimeout(function () {
                removeElem(img);
            });
        };
        
    };

    return exports;
});
