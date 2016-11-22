(function() {
'use strict';

angular.module('ShoppingListCheckOff', [])

.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListService', ShoppingListService);

ToBuyController.$inject['ShoppingListService'];
function ToBuyController (ShoppingListService) {
    var to_buy = this;

    to_buy.ItemName = "";
    to_buy.ItemQuantity = "";

    to_buy.items = ShoppingListService.getToBuyItems();

    to_buy.buy = function(itemIndex) {
        ShoppingListService.buy(itemIndex);
    }

}

AlreadyBoughtController.$inject['ShoppingListService'];
function AlreadyBoughtController(ShoppingListService) {
    var bought = this;

    bought.items = ShoppingListService.getBoughtItems();

}

function ShoppingListService() {
    var service = this;

    var to_buy_items = [
        {
            name: 'book',
            quantity: 1
        },
        {
            name: 'bacon',
            quantity: 1
        },
        {
            name: 'cookies',
            quantity: 10
        },
        {
            name: 'mango',
            quantity: 3
        },
        {
            name: 'mixer',
            quantity: 1
        },
        {
            name: 'cream',
            quantity: 4
        },
    ];
    var bought_items = [];

    service.buy = function(itemIndex) {
        var item = to_buy_items[itemIndex]

        to_buy_items.splice(itemIndex,1);
        bought_items.push(item);

    }

    service.getToBuyItems = function() {
        return to_buy_items;
    }

    service.getBoughtItems = function() {
        return bought_items;
    }
}

})();
