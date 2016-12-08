(function () {
    "use strict";

    angular
        .module('redCarpet')
        .directive('redNav', redNav);

    function redNav(CartService) {

        return {
            templateUrl: 'app/common/directives/nav/nav.html',
            restrict: 'EA',
            link: link
        };

        function link(scope) {
            scope.totalItemInCart = getTotalItemInCart;

            function getTotalItemInCart() {
                return CartService.items.length;
            }
        }


    }

})();
