(function () {
    'use strict';
    /*global angular, require*/
    angular.module('showcase').controller('showCaseController', function ($scope, sharedConfigurations, $window) {

        /*-----------------------*\
             Constants for logs
        \*-----------------------*/
        const ALL = false;
        const TABLE = true;
        const INFO = false;
        const LOG = false;
        const WARNING = false;
        const DEBUG = false;

        /*-----------------*\
              Variables
        \*-----------------*/
        var _self = this;
        var fs = require('fs');
        (ALL || DEBUG) && console.debug(fs);

        /*-------------*\
             Objects
        \*-------------*/

        /**Game object containing information about the game parameters are optional*/
        function Game(gameID, code, gameTitle, artPath, vmcPath, chtPath, isoPath, cheatsGroup){
            this.gameID = gameID;
            this.code = code;
            this.gameTitle = gameTitle;
            this.artPath = artPath;
            this.vmcPath = vmcPath;
            this.chtPath = chtPath;
            this.isoPath = isoPath;
            this.cheatsGroup = cheatsGroup;
        }

        /** Cheat object
         * @param {String} title cheat title
         * @param {String} code cheat code*/
        function Cheat(title,code){
            this.title = title;
            this.code = code;

            /** Check if the cheat code starts with 90 (master code)
             * @return {boolean}*/
            this.isMasterCode = function isMasterCode() {
                return this.code.indexOf("90") == 0;
            }
        }

        /*--------------------*\
             Shared in scope
        \*--------------------*/
        $scope.configs              = sharedConfigurations;
        $scope.openedGame           = null;
        $scope.expanded             = false;
        $scope.NOT_FOUND_COVER      = 'D:\\Cheat-Organizer\\assets\\img\\404.jpg';

        $scope.exists = function exists(file) {
            return fs.existsSync(file);
        };

        /*------------------*\
               Functions
        \*------------------*/

        /** Build a game object based on path and iso name.
         * @param {String} basePath complete path like "D:\blabla\oplpath\"
         * @param {String} fullIsoName something like "SLUS_216.07.Game name.iso"*/
        var buildGame = function buildGame(basePath,fullIsoName){
            var game = new Game();
            game.gameID    = fullIsoName;
            game.code      = fullIsoName.slice(0, 11);
            game.gameTitle = fullIsoName.slice(12, fullIsoName.length - ".iso".length);
            game.artPath   = basePath+'\\ART\\'+game.code+'_COV.png';
            game.vmcPath   = basePath+'\\VMC\\'+game.code+'.bin';
            game.chtPath   = basePath+'\\CHT\\'+game.code+'.cht';
            game.isoPath   = basePath+'\\DVD\\'+game.gameID; //FIXME: check if existis in CD path
            game.cheatsGroup =  fs.existsSync(game.chtPath) && buildCheatsArray( fs.readFileSync(game.chtPath,'UTF-8'));
            return game;
        };

        /**
         * Read specified path, search for ISOs with OPL name format
         * and return Game object.
         * @returns {Array<Game>}
         */
        _self.getGamesObject = function getGamesObject() {
            if ($scope.configs.text === undefined) return;

            //Get all isos in DVD folder
            //fixme: its possible to find isos in CD path
            var ISOs = fs.existsSync($scope.configs.text[0].value + "\\DVD\\") ? fs.readdirSync($scope.configs.text[0].value + "\\DVD\\") : [];

            //Get opl path shared through service
            var basePath = $scope.configs.text[0].value;
            (DEBUG || ALL) && console.debug('Base path:',{basePath:basePath});

            return ISOs.map(function (isoName) {
                return buildGame(basePath,isoName);
            });
        };

        /**
         * Build a cheats group array.
         * @param {String} unformattedCheats a string read from cht file.
         * @return {Object.<Cheat>[]} cheatsGroup: an array containing cheats object.
         */
        var buildCheatsArray = function buildCheatsArray(unformattedCheats) {
            var regex = /(?:[0-9A-F\s]{18})+/; //Find any char in range 0-9 & A-F with 18 length, grouping it. Not global.
            var cheatsGroup = [];
            var matchedInRegex = regex.exec(unformattedCheats);

            (DEBUG || ALL) && console.debug('\nGiven String:', {str: unformattedCheats});

            while (matchedInRegex) {
                (DEBUG || ALL) && console.debug("\nMatched in regex:", matchedInRegex);

                //Create the cheat.
                var cheat = new Cheat(unformattedCheats.substr(0, matchedInRegex.index), matchedInRegex[0]);

                //Put it in cheatsGroup Array
                cheatsGroup.push(cheat);

                //Delete the found cheat (title and code) from orinal string
                unformattedCheats = unformattedCheats.substr(matchedInRegex.index+matchedInRegex[0].length+1, unformattedCheats.length);

                //Execute the regex again
                matchedInRegex = regex.exec(unformattedCheats);
            }

            (TABLE || ALL) && console.table(cheatsGroup);
            return cheatsGroup;
        };

        //Watch the game path.
        $scope.$watch('configs.text[0].value', function() {
            $scope.games = _self.getGamesObject();
            (LOG || ALL) && console.log($scope.games);
        });

        //TODO: use css varibles to implement this.
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