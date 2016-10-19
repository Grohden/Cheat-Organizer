(function () {
    'use strict';
    /*global angular,console*/
    
    var link = function (scope, element, attrs, ctrl) {
        element.bind('click', function () {
            ctrl.saveConfigurations();
        });
    };
    
    angular.module('configurations').directive(
        'persistAll',
        function () {
            return {
                restrict: 'A',
                require: '^configurations',
                scope: {},
                link: link
            };
        }
    );
}());