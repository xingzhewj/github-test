/**
 * 元素创建
 */
define(function(require) {
    var exports = {};

    /**
     * 设置多个样式
     * 
     * @inner
     * @param {HTMLElement} ele 
     * @param {Object} options
     */
    function setStyles(ele, options) {
        for (var key in options) {
            if (options.hasOwnProperty(key)) {
                setStyle(ele, key, options[key]);
            }
        }
    }

    /**
     * 隐藏元素
     *
     * @public
     * @param  {HTMLElements} eles 元素集合数组
     */
    function hide(eles) {
        if (Object.prototype.toString.call(ele).indexOf('Array') !== -1) {
            var len = eles.length;
            while (len--) {
                eles[len].style.display = 'none';
            }
        }
    }

    function attributeName(name) {
        var ie = brower.ie;
        var map = {};

        if (ie < 8) {
            map['for'] = 'htmlFor';
            map['class'] = 'className';
        }
        else {
            map.htmlFor = 'for';
            map.className = 'class';
        }

        return map[name] || name;
    }

    /**
     * [createDom description]
     * @param  {[type]} tagName    [description]
     * @param  {[type]} options    [description]
     * @param  {[type]} parentNode [description]
     * @return {[type]}            [description]
     */
    function createDom(tagName, options, parentNode) {
        var ele = document.createElement(tagName);

        for (var key in options) {
            if (options.hasOwnProperty(key)) {
                if (key == 'styles') {
                    setStyles(ele, options[key]);
                } else {
                    ele.setAttribute(attributeName(key), options[key]);
                }
            }
        }

        if (parentNode) {
            parentNode.appendChild(ele);
        }

        return ele;
    }

    /**
     * 判断元素是否有对应的class
     *
     * @param {HTMLElement} el 元素
     * @param {string} className class名
     *
     * @return {boolean}
     */
    function hasClass(el, className) {
        var classes = el.className.split(' ');
        for (var i = 0; i < classes.length; i++) {
            if (className === classes[i]) {
                return true;
            }
        }
        return false;
    }

    /**
     * 添加删除class
     *
     * @param {HTMLElement} el 元素
     * @param {string} className class的名称
     * @param {boolean} isAdd 是否是添加class
     *
     */
    function modifyClass(el, className, isAdd) {
        var classNameStr = el.className;
        var classes = classNameStr.split(/\s/);
        var set = {};
        for (var i = 0; i < classes.length; i++) {
            set[classes[i]] = true;
        }

        if (isAdd) {
            set[className] = true;
        }
        else {
            delete set[className];
        }

        classes = [];
        for (var key in set) {
            if (set.hasOwnProperty(key)) {
                classes.push(key);
            }
        }
        el.className = classes.join(' ');
    }

    /**
     * 为元素添加class
     *
     * @param {HTMLElement} el 元素
     * @param {string} className class名称
     */
    function addClass(el, className) {
        modifyClass(el, className, true);
    }

    /**
     * 为元素删除class
     *
     * @param {HTMLElement} el 元素
     * @param {string} className class名称
     */
    function removeClass(el, className) {
        modifyClass(el, className, false);
    }

    /**
     * 把html转为dom结构添加到指定节点最后
     * @param  {string} html html字符串
     * @param  {?HTMLElement} 插入的位置
     *
     * @return {Array.<HTMLElement>} 生成的dom树
     */
    function appendHTML(html, node) {
        html = html || '';
        var tempEl = document.createElement('div');
        tempEl.innerHTML = html;
        if (node) {
            while (tempEl.firstChild) {
                node.appendChild(tempEl.firstChild);
            }
        }
        return tempEl.childNodes;
    }

    /**
     * 把节点数组插入到对应的父节点
     *
     * @param {HTMLElement} nodes 待插入的元素
     * @param {HTMLElement} node 父节点
     *
     * @return 
     */
    function appendNodes(nodes, node) {
        nodes = nodes || [];
        while(nodes[0]) {
            node.appendChild(nodes[0]);
        }
    }

    /**
     * 创建文档碎片
     * 
     * @return {HTMLElement} 文档碎片dom
     */
    function appendDom() {
        var fragEle = document.createDocumentFragment();
        return fragEle;
    }

    /**
     * [createIframe description]
     * @param  {[type]} id   [description]
     * @param  {[type]} name [description]
     * @param  {[type]} wrap [description]
     * @return {[type]}      [description]
     */
    function createIframe(id, name, wrap) {
        var ie = brower.ie;
        var eleName = ie < 9 ? '<iframe name="' + name + '">' : 'iframe';
        var iframe = document.createElement(eleName);
        iframe.setAttribute("id", id);
        iframe.setAttribute("name", name);
        iframe.style.display = 'none';
        iframe.setAttribute("src", "about:blank");
        if (wrap) {
            wrap.appendChild(iframe);
        }
        return iframe;
    }

    /**
     * 删除iframe
     * @param  {[type]} id [description]
     * @return {[type]}    [description]
     */
    function deleteIframe(id) {
        var iframe = document.getElementById(id);
        document.removeChild(iframe);
    }

    /**
     * 获取元素
     * @param  {string|HTMLElement} id 元素id
     * @return {HTMLElement}    元素
     */
    function g(id) {
        if (Object.prototype.toString.call(id) === '[object String]') {
            return document.getElementById(id);
        }
        else {
            return id;
        }
    }

    /**
     * 判断el是否在container之内
     *
     * @param {HTMLElement} el
     * @param {HTMLElement} container
     *
     * @return {boolean}
     */
    function contain(el, container) {
        if (el === container) {
            return true;
        }
        else if (el === document.body) {
            return false;
        }
        else if (!el) {
            return false;
        }
        // 据说尾递归可以提升效率，能用尽量用吧
        return contain(el.parentNode, container);
    }

    /**
     * 滚动到底部
     *
     * @param {HTMLElement} el 需要滚动的元素
     *
     */
    function scrollToBottom(el) {
        el.scrollTop = el.scrollHeight - el.offsetHeight;
    }

    exports.createDom = createDom;
    exports.createIframe = createIframe;
    exports.deleteIframe = deleteIframe;
    exports.hide = hide;
    exports.appendDom = appendDom;
    exports.appendNodes = appendNodes;
    exports.appendHTML = appendHTML;
    exports.g = g;
    exports.contain = contain;
    exports.scrollToBottom = scrollToBottom;
    exports.addClass = addClass;
    exports.removeClass = removeClass;
    exports.hasClass = hasClass;

    return exports;
});
