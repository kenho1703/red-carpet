(function () {
    'use strict';

    angular
        .module('redCarpet')
        .controller('BookingController', BookingController)

    /** @ngInject */
    function BookingController(AirportService, AccountService, $uibModal) {
        var vm = this;
        vm.airportLists = [];
        vm.searchData = {
            account: null,
            numberOfTravellers: 1,
            airport: null
        };
        vm.listCart = [];
        vm.bookingForm = '';
        vm.totalPrice = 0;
        vm.getPackages = getPackages;
        vm.minusNumber = minusNumber;
        vm.plusNumber = plusNumber;
        vm.togglePackageSelection = togglePackageSelection;
        vm.getPrice = getPrice;
        vm.viewCart = viewCart;


        init();

        function init() {
            AirportService.getAirport().then(function (data) {
                vm.airportLists = data.data;
            }, function () {
                vm.airportLists = [];
            });
            AccountService.getAccount().then(function (data) {
                vm.searchData.account = data.data;
            }, function () {
                vm.searchData.account = null;
            })
        }


        function minusNumber() {
            if (vm.searchData.numberOfTravellers <= 1) return;
            vm.searchData.numberOfTravellers--;
        }

        function plusNumber() {
            if (vm.searchData.numberOfTravellers >= 20) return;
            vm.searchData.numberOfTravellers++;
        }

        function getPackages() {
            if (!vm.bookingForm.$valid) return;
            AirportService.getPackages(vm.searchData).then(function (respone) {
                var newData = respone.data.replace('{"d":null}', '');
                vm.packageLists = JSON.parse(newData);
            }, function () {

            })
        }

        function getPrice(Packages) {
            var price = 0;
            angular.forEach(Packages.AirportServices, function (service) {
                price += service.Price;
            });
            return price;
        }


        function togglePackageSelection() {
            vm.totalPrice = vm.packageLists.filter(function (value) {
                return value.Checked;
            }).reduce(function (a, b) {
                var total = getPrice(b);
                return a + total;
            }, 0);
            vm.listCart = vm.packageLists.filter(function (value) {
                return value.Checked;
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
