(function () {
    "use strict";

    angular
        .module('redCarpet')
        .directive('redFooter', redFooter);

    function redFooter() {

        return {
            templateUrl: 'app/common/directives/footer/footer.html',
            restrict: 'EA'
        };

    }

})();
