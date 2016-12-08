(function () {
    'use strict';

    angular
        .module('redCarpet')
        .config(routerConfig);

    /** @ngInject */
    function routerConfig($stateProvider) {

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'app/home/home.html',
                controller: 'HomeController',
                controllerAs: 'vm'
            });

    }
})();
