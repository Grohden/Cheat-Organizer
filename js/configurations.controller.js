app.controller("configurationsController",function($scope,$http){
    $http.get("json/configurations.json").then(function (response){
        var brute_object = JSON.parse(JSON.stringify(response.data));
        $scope.games_folder=brute_object.games_folder;
    });
    
    $scope.get_folder=function(){
        var chooser = $("#folderDialog");
        chooser.unbind('change');
        chooser.change(function(evt) {
            $scope.games_folder=$(this).val();
            $scope.$apply();
        });
        chooser.trigger('click');
    }
    
    $scope.hide=function(){
        $("#toggle").trigger('click');
    }
});