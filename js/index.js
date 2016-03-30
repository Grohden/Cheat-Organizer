var os = require('os');
var gui = require('nw.gui');
var fs = require('fs');
var oplFolders;

//Future myself need to change this to a object(it's better to refresh those, they change when save the congfigs.)
var showBy;
var showGameTitle;
var flipster;

//Live Reload
fs.watch("D:\\Projects\\Cheat-Organizer", function() {
    if (location)
      location.reload();
  });
fs.watch("D:\\Projects\\Cheat-Organizer\\css", function() {
    if (location)
      location.reload();
  });
fs.watch("D:\\Projects\\Cheat-Organizer\\js", function() {
    if (location)
      location.reload();
  });

//F5 refresh
document.addEventListener('keydown', function(event) {
    if(event.keyCode==116)location.reload();
});

$(document).ready(function(){
    //Ready functions.
    setConfigsToHTML();
         
    //Click listeners.
    $("#cog").click(function(){
        $("#background-modal").fadeToggle();
        $("#config-modal").fadeToggle();
    });
    
    $("#save").click(function(){
        $("#config-modal").fadeOut();
        $("#background-modal").fadeOut();
        saveConfigs();
        console.log("modal")
    });
    
    $("#background-modal").click(function(){
        $(this).fadeOut();
        $("#config-modal").fadeOut();
    });
    
    $("#search").click(function(){
        choosePath("#fileDialog")
    });
    
    $(".cheat-container").click(function(){
        $($(this).children()[0].firstChild).trigger("click");
        });

    $("#activate").click(function(){})

    //thx to serializeArray not return unchecked box i need to do this with a hidden checkbox.
    $("input[name=show_title][value='true']").click(function(){
        if(this.checked){$("input[name=show_title][value='false']").prop("checked",false);}
        else{$("input[name=show_title][value='false']").prop("checked",true);}
        
    });
    
    //Prevent enter key on form(TODO:improve later).
    $(window).keydown(function(event){
        if(event.keyCode == 13) {
          event.preventDefault();
          return false;
        }
    }); 
});

function whenJSONReadFinished(){
    readCheat("SLUS_207.07.cht");
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

function setConfigsToHTML(){
    $.getJSON("configs/configs.json",function(data){

        //make data global.
        showBy      =data[Object.keys(data)[0]]; 
        showGameTitle= data[Object.keys(data)[1]];
        oplFolder=data[Object.keys(data)[2]];
        oplFolders={
            root:oplFolder,
            ART:oplFolder+"\\ART\\",
            DVD:oplFolder+"\\DVD\\",
            CD: oplFolder+"\\CD\\",
            CHT:oplFolder+"\\CHT\\",
            CFG:oplFolder+"\\CFG\\"
        };

        //put the configs on html form.
        //TODO:stop doing unreadable code and stop tryin make 'universal' funcitons.
        $('input:radio[name='+Object.keys(data)[0]+']').filter('[value='+showBy+']').prop('checked', true);
        
        $("#path").val(data[$("#configs_form").serializeArray()[2].name]);
        
        //I need to say thx to whoever did the serializeArray not return unchecked boxes, really dude, u fucked my plans.
        if(data[Object.keys(data)[1]]!="true"){
            $("input[name=show_title][value=true]").trigger('click'); 
        };
               
        configureFlipster();
        whenJSONReadFinished();
    });
}

function createFlipsterItem(imageName){
    if(!imageName.includes("COV")) return;
	var list = document.createElement("li");
    var img = document.createElement("img");
    $(img).attr("src", oplFolders.ART+imageName);
    list.appendChild(img);
    $("#flipster-ul").append(list);
}

function configureFlipster(){
    $("#flipster-ul").empty();

    //configure flipster(TODO:implement assicronous dir read)
    if(fs.existsSync(oplFolders.ART)){
        var artArchieves=fs.readdirSync(oplFolders.ART);
		//TODO:fix reading of all archieves on folder, it only need COVERS or BGS
        artArchieves.forEach(createFlipsterItem);
        var flpStyle= artArchieves.length>3 ? 'coverflow':'flat';
        flipster = $('.my-flipster').flipster({style:flpStyle, spacing: -0.25});
        flipster.flipster('index');
    } else {
            $(".my-flipster").css({
                'background': 'url(https://c2.staticflickr.com/8/7225/7210160572_f5b2a58e7e_b.jpg) no-repeat center', 
                // TODO:create a T.A.R.D.I.S. image for folder not found.
                'background-size':'contain'});
    }   
}

function readCheat(name){
    fs.readFile(oplFolder.CHT+name, "utf8", function (error, data) {
        console.log(error ? "Error, cheat not found." : "Cheat found.");
        /* Here we have some problem..and some solution:
         * Omniconverter split the cheats by \n\r, this helps
         * but if the user dont use ominiconverter or simply type the characters on a txt
         * the carriage return will not be present and the split will not work.
         * TODO: solve this later.
         */
    });
}

function saveConfigs(){
    var outputFolder ='configs/';
    var outputFilename = outputFolder+'configs.json';
    var formObject={};

    $("#configs_form").serializeArray().forEach(function(element){
		formObject[element.name]=element.value;
	});
    
    configureFlipster();

    fs.writeFile(outputFilename, JSON.stringify(formObject), function(err) {
        console.log(err ? "Error saving file:" + err : "JSON saved to " + outputFilename);
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

function factoryButton(){
	var buttons=[];
	return{
		createInstance:function (){
			return 0;	
	 	}
	}
}


//TODO: Implement this, its working but it need to be somewhere.
fs.readFile('D:\\PS2\\CFG\\SLUS_208.98.cfg',{encoding:"UTF-8"}, function(err, data) {
  if (err) throw err;
  var something={};
	a=data.split("\n");
	a.forEach(function (element){
		element=element.split("=");
		something[element[0]]=element[1];
	});
	console.log(something);
});