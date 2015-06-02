define(function (require) {

    'use strict';

    var view = require('./embed/view');

    function main () {
        
        require('cl!./css/main.css');

        view.init();
    }

    main();
});
