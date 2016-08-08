(function () {
    'use strict';
    /*global angular*/
    angular.module('configurations').factory('sharedConfigurations', function () {
        var myService = {
            folder: 'bounce'
        };
        return myService;
    });
    
}());