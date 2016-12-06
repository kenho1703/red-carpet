(function() {
  'use strict';

  angular
    .module('myNewProject')
    .config(config);

  /** @ngInject */
  function config($logProvider) {
    // Enable log
    $logProvider.debugEnabled(true);

  }

})();
