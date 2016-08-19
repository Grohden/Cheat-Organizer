(function () {
    'use strict';
    /*global angular, console*/
    angular.module('configurations').directive(
        'configurations',
        function () {
            return {
                restrict: 'E',
                controller: 'configurationsController'
            };
        }
    );
}());