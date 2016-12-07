(function () {
    'use strict';

    angular
        .module('redCarpet')
        .config(routerConfig);

    /** @ngInject */
    function routerConfig($stateProvider) {

        $stateProvider
            .state('checkout', {
                url: '/checkout',
                templateUrl: 'app/checkout/checkout.html',
                controller: 'CheckoutController',
                controllerAs: 'vm'
            });

    }
})();
