app.controller('showCaseController',function($scope,configs){    
    
    $scope.gamesFolder = configs.folder;
    
    $scope.getGamesObject=function(){
        var folder='D:\\PS2';//$scope.gamesFolder;
        //Registry games iso and put then in a object.
        if(!fs.existsSync(folder+'\\DVD\\')){ 
            console.info(folder+" isnt a valid folder");
            return; 
        }
        
        var ISOs=fs.readdirSync(folder+'\\DVD\\');
        var gamesObj=[];
        
        for(x=0;x<ISOs.length;x++){
           gamesObj.push({
              "code":ISOs[x].slice(0,11),
              "title":ISOs[x].slice(12,ISOs[x].length-4)
            });
        }
        return gamesObj;
    }
    
    $scope.games=$scope.getGamesObject();
});