app.directive(
    'showCase',
    function() {

        // Return the directive configuration.
        return({
            controller: 'showCaseController',
            link: link,
            restrict: 'A',
            templateUrl: 'templates/show_case.html'
        });

        // I bind the JavaScript events to the scope.
        function link( scope, element, attributes ) {
            console.info( 'Showcase directive linking.' );
        }

    }



);