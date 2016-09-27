(function () {
    'use strict';
    /*global angular, require*/
    angular.module('showcase').controller('showCaseController', function ($scope, sharedConfigurations, $window) {
        var _self = this;
        var fs = require('fs');
        $scope.configs              = sharedConfigurations;
        $scope.openedGame           = null;
        $scope.expanded             = false;
        $scope.NOT_FOUND_COVER      = 'D:\\Cheat-Organizer\\assets\\img\\404.jpg';

        $scope.exists = function (file) {
            return fs.existsSync(file);
        };

        //TODO
        $scope.buildArtPath = function buildArtPath(code) {
            return ;
        }

        /**
         * Read specified path, search for ISOs with OPL name format
         * and return an object array containing id, title, and code.
         * @returns {Array}
         */
        _self.getGamesObject = function () {
            if ($scope.configs.text === undefined) return;
            var ISOs = fs.existsSync($scope.configs.text[0].value + "\\DVD\\") ? fs.readdirSync($scope.configs.text[0].value + "\\DVD\\") : [];
            var basePath = $scope.configs.text[0].value;

            return ISOs.map(function (iso) {
                var obj = {};
                obj.id      = iso;
                obj.code    = iso.slice(0, 11);
                obj.title   = iso.slice(12, iso.length - 4);
                obj.artPath = basePath+'\\ART\\'+obj.code+'_COV.png';
                return obj;
            });

        };

        $scope.$watch('configs.text[0].value', function() {
            $scope.games = _self.getGamesObject();
            console.log($scope.games);
        });

        $scope.manageGameContainer = function openInContainer(gameObject,event) {
            $scope.openedGame   = gameObject;
            $scope.expanded     = $scope.expanded == gameObject.code ? false : gameObject.code;

            var bounds          = event.currentTarget.getBoundingClientRect();
            var container       = $('#show-container');
            var containerChilds = container.find('.show-content-container')[0];

            //FIXME: visibility doesn't hidde element before container animation
            $(event.currentTarget).animate({visibility:'hidden'},10);
            containerChilds.style.opacity = 0 ;

            //Copy the element caller position
            container.css({
                width:  bounds.width  + "px",
                height: bounds.height + "px",
                left:   bounds.left   + "px",
                right:  bounds.right  + "px",
                top:    bounds.top    + "px",
                bottom: bounds.bottom + "px"
            });

            var time = $(window).width()<1055 ? 10 : 500; //if screen is small it doesnt need the first animation(center).
            //animate to prefixed values.
            container.animate({
                left: ($(window).width()/2)-(bounds.width/2) //center the item.
            }, time, function () {
                container.animate({
                    width:  90 + "%",
                    height: 90 + "%",
                    left:    5 + "%",
                    right:   5 + "%",
                    top:     5 + "%",
                    bottom:  5 + "%"
                });

                $( containerChilds ).fadeTo( "slow", 1 );

            });



        };
    });
}());