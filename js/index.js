$(function () {
    "use strict";
    var os = require('os');
    var gui = require('nw.gui');
    var fs = require('fs');
       
/*    function put_in_active(element) {
        list = document.createElement("li");
        list.innerHTML = element;
        $(".active").append(list);
    }
    
    function put_in_deactive(element) {
        list = document.createElement("li");
        list.innerHTML = element;
        $(".deactive").append(list);
    }

    
    
    function get_all_cheats() {
        var folder = "D:/PS2/CHT";
        fs.readdirSync(folder).forEach(put_in_active);
        fs.readdirSync(folder + "/DEACTIVATED").forEach(put_in_deactive);
    }
    get_all_cheats();*/
    
    
    // Get the current window
    var win = gui.Window.get();

/*    // Create a new window and get it
    var new_win = gui.Window.open('configs/configs.html',{
        resizeble:false,
        position: 'center',
        width:510,
        height:400,
        "toolbar":false,
        fullscreen:false

        });*/
    // And listen to new window's focus event
    
    //open_above(win,new_win);
});




