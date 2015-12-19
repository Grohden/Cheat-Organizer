$(function () {
    "use strict";
    var os = require('os');
    var gui = require('nw.gui');
    var fs = require('fs')
    $("#search").click(function(){chooseFile("#fileDialog");});
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



$("#save").click(function(){
    alert($("#configs_form").serializeArray()[0].value);
    
    
})



