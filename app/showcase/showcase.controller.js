(function () {
    'use strict';
    /*global angular, require*/
    angular.module('showcase').controller('showCaseController', function ($scope, sharedConfigurations, $window) {
        const ALL = false;
        const TABLE = true;
        const INFO = false;
        const LOG = false;
        const WARNING = false;
        const DEBUG = false;

        var _self = this;

        var fs = require('fs');
        (ALL || DEBUG) && console.debug(fs);

        $scope.configs              = sharedConfigurations;
        $scope.openedGame           = null;
        $scope.expanded             = false;
        $scope.NOT_FOUND_COVER      = 'D:\\Cheat-Organizer\\assets\\img\\404.jpg';

        $scope.exists = function exists(file) {
            return fs.existsSync(file);
        };

        /**
         * Read specified path, search for ISOs with OPL name format
         * and return an object array containing id, title, and code.
         * @returns {Array}
         */
        _self.getGamesObject = function getGamesObject() {
            if ($scope.configs.text === undefined) return;
            var ISOs = fs.existsSync($scope.configs.text[0].value + "\\DVD\\") ? fs.readdirSync($scope.configs.text[0].value + "\\DVD\\") : [];
            var basePath = $scope.configs.text[0].value;
            (INFO || ALL) && console.info('Base path:',{basePath:basePath});

            return ISOs.map(function (iso) {
                var obj = {};
                obj.gameID      = iso;
                obj.code    = iso.slice(0, 11);
                obj.gameTitle   = iso.slice(12, iso.length - 4);
                obj.artPath = basePath+'\\ART\\'+obj.code+'_COV.png';
                obj.vmcPath = basePath+'\\VMC\\'+obj.code+'.bin';
                obj.chtPath = basePath+'\\CHT\\'+obj.code+'.cht';
                obj.isoPath = basePath+'\\DVD\\'+obj.gameID; //FIXME: check if existis in cd path
                obj.cheatsGroup =  fs.existsSync(obj.chtPath) && buildCheatGroupObject( fs.readFileSync(obj.chtPath,'UTF-8'));

                return obj;
            });
        };

        /**
         * Build a cheats group array.
         * @param {String} unformattedCheats a string read from cht file.
         * @return {Object.<cheatTitle, cheatCode>[]} cheatsGroup: an array containing cheats object.
         */
        var buildCheatGroupObject = function buildCheatGroupObject(unformattedCheats) {
            var regex = /(?:[0-9A-F\s]{18})+/; //Find any char in range 0-9 & A-F with 18 length, grouping it. Not global.
            var cheatsGroup = [];
            var matchedInRegex = regex.exec(unformattedCheats);

            (INFO || ALL) && console.info('\nGiven String:', {str: unformattedCheats});

            while (unformattedCheats.length>0 && matchedInRegex) {
                (INFO || ALL) && console.info("\nMatched in regex:", matchedInRegex);

                //Build a cheatObject
                var cheatObject = {
                    cheatTitle:  unformattedCheats.substr(0, matchedInRegex.index),
                    cheatCode: matchedInRegex[0]
                };

                //Put it in cheatsGroup Array
                cheatsGroup.push(cheatObject);

                //Slice the found cheat (title and code)
                unformattedCheats = unformattedCheats.substr(matchedInRegex.index+matchedInRegex[0].length+1, unformattedCheats.length);

                //Execute the regex again
                matchedInRegex = regex.exec(unformattedCheats);
            }

            (TABLE || ALL) && console.table(cheatsGroup);
            return cheatsGroup;
        };

        _self.getCheats = function  getCheats(){
            if(!$scope.exists(openedGame.chtPath)) return;
        };

        //Watch the game path.
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