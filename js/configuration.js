/// <reference path="..\\libs\\node.d.ts" />
"use strict";
var fs = require('fs');
var Configuration = (function () {
    function Configuration(path) {
        this.path = path;
        this.files = fs.readdirSync(path);
        console.log(this.files[0]);
    }
    //Provide a object with configurations.
    Configuration.prototype.getFileContent = function (fileName) {
        var contentObject = {};
        var splitedArray = fs.readFileSync(this.path + fileName, 'UTF-8').split("\n");
        splitedArray.forEach(function (element) {
            if (element.length == 0)
                return;
            var itemArr = element.split("=");
            contentObject[itemArr[0]] = itemArr[1];
        });
        return contentObject;
    };
    Configuration.prototype.saveFile = function (fileContentObject, fileName) {
        var content = "";
        Object.keys(fileContentObject).forEach(function (key, index, array) {
            content = content.toString() + key.toString() + "=" + fileContentObject[key] + "\n";
        });
        console.info(content);
        fs.writeFileSync(this.path + fileName, content, 'UTF-8');
    };
    return Configuration;
}());
var a = new Configuration("D:\\PS2\\CFG\\");
