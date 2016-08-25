(function () {
    'use strict';
    /*global angular, console*/
    var link = function (scope, element, attrs, controllersArray) {
        var ctrl = controllersArray[0];
        var id = scope.$id;

        ctrl.registerOption(element, id); //register element on elements list.
        
        /* http callback function*/
        ctrl.loadData(attrs, id);

    };
    
    angular.module('configurations').directive(
        'persistValue',
        function () {
            return {
                require: ['^configurations'],
                scope: {},
                link: link
            };
        }
    );
}());