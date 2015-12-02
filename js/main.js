$(function(){
    var os=require('os');
    var gui=require('nw.gui');
    var fs=require('fs');
    var id3=require('id3js');
        
    function put_in_active(element){
        list=document.createElement("li");
        list.innerHTML=element;
        $(".active").append(list);
    }
    
    function put_in_deactive(element){
        list=document.createElement("li");
        list.innerHTML=element;
        $(".deactive").append(list);
    }

    
    
    function get_all_cheats(){
        var folder="D:/PS2/CHT";
        fs.readdirSync(folder).forEach(put_in_active);
        fs.readdirSync(folder+"/DEACTIVATED").forEach(put_in_deactive);
    }
    get_all_cheats();
});




