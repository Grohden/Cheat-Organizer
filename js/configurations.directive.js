app.directive(
    "configurations",
    function() {

        // Return the directive configuration.
        return({
            controller: "configurationsController",
            link: link,
            restrict: "A",
            templateUrl: "templates/configurations.html"
        });

        // I bind the JavaScript events to the scope.
        function link( scope, element, attributes ) {
            console.info( "Configurations directive linking." );
        }

    }



);