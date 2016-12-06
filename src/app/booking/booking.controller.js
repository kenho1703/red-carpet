(function () {
  'use strict';

  angular
    .module('myNewProject')
    .controller('BookingController', BookingController);

  /** @ngInject */
  function BookingController(AirportService, AccountService) {
    var booking = this;
    booking.airportLists = [];
    booking.searchData = {
      account: null,
      numberOfTravellers: 1,
      airport: null
    };
    booking.listCart = [];
    booking.bookingForm = '';
    booking.totalPrice = 0;
    booking.getPackages = getPackages;
    booking.minusNumber = minusNumber;
    booking.plusNumber = plusNumber;
    booking.bookingPackage = bookingPackage;
    booking.getPrice = getPrice;


    init();

    function init() {
      AirportService.getAirport().then(function (data) {
        booking.airportLists = data.data;
        // if (booking.airportLists.length)
        //   booking.searchData.airport = booking.airportLists[0];
      }, function () {
        booking.airportLists = [];
      });
      AccountService.getAccount().then(function (data) {
        booking.searchData.account = data.data;
      }, function () {
        booking.searchData.account = null;
      })
    }


    function minusNumber() {
      if (booking.searchData.numberOfTravellers <= 1) return;
      booking.searchData.numberOfTravellers--;
    }

    function plusNumber() {
      if (booking.searchData.numberOfTravellers >= 20) return;
      booking.searchData.numberOfTravellers++;
    }

    function getPackages() {
      if (!booking.bookingForm.$valid) return;
      AirportService.getPackages(booking.searchData).then(function (respone) {
        var newData = respone.data.replace('{"d":null}', '');
        booking.packageLists = JSON.parse(newData);
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
      booking.totalPrice = Price;
    }

    function bookingPackage(data, flag) {
      if (flag) {
        booking.listCart.push(data);
      } else {
        angular.forEach(booking.listCart, function (cart, index) {
          if (cart.Id === data.Id) {
            booking.listCart.splice(index, 1);
          }
        })
      }
      getPriceTotal(booking.listCart);
    }
  }
})();
