(function () {
    'use strict';

    angular
        .module('redCarpet')
        .factory('_', LodashFactory);

    /** @ngInject */

    function LodashFactory($window) {
        if(!$window._){
            // If lodash is not available you can now provide a
            // mock service, try to load it from somewhere else,
            // redirect the user to a dedicated error page, ...
        }
        return $window._;
    }

})();
