(function() {
  'use strict';

  angular
    .module('myNewProject')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig( $urlRouterProvider) {
     $urlRouterProvider.otherwise('/');
  }

})();
