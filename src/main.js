var file = require('./common/file');
var config = require('./data/config');

function cb(msg) {
    console.log(msg);
}

exports.initProject = function (args) {

    var arguments = args.splice(2);

    if (arguments[0] === 'init') {
        file.mkdir(config.basePath + config.config.path + config.config.brower, cb);
    }

    console.log(arguments);
};