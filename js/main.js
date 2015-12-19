//F5 refresh
document.addEventListener('keydown', function(event) {if(event.keyCode==116)location.reload()});

function open_above(current_window, new_window) {
    new_window.show();
    current_window.minimize();
    new_window.focus();
}

/*
    var path = './';
    var fs = require('fs');

      fs.watch(path, function() {
        if (location)
          location.reload();
      });
*/



