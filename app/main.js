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
        putHalfCogAtLeft();
    });

    $('.cog-opened img').ready(function(){
        putHalfCogAtLeft();
    });
}());


var putHalfCogAtLeft = function putHalfCogAtLeft() {
    var cog = $('.cog-opened img')[0];
    if (!cog) return;

    var dimens = cog.getBoundingClientRect();
    writeInStyleTag('.cog-opened img',{left:-(dimens.width / 2)+'px'});
    cog.style.marginLeft = 0;
};

//rewrites style tag. style tag loses its content when this function is called.
var writeInStyleTag = function writeInSyleTag(classOrId, obj = {}) {
    if(!classOrId) return;
    var str="\n"+classOrId+"{";
    for(var x=0; x<Object.keys(obj).length;x++){
        str+="\n"+Object.keys(obj)[x]+":"+obj[Object.keys(obj)[x]]+";";
    }
    str+="\n}";
    //override content
    $('#main-style').text(str);
};