/// <reference path="..\\libs\\node.d.ts" />

import fs = require('fs');

class Configuration {
	private path:string;
	private files:Array<String>;
    public lastOpenFile:string;
    
	constructor(path:string){
		this.path = path;
        this.files = fs.readdirSync(path);
        console.log(this.files[0]);
	}
	
    //Provide a object with configurations.
    getFileContent(fileName:string){
        var contentObject={};
        var splitedArray=fs.readFileSync(this.path+fileName,'UTF-8').split("\n");
        
        splitedArray.forEach(function (element:string){
			if (element.length==0) return;
			var itemArr=element.split("=");
			contentObject[itemArr[0]]=itemArr[1];
		});
        return  contentObject; 
    }
    
    saveFile(fileContentObject:Object,fileName:string){
        var content="";

        Object.keys(fileContentObject).forEach(function(key:string,index:number,array:string[]){
            content=content.toString()+key.toString()+"="+fileContentObject[key]+"\n";
            });
        console.info(content);
        fs.writeFileSync(this.path+fileName,content,'UTF-8');  
    }
}

let a = new Configuration("D:\\PS2\\CFG\\");