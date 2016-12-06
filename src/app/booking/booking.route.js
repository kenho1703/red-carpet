(function () {
  'use strict';

  angular
    .module('myNewProject')
    .config(routerConfig);
  /** @ngInject */
  function routerConfig($stateProvider) {
    $stateProvider
      .state('booking', {
        url: '/',
        templateUrl: 'app/booking/booking.html',
        controller: 'BookingController',
        controllerAs: 'booking',
        resolve: {
          'Account': function (AccountService) {
            return AccountService.getAccount(function (data) {
              return data;
            })
          },
          'Airport': function (AirportService) {
            return AirportService.getAirport(function (data) {
              return data;
            })
          }
        }
      });

  }
})();
