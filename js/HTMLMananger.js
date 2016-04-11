/// <reference path="..\\libs\\node.d.ts" />
"use strict";
var fs = require('fs');
var HTMLMananger = (function () {
    function HTMLMananger() {
    }
    HTMLMananger.prototype.init = function () {
        var tst = JSON.parse(fs.readFileSync("configs.json", "UTF-8"));
        console.log(tst);
    };
    return HTMLMananger;
}());
window.onload = function () {
    var mananger = new HTMLMananger();
    mananger.init();
};
