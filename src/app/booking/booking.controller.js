(function () {
    'use strict';

    angular
        .module('redCarpet')
        .controller('BookingController', BookingController);

    /** @ngInject */
    function BookingController($scope, $filter, _, AirportService, AccountService, CartService, TravellersService, $uibModal) {

        var vm = this;

        vm.airportLists = [];
        vm.searchData = {
            account: null,
            numberOfTravellers: 1,
            airport: null
        };
        vm.travellers = TravellersService.travellers;
        vm.totalPrice =  CartService.getTotalPrice() || 0;
        vm.totalItemInCart =  CartService.items.length || 0;
        vm.bookingStep = {
            currentStep: 0
        };

        vm.getPackages = getPackages;
        vm.addToCart = addToCart;
        vm.removePackage = removePackage;
        vm.calculatePackageTotalPrice = calculatePackageTotalPrice;
        vm.goTripDetailStep = goTripDetailStep;
        vm.goBack = goBack;
        vm.goPayment = goPayment;
        vm.viewTip = viewTip;
        vm.viewTripDetails = viewTripDetails;

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

            if(!vm.searchData.airport) return;
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

        function calculatePackageTotalPrice(packages) {

            var price = 0;
            angular.forEach(packages.AirportServices, function (service) {
                price += service.Price;
            });
            return price;
        }

        function addToCart(item) {

            CartService.add(item);

            vm.totalPrice =  CartService.getTotalPrice();
            vm.totalItemInCart =  CartService.items.length;
            vm.packages = CartService.items;

        }

        function removePackage(item) {
            CartService.remove(item);
            vm.packages = CartService.items;
            vm.totalPrice = CartService.getTotalPrice();
            vm.totalItemInCart = CartService.items.length;
            if(!vm.totalItemInCart){
                goChooseService();
            }
        }

        function goTripDetailStep() {
            vm.bookingStep.currentStep++;
        }

        function goBack() {
            vm.bookingStep.currentStep--;
        }

        function goPayment() {
            vm.bookingStep.currentStep++;
        }

        function viewTip() {

            var modalInstance = $uibModal.open({
                templateUrl: 'app/booking/tip-modal.html',
                size: 'md',
                controller: function ($scope, $uibModalInstance) {
                    $scope.close = function () {
                        $uibModalInstance.dismiss('cancel');
                    };
                }
            });
        }

        function viewTripDetails(trip) {

            var modalInstance = $uibModal.open({
                templateUrl: 'app/booking/trip-details/trip-details.html',
                controller: 'TripDetailsController',
                controllerAs: 'vm',
                size: 'md',
                resolve: {
                    trip: trip
                }
            });


        }
    }

})();
