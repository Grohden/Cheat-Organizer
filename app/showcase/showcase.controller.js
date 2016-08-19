(function () {
    'use strict';
    /*global angular, require*/
    angular.module('showcase').controller('showCaseController', function ($scope, sharedConfigurations) {
        var _self = this;
        var fs = require('fs');
        $scope.configs = sharedConfigurations;
        $scope.NOT_FOUND_COVER = 'D:\\Cheat-Organizer\\assets\\img\\404.jpg';
        $scope.b='.\\assets\\img';


        $scope.exists = function (file) {
            return fs.existsSync(file);
        };

        /**
         * Read specified path, search for ISOs with OPL name format
         * and return an object array containing id, title, and code.
         * @returns {Array}
         */
        _self.getGamesObject = function () {
            if ($scope.configs.text === undefined) return;
            var ISOs = fs.existsSync($scope.configs.text[0].value + "\\DVD\\") ? fs.readdirSync($scope.configs.text[0].value + "\\DVD\\") : [];
            console.log(ISOs.length,ISOs);

            return ISOs.map(function (iso) {
                return {
                    id: iso,
                    code: iso.slice(0, 11),
                    title: iso.slice(12, iso.length - 4)
                };
            });

        };


        $scope.$watch('configs.text[0].value', function() {
            $scope.games = _self.getGamesObject();
            console.log($scope.games);
        });

    });
}());