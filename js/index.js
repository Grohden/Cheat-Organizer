/* Node */
var os = require('os');
var gui = require('nw.gui');
var fs = require('fs');

//Live Reload
fs.watch('D:\\Projects\\Cheat-Organizer', function() {
    if (location)
      location.reload();
  });

fs.watch('D:\\Projects\\Cheat-Organizer\\css', function() {
    if (location)
      location.reload();
  });

fs.watch('D:\\Projects\\Cheat-Organizer\\js', function() {
    if (location)
      location.reload();
  });

//F5 refresh
document.addEventListener('keydown', function(event) {
    if(event.keyCode==116)location.reload();
});

/* Angular */
var app = angular.module('CheatsApp', []);

app.service('configs',function configs(){
    var configs=this;
    configs.folder='undefined';
})
