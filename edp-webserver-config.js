exports.port = 8898;
exports.directoryIndexes = true;
exports.documentRoot = __dirname;
var epr = require('edp-provider-rider');
var riderPlugin = epr.plugin();
exports.getLocations = function () {
    return [
    {
        location: /\/$/,
        handler: home('entry/index.html')
    },
    {
        location: /\.css($|\?)/,
        handler: [
            autostylus({
                use: riderPlugin
            })
        ]
    },
    {
        location: /^\.less($|\?)/,
        handler: [
            file(),
            less()
        ]
    },
    { 
        location: /\.tpl\.js($|\?)/, 
        handler: [
            html2js()
        ]
    },
    {
        location: /^.*$/,
        handler: [
            file(),
            proxyNoneExists()
        ]
    },
    { 
        location: /\.tpl\.js($|\?)/, 
        handler: [
            html2js()
        ]
    }
    ];
};

exports.injectResource = function ( res ) {
    for ( var key in res ) {
        global[ key ] = res[ key ];
    }
};
