(function () {
    "use strict";

    angular
        .module('redCarpet')
        .directive('redNav', redNav);

    function redNav() {

        var directive = {
            templateUrl: '/app/common/directives/nav/nav.html',
            restrict: 'EA'
        };
        return directive;


    }

})();
