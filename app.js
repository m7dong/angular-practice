(function() {
'use strict';

angular.module('LunchCheck', [])

.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject['$scope'];
function LunchCheckController ($scope) {
    $scope.items = "";
    $scope.message = "";

    $scope.displayMessage = function() {
        if ($scope.items == "") {
            $scope.message = "Please enter data first";
        }
        else {
            var items_array = $scope.items.replace(/ /g,'').replace(/,+/g,',')
                                          .split(",");

            if (items_array.length > 3) {
                $scope.message = "Too much!";
            }
            else {
                $scope.message = "Enjoy!";
            }
        }
    };

}

})();
