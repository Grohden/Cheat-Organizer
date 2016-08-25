(function () {
    'use strict';
    /*global angular*/
    angular.module('showcase').directive(
        'showCase',
        function () {
            return {
                controller: 'showCaseController',
                templateUrl: 'app/showcase/showcase.template.html'
            };
        }
    );
}());