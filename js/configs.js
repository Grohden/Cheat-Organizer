

$(function () {
    "use strict";
    var os = require('os');
    var gui = require('nw.gui');
    setConfigsToHTML();
    $("#search").click(function(){chooseFile("#fileDialog");});
    //setConfigsToHTML();
    $("#save").click(function(){
    console.log("b");
    saveConfigs();
})
});

function chooseFile(name) {
    var chooser = $(name);
    chooser.unbind('change');
    chooser.change(function(evt) {
        console.log($(this).val());
        $("#path").val($(this).val());
    });

    chooser.trigger('click');  
}

function setConfigsToHTML(){
    $.getJSON("configs.json",function(data){
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
    });
};
    
function saveConfigs(){
    var fs = require('fs');
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




