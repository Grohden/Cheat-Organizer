(function () {
    'use strict';
    /*global angular, require*/
    angular.module('showcase').controller('showCaseController', function ($scope, sharedConfigurations) {
        
        $scope.notFoundCover = '.assets\\img\\404.jpg';

        $scope.configs = sharedConfigurations;

        $scope.exists = function (file) {
            var fs = require('fs');
            return fs.existsSync(file);
        };

        
        $scope.$watch('configs.folder', function() {
            $scope.games = $scope.getGamesObject();
        });
        
        
        $scope.getGamesObject = function () {
            var fs = require('fs');
            var folder = $scope.configs.folder;
            var ISOs = fs.existsSync(folder + '\\DVD\\') ? fs.readdirSync(folder + '\\DVD\\') : [];
            var gamesObj = [];
            var x = 0;
                                    
            for (x = 0; x < ISOs.length; x++) {
                gamesObj.push({
                    id: x,
                    code: ISOs[x].slice(0, 11),
                    title: ISOs[x].slice(12, ISOs[x].length - 4)
                });
            }
            
            return gamesObj;
        };

        $scope.games = $scope.getGamesObject();

    });
}());