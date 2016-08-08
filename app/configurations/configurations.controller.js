(function () {
    'use strict';
    /*global angular, $*/
    angular.module('configurations').controller('configurationsController', function ($scope, $http, sharedConfigurations) {

        $scope.configs = sharedConfigurations;
        
        $http.get('app/configurations/configurations.data.json').then(function (response) {
            var bruteObject = response.data;
            $scope.configs.folder = bruteObject.games_folder;
        });

        $scope.getFolder = function () {
            var chooser = $('#folderDialog');
            chooser.unbind('change');
            chooser.change(function (evt) {
                $scope.configs.folder = $(this).val();
                $scope.$apply();

            });
            chooser.trigger('click');
        };

        $scope.hide = function () {
            $('#toggle').prop('checked', false);
        };
    });
}());