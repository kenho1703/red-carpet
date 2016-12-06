(function () {
    'use strict';

    angular
        .module('redCarpet')
        .controller('BookingController', BookingController);

    /** @ngInject */
    function BookingController(AirportService, AccountService, $uibModal) {

        var vm = this;

        vm.airportLists = [];
        vm.listCart = [];
        vm.totalPrice = 0;
        vm.searchData = {
            account: null,
            numberOfTravellers: 1,
            airport: null
        };

        vm.getPackages = getPackages;
        vm.minusNumberOfTravellers = minusNumberOfTravellers;
        vm.plusNumberOfTravellers = plusNumberOfTravellers;
        vm.togglePackageSelection = togglePackageSelection;
        vm.calculatePackageTotalPrice = calculatePackageTotalPrice;
        vm.viewCart = viewCart;

        activate();

        function activate() {

            getAirport();
            getAccount();

        }

        function getAirport() {

            AirportService.getAirport().then(function (data) {
                vm.airportLists = data.data;
            }, function () {
                vm.airportLists = [];
            });

        }

        function getAccount() {
            AccountService.getAccount().then(function (data) {
                vm.searchData.account = data.data;
            }, function () {
                vm.searchData.account = null;
            });
        }

        function getPackages() {

            vm.loading = true;
            vm.packageLists = [];

            AirportService.getPackages(vm.searchData).then(function (respone) {
                vm.loading = false;
                var newData = respone.data.replace('{"d":null}', '');
                vm.packageLists = angular.fromJson(newData);
            }, function () {
                vm.loading = false;
                vm.packageLists = [];
            })
        }

        function minusNumberOfTravellers() {

            if (vm.searchData.numberOfTravellers <= 1) return;
            vm.searchData.numberOfTravellers--;

        }

        function plusNumberOfTravellers() {

            if (vm.searchData.numberOfTravellers >= 20) return;
            vm.searchData.numberOfTravellers++;

        }

        function calculatePackageTotalPrice(packages) {

            var price = 0;
            angular.forEach(packages.AirportServices, function (service) {
                price += service.Price;
            });
            return price;
        }


        function togglePackageSelection() {

            vm.totalPrice = vm.packageLists.filter(function (item) {
                return item.Checked;
            }).reduce(function (a, b) {
                var total = calculatePackageTotalPrice(b);
                return a + total;
            }, 0);

            vm.listCart = vm.packageLists.filter(function (item) {
                return item.Checked;
            });

        }

        function viewCart() {
            var modalInstance = $uibModal.open({
                templateUrl: 'app/booking/carts.html',
                controller: 'CartsController',
                controllerAs: 'vm',
                size: 'lg',
                resolve: {
                    listCart: function () {
                        return vm.listCart;
                    }
                }
            });
            modalInstance.result.then(function (list) {

            }, function () {
            });
        }
    }

})();
