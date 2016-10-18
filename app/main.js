(function () {
    'use strict';
    /*global require*/
    /* Node */
    var fs = require('fs');
    var F5 = 116;

    var bodyStyles = window.getComputedStyle(document.body);
    const COG_LEFT_POS = '--cog-left-pos';
    const COG_ANIMATION_TIMING = '--cog-animation-timing';

    //F5 refresh
    document.addEventListener('keydown', function (event) {
        if (event.keyCode === F5) {
            location.reload();
        }
    });

    /**
     * Places the cog in half on the left side of the screen
     */
    var hideHalfCog = function hideHalfCog() {
        //Because i've set in less that the height will always be 100% the calc will be using innerHeight
        document.body.style.setProperty(COG_LEFT_POS, (-window.innerWidth)+(window.innerHeight/2)+'px');
    };


    //makes the opened cog be always at its half on the screen
    $(window).resize(function(){
        hideHalfCog();
    });

    var init= function init(){
        hideHalfCog();
    };


    $(document).ready(init);

}());


