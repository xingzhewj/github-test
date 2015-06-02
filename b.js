/**
 * @file 嵌入开始脚本
 * @author wangjie
 */

(function (global) {

    var configData = {};

    var embedWrap = document.createElement('ins');
    embedWrap.id = 'embed_contain';
    embedWrap.configData = configData;
    document.body.insertBefore(embedWrap, document.body.firstElement || null);

    // 创建script标签加载em.js
    var script = document.createElement('script');
    script.src = '../em.js';
    script.setAttribute('charset', 'UTF-8');
    document.body.insertBefore(script, document.body.firstElement || null);

})(this);