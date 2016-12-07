(function () {
    'use strict';

    angular
        .module('redCarpet')
        .factory('CartService', CartService);

    /** @ngInject */
    function CartService(_) {

        var service = {
            items : [],
            add: add,
            remove: remove,
            getTotalPrice: getTotalPrice
        };

        function add(item) {
            service.items.push(item)
        }

        function remove($index) {
            service.items.splice($index, 1);
        }

        function calculatePackagePrice(item) {
            var price = 0;
            if(!item.AirportServices) return price;

            angular.forEach(item.AirportServices, function (service) {
                price += service.Price;
            });
            return price;
        }

        function getTotalPrice() {
            var totalPrice = 0;
            angular.forEach(service.items, function (item) {
                totalPrice += calculatePackagePrice(item);
            });

            return totalPrice;
        }

        return service;

    }
})();
