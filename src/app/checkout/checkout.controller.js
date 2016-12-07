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
        function removePackage(item) {
            CartService.remove(item);
            vm.packages = CartService.items;
            vm.totalPrice = CartService.getTotalPrice();
            vm.totalItemInCart = CartService.items.length;
        }

    }

})();
