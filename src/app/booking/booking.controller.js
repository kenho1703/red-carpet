(function () {
    'use strict';

    angular
        .module('redCarpet')
        .controller('BookingController', BookingController);

    /** @ngInject */
    function BookingController($filter, AirportService, AccountService, $uibModal, CartService) {

        var vm = this;

        vm.airportLists = [];
        vm.selectedItems = [];
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

        activate();

        function activate() {

            getAirport();
            getAccount();

        }

        function getAirport() {

            AirportService.getAirport().then(function (res) {
                vm.airportLists = res.data;
                vm.airportLists = $filter('orderBy')(res.data, 'Name');
            }, function () {
                vm.airportLists = [];
            });

        }

        function getAccount() {
            AccountService.getAccount().then(function (res) {
                vm.searchData.account = res.data;
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
                checkPackageSelected();
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

        function calculateTotalPrice() {

            var totalPrice = 0;
            angular.forEach(vm.selectedItems, function (item) {
                totalPrice += calculatePackageTotalPrice(item);
            });
            return totalPrice;
        }

        function checkPackageSelected() {
            var test = _.intersectionBy(vm.packageLists, vm.selectedItems, 'Id');
        }

        function togglePackageSelection() {

            vm.selectedItems = vm.packageLists.filter(function (item) {
                return item.checked;
            });
            // CartService.addPackage(item);
            CartService.items = vm.selectedItems;

            vm.totalPrice =  calculateTotalPrice();

        }
    }

})();
