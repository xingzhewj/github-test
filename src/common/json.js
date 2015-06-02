/**
 * @file 简单的JSON处理
 * @author cxl(chenxinle@baidu.com)
 */

define(function () {

    var handler = {};

    /**
     * 数字序列化
     *
     * @param {Array} data
     * @return {string}
     */
    handler.array = function (data) {
        var str = [];

        str.push('[');
        for (var i = 0, len = data.length; i < len; i++) {
            str.push(stringify(data[i]));
            str.push(',');
        }

        str.splice(str.length - 1, 1);
        str.push(']');
        
        return str.join('');
    };

    /**
     * 对象序列化
     *
     * @param {Object} data
     * @return {string}
     */
    handler.object = function (data) {
        if (data === null) {
            return 'null';
        }

        var str = [];

        str.push('{');
        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                str.push('"'+ key +'":');
                str.push(stringify(data[key]));
                str.push(',');
            }
        }

        str.splice(str.length - 1, 1);
        str.push('}');

        return str.join('');
    };

    /**
     * 字符串序列化
     *
     * @param {string} str
     * @return {string}
     */
    handler.string = function (str) {
        return '"' + str + '"';
    };

    /**
     * 获取数据类型
     *
     * @inner 
     * @param {Object} data
     * @return {string}
     */
    function getType(data) {
        var res = ({}).toString.call(data);

        res = res.substring(8, res.length - 1);

        return res.toLowerCase();
    }

    /**
     * 序列化变量
     * 
     * @inner
     * @param {Object} data
     * @return {string}
     */
    function stringify(data) {
        var item = handler[getType(data)];

        return item ? item(data) : '' + data;
    }

    return {
        /**
         * 解析JSON
         *
         * @public
         * @param {string} str
         * @return {Object}
         */
        parse: function (str) {
            var data = null;
            try {
                if (window.JSON && window.JSON.parse) {
                    data = window.JSON.parse(str);
                }
                else {
                    data = (new Function ('return (' + str + ');'))();
                }
            }
            catch (e) {}

            return data;
        },

        /**
         * 序列化
         * 
         * @public
         * @param {Object} data
         * @return {string}
         */
        stringify: function (data) {
            var str;

            if (window.JSON && window.JSON.stringify) {
                str = window.JSON.stringify(data);
            }
            else {
                str = stringify(data);
            }

            return str;
        }
    };
});
