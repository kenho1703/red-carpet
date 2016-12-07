(function () {
    'use strict';

    angular
        .module('redCarpet')
        .controller('CheckoutController', CheckoutController);

    /** @ngInject */
    function CheckoutController($state, CartService) {

        if (!CartService.items.length) {
            $state.go('booking');
        }

        var vm = this;

        vm.packages = CartService.items;
        vm.totalPrice = CartService.getTotalPrice();
        vm.totalItemInCart = CartService.items.length;

        vm.removePackage = removePackage;
        vm.calculatePackageTotalPrice = calculatePackageTotalPrice;

        function calculatePackageTotalPrice(packages) {

            var price = 0;
            angular.forEach(packages.AirportServices, function (service) {
                price += service.Price;
            });
            return price;
        }

        function removePackage(item) {
            CartService.remove(item);
            vm.packages = CartService.items;
            vm.totalPrice = CartService.getTotalPrice();
            vm.totalItemInCart = CartService.items.length;
        }

    }

})();
