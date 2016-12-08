(function () {
    'use strict';

    angular
        .module('redCarpet')
        .config(routerConfig);

    /** @ngInject */
    function routerConfig($stateProvider) {

        $stateProvider
            .state('bookings', {
                url: '/bookings',
                templateUrl: 'app/booking/booking.html',
                controller: 'BookingController',
                controllerAs: 'vm'
            });

    }
})();
