(function () {
    'use strict';

    angular
        .module('redCarpet')
        .controller('CartsController', CartsController);

    /** @ngInject */
    function CartsController(listCart, $uibModalInstance) {
        var vm = this;
        vm.listCartView = listCart;
        vm.removeItemCart = removeItemCart;
        vm.ok = ok;
        vm.cancel = cancel;
        function removeItemCart(index) {
            delete vm.listCartView[index].checked;
            vm.listCartView.splice(index, 1);
        }

        function ok() {
            $uibModalInstance.close();
        }

        function cancel() {
            $uibModalInstance.dismiss();
        }
    }

})();
