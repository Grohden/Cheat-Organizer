var os = require('os');
var gui = require('nw.gui');
var fs = require('fs');

//F5 refresh
document.addEventListener('keydown', function(event) {if(event.keyCode==116)location.reload()});

$(document).ready(function(){
    //Ready functions.
    setConfigsToHTML();
    

     
    //Click listeners.
    $("#cog").click(function(){
       /* // Get the current window
        var win = gui.Window.get();

        var window_configs={
            resizable:false,
            position: 'center',
            width:510,
            height:400,
            "toolbar":true,
            fullscreen:false
        }

        // Create a new window and get it
        var new_win = gui.Window.open('configs/configs.html',window_configs);*/
        $("#cover-modal").fadeToggle();
        $("#background-modal").fadeToggle();
    });
    
    $("#save").click(function(){
        saveConfigs();
        $("#cover-modal").fadeOut();
        $("#background-modal").fadeOut();
    });
    
    $("#cover-modal").click(function(){
        $(this).fadeOut();
        $("#background-modal").fadeOut();
    });
    
    $("#search").click(function(){
        choosePath("#fileDialog")
    });
    
    //Prevent enter key on form(TODO:improve later).
    $(window).keydown(function(event){
        if(event.keyCode == 13) {
          event.preventDefault();
          return false;
        }
    });
    
});

function putFlipsterImages(element, index, array){
    list = document.createElement("li");
    img = document.createElement("img");
    $(img).attr("src", $("#configs_form").serializeArray()[1].value+"\\art\\"+element);
    list.appendChild(img);
    $("#flipster-ul").append(list);
}

function choosePath(name) {
    var chooser = $(name);
    chooser.unbind('change');
    chooser.change(function(evt) {
        console.log($(this).val());
        $("#path").val($(this).val());
    });
    chooser.trigger('click');  
}

//Need to pay atention to $.getJSON, it's an assycronous function, there's some actions we can only realize in the function callback
function setConfigsToHTML(){
    $.getJSON("configs/configs.json",function(data){
        //put the configs on html form.
        $("#path").val(data.opl_folder);
        var $radios = $('input:radio[name=show_by]');
        switch(data.show_by){
            case "Cape":
                $radios.filter('[value=Cape]').prop('checked', true);
                break;
            case "Background":
                $radios.filter('[value=Background]').prop('checked', true);
                break;
            }
        //configure flipster
        fs.readdirSync(data.opl_folder+"\\art").forEach(putFlipsterImages);
        $('.my-flipster').flipster();
    });
};
    
function saveConfigs(){
    var fs = require('fs');
    //Pay attention to case sensitive on proprieties
    var arr={
        "first_run":false,
        "show_by":$("#configs_form").serializeArray()[0].value,
        "opl_folder":$("#configs_form").serializeArray()[1].value
    }
    var outputFilename = 'configs/configs.json';

    fs.writeFile(outputFilename, JSON.stringify(arr), function(err) {
        if(err) {
          console.log(err);
        } else {
          console.log("JSON saved to " + outputFilename);
        }
    });
}

function put_in_active(element) {
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
    var fs = require('fs');
    var folder = "D:/PS2/ART";
    fs.readdirSync(folder).forEach(put_in_active);

}



