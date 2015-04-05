define(function (require) {

    var fs = require('fs');

    var exports = {};

    /**
     * 删除文件
     * @param  {string} path 文件路径
     * @return {Object}      结果对象
     */
    exports.unlink = function (path) {
        fs.unlink(path, function(err) {
            if (err) throw err;
            return {
                status: 0,
                info: 'delete file sucess'
            };
        });
    };

    exports.write = function (path, content) {
        fs.writeFile(path, content, function (err) {
            if (err) throw err;
            return {
                status: 0,
                info: 'write content sucess'
            };
        });
    };

    exports.rename = function (nameOld, nameNew) {
        fs.rename(nameOld, nameNew, function (err) {
            if (err) throw err;
            return {
                status: 0,
                info: 'rename sucess'
            }
        });
    };

    exports.exists = function (path) {
        fs.exists(path, function (err) {
            if (err) throw err;
            return {
                status: 0,
                info: 'it is exist'
            };
        });
    };

    return exports;
});