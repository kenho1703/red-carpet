(function () {
    'use strict';

    angular
        .module('redCarpet')
        .controller('BookingController', BookingController);

    /** @ngInject */
    function BookingController($filter, _, AirportService, AccountService, CartService) {

        var vm = this;

        vm.airportLists = [];
        vm.searchData = {
            account: null,
            numberOfTravellers: 1,
            airport: null
        };
        vm.totalPrice =  CartService.getTotalPrice() || 0;
        vm.totalItemInCart =  CartService.items.length || 0;

        vm.getPackages = getPackages;
        vm.minusNumberOfTravellers = minusNumberOfTravellers;
        vm.plusNumberOfTravellers = plusNumberOfTravellers;
        vm.addToCart = addToCart;
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

        function checkPackageExistsInCart() {
            var intersectItems = _.intersectionBy(vm.packageLists, CartService.items, 'Id');
            intersectItems.forEach(function (item) {
                item.checked = true;
            })
        }

        function addToCart(item) {

            CartService.add(item);

            vm.totalPrice =  CartService.getTotalPrice();
            vm.totalItemInCart =  CartService.items.length;

        }
    }

})();
