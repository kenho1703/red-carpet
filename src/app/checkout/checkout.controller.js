(function () {
    'use strict';

    angular
        .module('redCarpet')
        .controller('CheckoutController', CheckoutController);

    /** @ngInject */
    function CheckoutController(CartService) {

        var vm = this;

        vm.packageLists = CartService.items;


    }

})();
