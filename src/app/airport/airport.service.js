(function () {
    'use strict';

    angular
        .module('redCarpet')
        .factory('AirportService', AirportService);

    /** @ngInject */
    function AirportService(CONFIG, $http) {

        var service = {
            getAirport: getAirport,
            getPackages: getPackages
        };

        return service;

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
