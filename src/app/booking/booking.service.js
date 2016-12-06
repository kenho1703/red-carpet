(function () {
  'use strict';

  angular
    .module('myNewProject')
    .factory('BookingService', BookingService);

  /** @ngInject */
  function BookingService() {
    var Booking;
    Booking = {};
    return Booking;
  }
})();
