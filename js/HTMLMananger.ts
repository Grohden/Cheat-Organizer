/// <reference path="..\\libs\\node.d.ts" />

import fs = require('fs');

class HTMLMananger{
    
    init(){
        var tst=JSON.parse(fs.readFileSync("configs.json","UTF-8"));
        console.log(tst);
        /* so , i`m going to implement this
         * in two diferent ways, one relative to the html order , so if it * changes i don't need to change the code
         * and the other, maybe for security or tests,
         */
        
    }
    
}

window.onload=()=>{
    let mananger=new HTMLMananger();
    mananger.init();
}