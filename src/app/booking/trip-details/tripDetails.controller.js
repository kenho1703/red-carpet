(function () {
    'use strict';

    angular
        .module('redCarpet')
        .controller('TripDetailsController', TripDetailsController);

    /** @ngInject */
    function TripDetailsController(trip, $uibModalInstance) {

        var vm = this;
        if(!trip){
            vm.close();
        }

        vm.dateOptions = {
            formatYear: 'yy',
            maxDate: new Date(2020, 5, 22),
            minDate: new Date(),
            startingDay: 1
        };

        vm.close = close;

        vm.openDatePicker = function() {
            vm.opened = true;
        };

        function close() {
            $uibModalInstance.dismiss('cancel');
        }


    }

})();
