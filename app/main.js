(function () {
    'use strict';
    /*global require*/
    /* Node */
    var fs = require('fs');
    var F5 = 116;

    //F5 refresh
    document.addEventListener('keydown', function (event) {
        if (event.keyCode === F5) {
            location.reload();
        }
    });
}());