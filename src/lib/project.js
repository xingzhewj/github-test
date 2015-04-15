var file = require('./lib/file');

exports.init = function() {
    file.write('./test.txt', 'aaaa');
};