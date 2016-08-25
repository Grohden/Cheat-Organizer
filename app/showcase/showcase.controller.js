(function () {
    'use strict';
    /*global angular, require*/
    angular.module('showcase').controller('showCaseController', function ($scope, sharedConfigurations) {
        var _self = this;
        var fs = require('fs');
        $scope.configs = sharedConfigurations;
        $scope.openedGame = null;
        $scope.expanded = false;
        $scope.NOT_FOUND_COVER = 'D:\\Cheat-Organizer\\assets\\img\\404.jpg';

        $scope.exists = function (file) {
            return fs.existsSync(file);
        };

        $scope.buildArtPath = function buildArtPath(code) {
            return ;
        }

        /**
         * Read specified path, search for ISOs with OPL name format
         * and return an object array containing id, title, and code.
         * @returns {Array}
         */
        _self.getGamesObject = function () {
            if ($scope.configs.text === undefined) return;
            var ISOs = fs.existsSync($scope.configs.text[0].value + "\\DVD\\") ? fs.readdirSync($scope.configs.text[0].value + "\\DVD\\") : [];
            var basePath = $scope.configs.text[0].value;

            return ISOs.map(function (iso) {
                var obj = {};
                obj.id = iso;
                obj.code = iso.slice(0, 11);
                obj.title = iso.slice(12, iso.length - 4);
                obj.artPath = basePath+'\\ART\\'+obj.code+'_COV.png';
                return obj;
            });

        };

        $scope.$watch('configs.text[0].value', function() {
            $scope.games = _self.getGamesObject();
            console.log($scope.games);
        });

        $scope.openInContainer = function openInContainer(gameObject){
            $scope.openedGame = gameObject;
            console.log($scope.expanded);
            $scope.expanded = $scope.expanded == gameObject.code ? false  : gameObject.code;
        }

    });
}());