(function () {
    'use strict';

    angular
        .module('redCarpet')
        .factory('BookingService', BookingService);

    /** @ngInject */
    function BookingService() {
        var Booking;
        Booking = {};
        return Booking;
    }
})();
