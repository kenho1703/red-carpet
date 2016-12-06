(function () {
  'use strict';

  angular
    .module('myNewProject')
    .factory('BookingService', BookingService);

  /** @ngInject */
  function BookingService(CONFIG, $http) {
    var Booking;
    Booking = {
      getPackages: getPackages
    };
    return Booking;
    function getPackages(data) {
      return $http({
        method: 'POST',
        url: CONFIG.rest.baseURI + '/GetPackagesByAirportAndAccount',
        data: data,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        transformResponse: [function (data) {
          return data;
        }]
      }).then(function successCallback(response) {
        return response;
      }, function errorCallback(error) {
        return error;
      });
    }
  }
})();
