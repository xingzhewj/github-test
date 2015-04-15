var fs = require('fs');

/**
 * 删除文件
 * @param  {string} path 文件路径
 * @return {Object}      结果对象
 */
exports.unlink = function(path) {
    fs.unlink(path, function(err) {
        if (err) throw err;
        return {
            status: 0,
            info: 'delete file sucess'
        };
    });
};

/**
 * 写入文件
 * @param  {[type]} path    [description]
 * @param  {[type]} content [description]
 * @return {[type]}         [description]
 */
exports.writeFile = function(path, content) {
    fs.writeFileSync(path, content, function(err) {
        if (err) throw err;
        return {
            status: 0,
            info: 'write content sucess'
        };
    });
};

/**
 * 重命名文件
 * @param  {[type]} nameOld [description]
 * @param  {[type]} nameNew [description]
 * @return {[type]}         [description]
 */
exports.rename = function(nameOld, nameNew) {
    fs.rename(nameOld, nameNew, function(err) {
        if (err) throw err;
        return {
            status: 0,
            info: 'rename sucess'
        }
    });
};

/**
 * 判断文件是否存在
 * @param  {[type]} path [description]
 * @return {[type]}      [description]
 */
exports.exists = function(path) {
    fs.exists(path, function(err) {
        if (err) throw err;
        return {
            status: 0,
            info: 'it is exist'
        };
    });
};

/**
 * 读取文件内容
 * @param  {[type]}   path [description]
 * @param  {Function} cb   [description]
 * @return {[type]}        [description]
 */
exports.readFile = function (path, cb) {
    fs.readFileSync(path, 'utf-8', function (err, content) {
        if (err) throw err;
        cb({
            status: 0,
            info: 'read sucess',
            data: {
                content: content
            }
        });
    })
};

/**
 * 创建文件夹
 * @param  {[type]}   path [description]
 * @param  {Function} cb   [description]
 * @return {[type]}        [description]
 */
exports.mkdir = function (path, cb) {
    fs.mkdir(path, function (err, cb) {
        if (err) throw err;
        cb({
            status: 0,
            info: 'brower sucess'
        });
    })
};
