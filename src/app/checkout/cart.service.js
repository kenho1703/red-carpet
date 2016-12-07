(function () {
    'use strict';

    angular
        .module('redCarpet')
        .factory('CartService', CartService);

    /** @ngInject */
    function CartService() {

        var service = {
            items : [],
            addPackage: addPackage
        };
        
        function addPackage() {
            
        }

        return service;

    }
})();
