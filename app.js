(function() {
'use strict';

angular.module('NarrowItDownApp', [])

.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItems);

function FoundItems() {
    var ddo = {
        templateUrl: 'foundItem.html',
        scope: {
            items: '<',
            onRemove: '&'
        }
    }

    return ddo;
}

NarrowItDownController.$inject = ['MenuSearchService', '$scope'];
function NarrowItDownController (MenuSearchService, $scope) {
    var narrow = this;
    narrow.searchTerm = "";
    narrow.found = [];
    $scope.message = "";

    narrow.displayMessage = function() {
        var promise = MenuSearchService.getMatchedMenuItems(narrow.searchTerm);

        promise.then(function(response) {
            narrow.found = response;

            if (narrow.found.length == 0) {
                $scope.message = "Nothing found"
            }
            else {
                $scope.message = ""
            }
        })
    }

    narrow.removeItem = function(itemIndex) {
        narrow.found.splice(itemIndex, 1);
    }

}

MenuSearchService.$inject = ['$http'];
function MenuSearchService($http) {
    var service = this;

    service.getMatchedMenuItems = function(searchTerm) {
        return $http({
            method: "GET",
            url:("https://davids-restaurant.herokuapp.com/menu_items.json")

        }).then(function (result) {
            var allItems = result.data.menu_items;
            // process result and only keep items that match
            var foundItems = [];
            if(searchTerm != "") {
                for (var i = 0; i < allItems.length; i++) {
                    var des = allItems[i].description;
                    if (des.toLowerCase().indexOf(searchTerm) != -1) {
                        foundItems.push(allItems[i]);
                    }
                }
            }
            // return processed items
            return foundItems;
        });
    }
}
})();
