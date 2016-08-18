(function () {
    'use strict';
    /*global angular, $, console, require*/
    angular.module('configurations').controller('configurationsController',
        function ($scope, $http, sharedConfigurations) {
            var _self = this;
            var options = [];
            var FILE_NAME = 'configurations.data.json';
            var OUTPUT_PATH = 'app/configurations/';
            $scope.configs = sharedConfigurations;


            //TODO: create directives for those 2 functions
            $scope.getFolder = function () {
                var chooser = $('#folderDialog');
                chooser.unbind('change');
                chooser.change(function () {
                    $scope.configs.text[0].value = $(this).val();
                    $scope.$apply();

                });
                chooser.trigger('click');
            };

            $scope.hide = function () {
                $('#toggle').prop('checked', false);
            };

            /**
             * Register the id and option of the DIRECTIVE for later access
             * @param attrs: must be attrs of the directive
             * @param id: an UNIQUE id, recommended is scope id of the directive.
             */
            _self.registerOption = function registerOption(attrs, id) {
                attrs.context.keyId = id; //not use id, id is a HTML attr.
                options.push(attrs);
            };

            _self.putSavedPersistersOnService = function putSavedPersistersOnService(){
                var x;
                $scope.configs = {};
                for (x = 0; x < options.length; x++) {
                    var element = options[x].context;

                    if ($scope.configs[element.type] === undefined) {
                        $scope.configs[element.type] = [];
                    }

                    /* TODO:
                     * there's problems choosing which key is important to save,
                     * for now i'll get only these keys.
                     */
                    var attributes = {
                        keyId: element.keyId,
                        checked: element.checked,
                        value: element.value,
                        name: element.name
                    };

                    $scope.configs[element.type].push(attributes);
                }
            };

            _self.saveConfigurations = function saveConfigurations() {
                var fs;
                try {
                    fs = require('fs'); //NWJS fileSystem is required to save a file.
                } catch (error) {
                    console.error('Require is not defined. Run in a NWJS window/app to save configurations');
                    return;
                }
                /* Put the actual options on service*/

                _self.putSavedPersistersOnService(); //would reset any new object added on configurations service.

                /* Proper saving file part*/
                fs.writeFile(OUTPUT_PATH+FILE_NAME, angular.toJson($scope.configs," "), function (err) {
                    console.info(err ? "Error saving file:" + err : "File saved to " + OUTPUT_PATH+FILE_NAME);
                });
            };

            /**
             * Read
             * @param attrs : directive attrs
             * @param id : unique ID, recomended is $scope.$id
             */
            _self.loadData = function loadData(attrs, id) {

                $http.get(OUTPUT_PATH+FILE_NAME).then(function (response) {
                    var data = response.data;

                    if ($.isEmptyObject(data)) {
                        console.info('Seems like the file needed to configure views is empty');
                        return;
                    }

                    var type = attrs.type;
                    var typeArr = data[type];
                    if (typeArr === undefined) {return; }
                    var savedAtributes;
                    var x;

                    /* Search for element in the array by id(wich was/is defined by $scope.$id)*/
                    for (x = 0; x < typeArr.length; x++) {
                        if (typeArr[x].keyId === id) {
                            savedAtributes = typeArr[x];
                            break;
                        }

                    }

                    /*
                    * Problems if the user create a new view and then refresh and dont save.
                    * Due to the use of $id of the scope for view save/restore the creation
                    * of a new scope with the id of the old scope the views cant 'see' themselves
                    * anymore.
                    * Solution could be detect this problem, then save and refresh.. but the data will be lost.
                    */
                    if (savedAtributes === undefined || savedAtributes === null) {return; }

                    /* Apply data on view */
                    var objKeys = Object.keys(savedAtributes);
                    for (x = 0; x < objKeys.length; x++) {
                        var key = objKeys[x];
                        attrs.$set(key, savedAtributes[key]);
                    }
                    _self.putSavedPersistersOnService();
                });
            };

        });
}());