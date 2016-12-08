(function () {
    'use strict';

    angular
        .module('redCarpet')
        .config(routerConfig);

    /** @ngInject */
    function routerConfig($stateProvider) {

        $stateProvider
            .state('booking', {
                url: '/booking',
                templateUrl: 'app/booking/booking.html',
                controller: 'BookingController',
                controllerAs: 'vm'
            });

    }
})();
