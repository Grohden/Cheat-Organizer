(function () {
    'use strict';
    /*global angular*/
    angular.module('CheatsApp', ['configurations', 'showcase'])
        .controller('mainController',function () {
            /* Function to hide cog modal*/
            $scope.hideToggleModal= function hide(){
                $('#toggle').prop('checked', false);
            };
        });
}());