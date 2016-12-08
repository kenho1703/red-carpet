(function () {
    "use strict";

    angular
        .module('redCarpet')
        .directive('redAffix', redAffix);

    function redAffix($document,$window) {

        return {
            restrict: 'A',
            link: link
        };

        function link(scope, element, attrs) {
            var child = element.children(0);

            function checkPosition() {
                var position  = angular.element(element).offset();
                var scrollHeight 	= $document.prop( 'height' ),
                    scrollTop 		= angular.element($window).prop("pageYOffset"),
                    positionTop 	= attrs.offsetTop ? attrs.offsetTop : element.prop('offsetTop'),
                    pinnedOffset    =  position.top - positionTop;

                if (scrollTop >= pinnedOffset) {
                    child.addClass('affix');
                    child.css({top: positionTop + 'px'});

                } else {
                    child.removeClass('affix');
                    child.css({top: 'auto'});
                }
            }

            function resizeChild(e, c) {
                e.css({height: c[0].offsetHeight + 'px'});
                c.css({width: e[0].offsetWidth + 'px'});
            }

            angular.element($window).bind('scroll', checkPosition);
            angular.element($window).on('resize', function() {
                resizeChild(element, child);
            });
            angular.element($document).ready(function() {
                resizeChild(element, child);
            });
        }

    }

})();

