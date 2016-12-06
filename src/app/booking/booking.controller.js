(function () {
    'use strict';

    angular
        .module('redCarpet')
        .controller('BookingController', BookingController);

    /** @ngInject */
    function BookingController(AirportService, AccountService) {
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
        vm.bookingPackage = bookingPackage;
        vm.getPrice = getPrice;


        init();

        function init() {
            AirportService.getAirport().then(function (data) {
                vm.airportLists = data.data;
                // if (vm.airportLists.length)
                //   vm.searchData.airport = vm.airportLists[0];
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
            var Price = 0;
            angular.forEach(Packages, function (pack) {
                Price += pack.Price;
            });
            return Price;
        }

        function getPriceTotal(listCart) {
            var Price = 0;
            angular.forEach(listCart, function (list) {
                angular.forEach(list.AirportServices, function (cart) {
                    Price += cart.Price;
                });
            });
            vm.totalPrice = Price;
        }

        function bookingPackage(data, flag) {
            if (flag) {
                vm.listCart.push(data);
            } else {
                angular.forEach(vm.listCart, function (cart, index) {
                    if (cart.Id === data.Id) {
                        vm.listCart.splice(index, 1);
                    }
                })
            }
            getPriceTotal(vm.listCart);
        }
    }
})();
