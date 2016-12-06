(function () {
  'use strict';

  angular
    .module('myNewProject')
    .factory('AirportService', AirportService);

  /** @ngInject */
  function AirportService(CONFIG, $http) {
    var Airport;
    Airport = {
      getAirport: getAirport
    };
    return Airport;
    function getAirport() {
      return $http({
        method: 'GET',
        url: CONFIG.rest.baseURI + '/GetAirports'
      }).then(function successCallback(response) {
        return response;
      }, function errorCallback(error) {
        return error;
      });
    }
  }
})();
