(function() {
  'use strict';

  angular
    .module('myNewProject')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('booking', {
        url: '',
        abstract: true,
        templateUrl: 'app/templates/booking-template.html'
      })
     $urlRouterProvider.otherwise('/');
  }

})();
