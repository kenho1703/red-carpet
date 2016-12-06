(function () {
    'use strict';

    angular
        .module('redCarpet')
        .config(routerConfig);

    /** @ngInject */
    function routerConfig($urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
    }

})();
