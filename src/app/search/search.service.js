(function () {
  'use strict';

  angular
    .module('myNewProject')
    .factory('SearchService', SearchService);

  /** @ngInject */
  function SearchService(CONFIG, $http) {
    var Search;
    Search = {
      getAccount: getAccount,
      getAirport: getAirport,
      getPackages: getPackages
    }
    return Search;
    function getAccount() {
      return $http({
        method: 'GET',
        url: CONFIG.rest.baseURI + '/GetAccount?identifier=2B7C967B-0428-432B-BD98-E5201ECC7EAE'
      }).then(function successCallback(response) {
        return response;
      }, function errorCallback(error) {
        console.log('error', error)
      });
    }

    function getAirport() {
      return $http({
        method: 'GET',
        url: CONFIG.rest.baseURI + '/GetAirports'
      }).then(function successCallback(response) {
        return response;
      }, function errorCallback(error) {
        console.log('error', error)
      });
    }

    function getPackages(data) {
      return $http({
        method: 'POST',
        url: CONFIG.rest.baseURI + '/GetPackagesByAirportAndAccount',
        data: data
      }).then(function successCallback(response) {
        console.log('response', response)
      }, function errorCallback(error) {
        console.log('error', error)
      });
    }
  }
})();
