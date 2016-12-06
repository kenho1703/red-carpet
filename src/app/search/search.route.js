(function () {
  'use strict';

  angular
    .module('myNewProject')
    .config(routerConfig);
  /** @ngInject */
  function routerConfig($stateProvider) {
    $stateProvider
      .state('booking.search', {
        url: '/',
        templateUrl: 'app/search/search.html',
        controller: 'SearchController',
        controllerAs: 'search',
        resolve: {
          'Account': function (SearchService) {
            return SearchService.getAccount(function (data) {
              return data;
            })
          },
          'Airport': function (SearchService) {
            return SearchService.getAirport(function (data) {
              return data;
            })
          }
        }
      });
  }
})();
