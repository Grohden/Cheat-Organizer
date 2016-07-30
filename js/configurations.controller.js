app.controller('configurationsController',function($scope,$http,configs){
    
    $scope.gamesFolder=configs.folder;
    
    $http.get('json/configurations.json').then(function (response){
        var bruteObject = JSON.parse(JSON.stringify(response.data));
        $scope.gamesFolder=bruteObject.games_folder;
    });
    
    $scope.getFolder=function(){
        console.log("getFolder()"); 
        var chooser = $('#folderDialog');
        chooser.unbind('change');
        chooser.change(function(evt) {
            $scope.gamesFolder=$(this).val();
            $scope.$apply();
            
        });
        chooser.trigger('click');
    }
    
    $scope.hide=function(){
        $('#toggle').prop( 'checked', false );
    }
    
});