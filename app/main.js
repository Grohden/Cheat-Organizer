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

    //makes the opened cog be always at its half on the screen
    $(window).resize(function(){
        hideHalfCog();
    });

    $('.cog-opened img').ready(function(){
        hideHalfCog();
    });
}());


/**
 * Places the cog in half on the left side of the screen
 */
var hideHalfCog = function hideHalfCog() {
    var cog = $('.cog-opened img')[0];
    if (!cog) return;

    var dimens = cog.getBoundingClientRect();
    document.body.style.setProperty('--cog-left-pos', -(dimens.width / 2)+'px');
};
