(function () {
    'use strict';
    /*global angular*/
    angular.module('showcase').component(
        'showCase',
        {
            controller: 'showCaseController',
            templateUrl: 'app/showcase/showcase.template.html'
        }
    );
}());