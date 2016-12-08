(function () {
    "use strict";

    angular
        .module('redCarpet')
        .directive('redScrollTop', redScrollTop);

    function redScrollTop() {

        return {
            templateUrl: 'app/common/directives/scroll-top/scroll-top.html',
            restrict: 'EA',
            link: link
        };

        function link(scope, element) {

            var whtml = angular.element(document).height();

            angular.element(window).scroll(function () {
                if (angular.element(this).scrollTop() > whtml / 10) {
                    angular.element(element).fadeIn();
                } else {
                    angular.element(element).fadeOut();
                }
            });
            angular.element(element).click(function () {
                angular.element('body,html').animate({
                    scrollTop: 0
                }, 500);
                return false;
            });

        }


    }

})();
