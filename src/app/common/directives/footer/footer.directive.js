(function () {
    "use strict";

    angular
        .module('redCarpet')
        .directive('redFooter', redFooter);

    function redFooter() {
        var directive = {
            templateUrl: '/app/common/directives/footer/footer.html',
            restrict: 'EA'
        };
        return directive;


    }

})();
